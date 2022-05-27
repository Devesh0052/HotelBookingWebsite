const mysql = require('mysql');
let connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'Devesh@123',
    database:'prac'
});

connection.connect((err)=>{
    if(err){
        console.error('error connecting: '+err.stack);
    }
    console.log("Connection success with id "+connection.threadId);
});

module.exports=connection;