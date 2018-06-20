var express=require('express');
var bodyParser=require('body-parser');
var crud=require('./crud');

var app=express();

app.get('/',function(req,res){
    res.sendFile(__dirname+'/testtrial.html')
})

app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.json({limit:'50mb',extended:true}));




app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin',"*");
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-Type');
	next();
});

app.get('/singleUser',function(req,res){
    crud.getSingleUser(req.query._id,function (result) {
        res.send(result);
    })

});


app.delete('/deleteUser',function(req,res){
    crud.deleteTheUser(req.body._id,function (result) {
        res.send(result);
    });
})


app.put('/updateUser',function(req,res){
   crud.updateUser(req.body._id,req.body,function (result) {
       res.send(result);
   })

})


app.get('/api/users',function(req,res){
     crud.readAllUsers(function (result) {
        res.send(result);
    });


})


app.post('/addUser',function(req,res){
    crud.addnewUser(req.body,function (result) {
        res.send(result);
    })

})

app.listen(3000,function(req,res){
    console.log('server is running');

    crud.createMongoConnection();

})


