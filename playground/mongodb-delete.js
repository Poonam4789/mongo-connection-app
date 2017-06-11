const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log('error in connectig mongodb ' + err);
    }
    console.log('connected to mongodb server');

    // db.collection('Todos').find({text:'eat lunch'}).count().then((count)=>{
    //     console.log(`Todos count is ${count}`);
    // },(err,result)=>{
    //     if(err){
    //         return console.log("unable to fetch records");
    //     }
    // });
    //deleteMany
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result)=>{
    //     if(result){
    //         console.log(result);
    //     }
    // });

    // db.collection('Users').deleteMany({name: 'Poonam Patel'}).then((result)=>{
    //     if(result){
    //         console.log(result);
    //     }
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result)=>{
    //     if(result){
    //         console.log(result);
    //     }
    // });

    //findAnddelete
    // db.collection('Todos').findOneAndDelete({text: 'eat lunch'}).then((result)=>{
    //     if(result){
    //         console.log(result);
    //     }
    // });

    db.collection('Users').findOneAndDelete({name: 'sakshi shrivastava'}).then((result)=>{
        if(result){
            console.log(result);
        }
    });

   

    // db.close();
});
