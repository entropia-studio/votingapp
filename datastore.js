require('dotenv').config();
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');

var MONGODB_URI = 'mongodb://'+process.env.USER_DB+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;



var pollSchema = mongoose.Schema({      
    placeId    : {type: String, required: true, unique: false},
    userId     : {type: String, required: true, unique: false},
    locationId : {type: String, required: true, unique: false},
    date       : {type: Date, required: true, unique: false}
  })
  
const Poll = mongoose.model('Poll',meetingSchema);  

function connectMongoose(){
    return new Promise((resolve,reject) => {
      try{
        mongoose.connect(MONGODB_URI);
      }catch(e){
        reject(new DataStoreUnknowException("connect",null,e))
      }
    })
  }

  function connect(){
    return new Promise((resolve,reject) => {
      try{
        MongoClient.connect(MONGODB_URI, function(err, client) {                    
          //client.close();
        });        
      }catch(e){
        reject(new DataStoreUnknowException("connect",null,e))
      }
    })
  }



  function addPoll(req,res){        
    return new Promise((resolve,reject) => {
      try{  
        let meeting = new Poll(req);
        meeting.save((error,result) => {
          if (error) reject (new DataStoreUnknowException("insert",companyCode,error))
                resolve(result);
        })
      }catch(e){
        reject(new DataStoreUnknowException("insert",companyCode,e));
      }
    })
  }

  function deletePoll(_id){
    return new Promise((resolve,reject) => {
      try{        
        Poll.deleteOne({_id: _id})
            .exec((error,result) => {            
               if (error) reject(error);
               resolve({'log' : `Poll ${_id} deleted`});
            }
        )
      }catch(e){
        reject(new DataStoreUnknowException("delete",companyCode,e));
      }
    })
  }  

  function getPolls(){
      return new Promise((resolve,reject) => {
        try{            
            let today = moment().startOf('day');            
            Poll.find({"date": {"$gte": new Date(today.toDate())}})
            .exec((error,result) => {
                if (error) reject(error);                
                resolve(result);
            })
        }catch(e){
            reject(new DataStoreUnknowException ("GET",args,e));
        }        
      })
  }
  

  // Exception objects

  function DataStoreUnknowException (method,args,error) {
    this.type = this.constructor.name;
    this.description = 'Error happening during operation: ' + method;
    this.method = method;
    this.args = args;
    this.error = error;
  }
  function DataStoreFieldValidationException(field, error) {
    this.type = this.constructor.name;
    this.description = 'Error during proccesing field: ' + field;  
    this.error = error;
  }


  module.exports = {
    connect,
    addPoll,    
    getPolls,
    deletePoll
  }