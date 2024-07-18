const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

// Database 연동
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');
conn = db_connect.getConnection();
router
    .get("/",(req,res)=>{   // 127.0.0.1/cust/
        conn = db_connect.getConnection();
            
        conn.query(db_sql.cust_select, function (err, result, fields) {

            res.render('index', { center:'cust/list', datas:result });
            db_connect.close(conn);
        
        })
    })

    .get("/add",(req,res)=>{   // 127.0.0.1/cust/add
        res.render('index',{'center':'cust/add'});
    })

    .get("/deleteimpl",(req,res)=>{
        let id = req.query.id;
        conn = db_connect.getConnection();

        conn.query(db_sql.cust_delete, id , function (err, result, fields) {

        if(err){
            console.log('Delete Error');
            console.log('Error Message:')+err;
            db_connect.close(conn);
        }else{
            console.log('Delete OK !');
            conn.query(db_sql.cust_select, function (err, result, fields) {

                res.render('index', { center:'cust/list', datas:result });
                db_connect.close(conn);
            
            })
        }
        })        
    })

    .get("/detail",(req,res)=>{   // 127.0.0.1/cust/add
        let id = req.query.id;
        conn = db_connect.getConnection();

        conn.query(db_sql.cust_select_one, id, function (err, result, fields) {

            if(err){
                console.log('Select Error');
                console.log('Error Message:')+err;
                db_connect.close(conn);
            }else{
                console.log(result);
                custinfo = result[0];
                console.log(custinfo);

                
                res.render('index',{'center':'cust/detail','custinfo':custinfo});
                db_connect.close(conn);
            }

        });
    })
    .post("/updateimpl",(req,res)=>{
        let pwd = req.body.pwd;
        let name = req.body.name;
        let acc = req.body.acc;
        let values = [pwd,name,acc];
        console.log(pwd+' '+name+' '+acc);

        conn.query(db_sql.cust_insert,values, (err, result, fields) => {
            if(err){
                console.log('Insert Error');
                console.log('Error Message:')+err;
                db_connect.close(conn);
            }else{
                console.log('Insert OK !');
                conn.query(db_sql.cust_select, function (err, result, fields) {

                    res.render('index', { center:'cust/list', datas:result });
                    db_connect.close(conn);
                
                })
                //화면을 만들어서 내보내는게 아니라 기존에 서버에 있던걸 내보내는 느낌 ㅇㅇ
            }
        });

    })

    .post("/addimpl",(req,res)=>{
        let id = req.body.id;
        let pwd = req.body.pwd;
        let name = req.body.name;
        let acc = req.body.acc;
        let values = [id,pwd,name,acc];
        console.log(id+' '+pwd+' '+name+' '+acc);

        conn.query(db_sql.cust_insert,values, (err, result, fields) => {
            if(err){
                console.log('Insert Error');
                console.log('Error Message:')+err;
                db_connect.close(conn);
            }else{
                console.log('Insert OK !');
                res.redirect('/');
                db_connect.close(conn);
                //화면을 만들어서 내보내는게 아니라 기존에 서버에 있던걸 내보내는 느낌 
            }
        });
    });

module.exports = router;