const express = require('express');
const mysql = require('mysql');
const upload = require('express-fileupload');
const bodyparser = require('body-parser');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(upload());

const con=mysql.createConnection({
    host:'localhost',
    path:'3306',
    user:'root',
    password:'GIRIJA24@maha',
    database:'crud_app'
})
con.connect((err)=>err?console.log(err):console.log('DATABASE CONNECTED'));

app.post('/details',(request,response)=>{
    const fname=request.body.fname
    const lname=request.body.lname
    const dob=request.body.dob
    const email=request.body.email
    const pwd=request.body.password
  
   
    const sql='insert into userdetails(fname,lname,dob,email,password) values (?,?,?,?,?)';

    con.query(sql,[fname,lname,dob,email,pwd],(err,res)=>{
        if(err){
            let s = {'status':'Error'}
            response.send(s);
            console.log(s)
        }else{
            let s = {'status':'insert'}
            response.send(s);
        }
    })
})

app.get('/view',(request,response)=>{
    const sql='select * from userdetails'
    con.query(sql,(err,res)=>{
        if(err){
          console.log(err);
        }
        else{
            response.send(res);
        } 
    });
});

app.delete('/delet/:id',(request,response)=>{

    let id = request.params.id;

    let sql = 'DELETE from userdetails where id=?';

    con.query(sql,id,(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            let s = {'status':'deleted'}
            response.send(s);
        }
    });
});

app.put('/updat',(request,response)=>{

    const fname=request.body.fname
    const lname=request.body.lname
    const dob=request.body.dob
    const email=request.body.email
    const id=request.body.usid;

        let sql = `update userdetails set fname=?,lname=?,dob=?,email=? where id=${id}`;

        con.query(sql,[fname,lname,dob,email],(err,res)=>{
            if(err){
                let s={"status":"err"}
                response.send(s);
            }
            else{
                let s={"status":"updated"};
                response.send(s);
            }
        })
    })

    app.get('/editview/:usd',(request,response)=>{     
        let id = request.params.usd;
        let sql=`select * from userdetails where id=${id}`

        con.query(sql,(err,res)=>{
            if(err){
              console.log(err);
            }
            else{
                response.send(res);
            } 
        });
    });

    

app.listen(5000);