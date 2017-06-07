const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log('error in connectig mongodb ' + err);
    }
    console.log('connected to mongodb server');

    // db.collection('Todos').find({
    //     // completed:true
    //     //_id :'5938386cb66395577c8467b7'//failed
    //     // _id :new ObjectID('59383823ddf9d78dede595e8')
    // }).toArray().then((docs)=>{
    //     console.log("Todos");
    //      console.log(JSON.stringify(docs,undefined,2));
    // },(err,result)=>{
    //     if(err){
    //         return console.log("unable to fetch records");
    //     }
    // });
    //  db.collection('Users').find().count().then((count)=>{
    //     console.log(`Users count is ${count}`);
    // },(err,result)=>{
    //     if(err){
    //         return console.log("unable to fetch records");
    //     }
    // });

    db.collection('Users').find({name:'Poonam Patel'}).count().then((count)=>{
        console.log(`Users count is ${count}`);
    },(err,result)=>{
        if(err){
            return console.log("unable to fetch records");
        }
    });
   // db.close();
});
