const expect = require('expect');
const request = require('supertest');

var { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test Todo create';
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should not create todo with bad body', (done) => {
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            })
    });

});

describe('GET /todos', () => {
    it('should get all the todos in the db', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                // console.log(res.body.todo.text);
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if no todo found', (done) => {
        var _HexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${_HexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('Delete /todos/:id', () => {
    it('should remove a todo', (done) => {
        var _HexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${_HexId}`)
            .expect(200)
            .expect((res) => {
                // console.log(res.body.todo.text);
                expect(res.body.todo._id).toBe(_HexId);
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(_HexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e))
            })
    });

    it('should return 404 if no todo found', (done) => {
        var _HexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${_HexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var _HexId = todos[0]._id.toHexString();
        var text = "this should be dummy text";
        request(app)
            .patch(`/todos/${_HexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done)
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var _HexId = todos[1]._id.toHexString();
        var text = "this should be dummy text 2";
        request(app)
            .patch(`/todos/${_HexId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done)
    });
});

describe('GET /users/me', () => {
    it('should return authenticated user', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            }).end(done);
    });

    it('should return 401 if not authenticated user', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                //console.log(res);
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', (done) => {

    it('should create a user', (done) => {
        var email = 'poonam.patel@ril.com';
        var password = 'abc@123';
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            }).end((err) => {
                if (err) {
                    return done(err);
                }
                User.findOne({ email }).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                })
            })
        //.end(done);
    });

    it('should return validation errors if request invalid', (done) => {
        var email = 'poonam';
        var password = '1122';
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });
    it('should not create user if email in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password: 'password@123'
            }).expect(400)
            .end(done);
    });

});

describe('POST /users/login', (done) => {

    it('should login user and return auth token', (done) => {

        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[0]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((e) => {
                    done(e);
                })
            })
    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password + '1'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => {
                    done(e);
                })
            })
    });
});

describe('DELETE /users/me/token', () => {
    it('should delete auth token on user logout', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log('err', err);
                    return done(err);
                }
                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});