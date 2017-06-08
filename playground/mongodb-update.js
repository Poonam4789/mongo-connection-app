const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log('error in connectig mongodb ' + err);
    }
    console.log('connected to mongodb server');

    // db.collection('Users').findOneAndUpdate({ name: 'malika raj' }, {
    //     $set: { name: 'ayush agrawal' }
    // }, { returnOriginal: false }).then((result) => {
    //     if (result) {
    //         console.log(result);
    //     }
    // });

db.collection('Users').findOneAndUpdate({ name: 'ayush agrawal' }, {
        $set: { name:'poonam patel' },
            $inc:{age :1}
        }
    , { returnOriginal: false }).then((result) => {
        if (result) {
            console.log(result);
        }
    });

    // db.close();

});