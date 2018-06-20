var mongoClient=require('mongodb').MongoClient;
var mongodb;



var getSingleUser= function(userId,returnResult){
    if(mongodb!=null&&mongodb!=undefined){
        var coll=mongodb.collection('users');
        coll.find({"_id":userId}).toArray(function(err,result){
            if(err){
                returnResult(err);
            }else{
                if(result.length>0)
                returnResult(result);
                else
                    returnResult('no user found with id '+userId);
            }
        })
    }
}

var updateUser=function (userId,userBody,returnResult) {
    if(userId===null){
       returnResult('invalid id');
    }else{

        var coll=mongodb.collection('users');
        coll.find({"_id":userId}).toArray(function (err,result) {
            if(err){
             returnResult('invalid id');
            }else{
                if(result.length===0){
                    returnResult('no user found for id'+" "+userId)
                }else{
                    var updateJson=  makeUpdateJson(userBody);

                    coll.updateOne({"_id":userId},{$set:updateJson},function (err,result) {
                        if(err){
                           returnResult(err);
                        }else{
                           returnResult(result);
                        }
                    })
                }
            }
        })
    }
}

function makeUpdateJson(json){
    var obj={};
    if(json.fname.length>0){
        obj['fname']=json.fname;
    }

    if(json.lname.length>0){
        obj['lname']=json.lname;
    }
    if(json.gender.length>0){
        obj['geder']=json.gender;
    }
    if(json.email.length>0){
        obj['email']=json.email;
    }
    if(json.mnum.length>0){
        obj['mnum']=json.mnum;
    }
    return obj;
}

var addnewUser=function (userBody,returnResult) {
    if(mongodb!=null&&mongodb!=undefined){

        var coll=mongodb.collection('users');

        coll.insert(userBody,function(err,result){
            if(err){
                returnResult(err);
            }else{
                returnResult(result);

            }
        });
    }
}


var readAllUsers=function(returnResult){
    if(mongodb!=null&&mongodb!=undefined){
        var coll=mongodb.collection('users');
        coll.find({}).toArray(function(err,result){
            if(err){
                returnResult(err);
            }else{
                returnResult(result);
            }
        })
    }
}

var deleteTheUser=function (userId,returnResult) {
    var coll=mongodb.collection('users');

    coll.find({"_id":userId}).toArray(function (err,result) {
        if(err){
            returnResult('invalid id');
        }else{
            if(result.length===0){
                returnResult('no user found for id'+userId)
            }else{
                coll.deleteOne({"_id":userId},function (err,result) {
                    if(err){
                        returnResult(err);
                    }else{
                        returnResult(result);
                    }

                })
            }
        }
    })





}

var createMongoConnection=function(){
    if(mongoClient!=null&&mongoClient!=undefined){
        mongoClient.connect('mongodb://localhost:27017/sample',function(err,client){
            if(err){
                console.log('The mongodbis not connected');
                mongodb=null;
            }else{
                mongodb=client.db('mydatabase');
                console.log("Mongo db is connnected");
            }
        })
    }
}

module.exports={
    getSingleUser,
    createMongoConnection,
    updateUser,
    readAllUsers,
    addnewUser,
    deleteTheUser

}

