const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

var password = 'abc123!';

// bcryptjs.genSalt(10, (err, salt) => {
//     bcryptjs.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$yfaZ0.C2ww6h9feF5ikOKOSb1HFjNBcG9gfO/iHDB3gCkKiLe8gki';

bcryptjs.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);


// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);



// var message = "i am doing node project authentication";
// var hash = SHA256(message).toString();

// console.log(`Message = ${message}`);
// console.log(`Hash = ${hash}`);

// var data = {
// id:4
// };

// var token ={
//     data,
//     hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// // token.data.id =4;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var hashResult =  SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(hashResult === token.hash){
//     console.log('data was not changed');
// }else{
//     console.log('data changed, Do not trust');
// }