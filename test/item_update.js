var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = '4';
let name = '셔츠2';
let price = '16000'
let imgname = 'shirts2.jpg';
let values = [name,price,imgname,id];

conn.query(db_sql.item_update, values, (err, result, fields) => {
    if(err){
        console.log('Update Error');
        console.log('Error Message:')+err;
    }else{
        console.log('Update OK !');
    }
    db_connect.close(conn);
});