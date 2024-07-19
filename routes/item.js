const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

// Database 연동
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');
// My Util
var goto = require('../util/goto');
// Multer 사용
const multer  = require('multer')
const limits = {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize : 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files : 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
}
// 파일 경로 및 이름 설정 옵션
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img') // 파일 업로드 경로
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //파일 이름 설정
    }
  })
const upload = multer({ 
    storage: storage
}) 

router
    .get("/",(req,res)=>{   // 127.0.0.1/item
        goto.go(req,res,{'center':'item/list'});
    })
    .get("/add",(req,res)=>{   // 127.0.0.1/item/add
        goto.go(req,res,{'center':'item/add'});
    })
    .post("/registerimpl",upload.single('img'), (req,res)=>{
        let name = req.body.name; 
        let price = req.body.price;
        const { originalname } = req.file
        console.log(`input data ${name}, ${price} , ${originalname}`);

    });

module.exports = router;