const expect = require('expect');
const request = require('supertest');

var { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'hello world'
}, {
    _id: new ObjectID(),
    text: 'goodbye world'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test Todo create';
        request(app)
            .post('/todos')
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
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                // console.log(res.body.todo.text);
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
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
        var _HexId = todos[1]._id .toHexString();
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
                Todo.findById(_HexId).then((todo)=>{
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