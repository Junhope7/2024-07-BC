var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = 'id04';
let pwd = 'pwd444';
let name = '김말숙';
let acc = '4567';
let values = [pwd,name,acc,id];

conn.query(db_sql.cust_update, values, (err, result, fields) => {
    if(err){
        console.log('Update Error');
        console.log('Error Message:')+err;
    }else{
        console.log('Update OK !');
    }
    db_connect.close(conn);
});