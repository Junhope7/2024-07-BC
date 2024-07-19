const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

// Database 연동
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');
// /cust
router
    .get("/",(req,res)=>{   // 127.0.0.1/cust/
        conn = db_connect.getConnection();
        conn.query(db_sql.cust_select, function (err, result, fields) {
            console.log(result);
            res.render('index', { center:'cust/list', datas:result });
            db_connect.close(conn);
        });
    })
    .get("/add",(req,res)=>{   // 127.0.0.1/cust/add
        res.render('index',{'center':'cust/add'});
    })
    .get("/deleteimpl",(req,res)=>{   // 127.0.0.1/cust/deleteimpl
        let id = req.query.id;
        conn = db_connect.getConnection();

        conn.query(db_sql.cust_delete, id, (err, result, fields) => {
            try{
                if(err){
                    console.log('Delete Error');
                    throw err;
                }else{
                    res.redirect('/cust');
                }
            }catch(e){
                console.log(e);
            }finally{
                db_connect.close(conn);
            } 
        });  
    })
    .get("/detail",(req,res)=>{   // 127.0.0.1/cust/detail
        let id = req.query.id;
        conn = db_connect.getConnection();
        conn.query(db_sql.cust_select_one, id, (err, result, fields) => {
            try{
                if(err){
                    console.log('Select Error');
                    throw err;
                }else{
                    console.log(result);
                    custinfo = result[0];
                    console.log(custinfo);
                    res.render('index',{'center':'cust/detail', 'custinfo':custinfo});
                }
            }catch(e){
                console.log(e);
            }finally{
                db_connect.close(conn);
            }
        });
    })
    .post("/updateimpl",(req,res)=>{
        let id = req.body.id;
        let pwd = req.body.pwd;
        let name = req.body.name;
        let acc = req.body.acc;
        console.log(id+' '+pwd+' '+name+' '+acc);
        let values = [pwd,name,acc,id];
        conn = db_connect.getConnection();

        conn.query(db_sql.cust_update, values, (e, result, fields) => {
            try{
                if(e){
                    console.log('Insert Error');
                    console.log(e);
                    throw e;
                }else{
                    console.log('Update OK !');
                    res.redirect('/cust/detail?id='+id);
                }
            }catch(e){
                console.log(e);
            }finally{
                db_connect.close(conn);
            }
           
        });
    })
    .post("/addimpl",(req,res)=>{
        let id = req.body.id;
        let pwd = req.body.pwd;
        let name = req.body.name;
        let acc = req.body.acc;
        console.log(id+' '+pwd+' '+name+' '+acc);
        let values = [id,pwd,name,acc];
        conn = db_connect.getConnection();

        conn.query(db_sql.cust_insert, values, (e, result, fields) => {
            try{
                if(e){
                    console.log('Insert Error');
                    console.log(e);
                    throw e;
                }else{
                    console.log('Insert OK !');
                    res.redirect('/cust');
                }
            }catch(e){
                console.log(e);
            }finally{
                db_connect.close(conn);
            }
           
        });
    });

module.exports = router;