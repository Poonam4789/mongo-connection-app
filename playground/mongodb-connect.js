const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log('error in connectig mongodb ' + err);
    }
    console.log('connected to mongodb server');

// var _Id = new ObjectID();
// console.log("id ="+_Id);
    // db.collection('Todos').insertOne({
    //     text: 'something',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('error in adding data to mongodb ' + err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'malika raj',
    //     age: 29,
    //     location: 'Bhopal'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('unable to add record in db');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.close();
});
