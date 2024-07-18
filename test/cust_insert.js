var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = 'id04';
let pwd = 'pwd04';
let name = '이말숙';
let acc = '1234';
let values = [id,pwd,name,acc];

conn.query(db_sql.cust_insert, values, (err, result, fields) => {
    if(err){
        console.log('Insert Error');
        console.log('Error Message:')+err;
    }else{
        console.log('Insert OK !');
    }
    db_connect.close(conn);
});