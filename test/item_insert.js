var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

//let id = '0';
let name = '셔츠';
let price = '15000';
let imgname = 'shirts.jpg';
//let regdate = sysdate();
let values = [name,price,imgname];

conn.query(db_sql.item_insert, values, (err, result, fields) => {
    if(err){
        console.log('Insert Error');
        console.log('Error Message:')+err;
    }else{
        console.log('Insert OK !');
    }
    db_connect.close(conn);
});