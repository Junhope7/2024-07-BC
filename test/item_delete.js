var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = '4';

conn.query(db_sql.item_delete, id, (err, result, fields) => {
    if(err){
        console.log('Delete Error');
        console.log('Error Message:')+err;
    }else{
        console.log('Delete OK !');
    }
    db_connect.close(conn);
});