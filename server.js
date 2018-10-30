require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

// Avoid CORS problems
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, DELETE, OPTIONS")
    next();
});



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/votingapp'));

const user =  process.env.USER_DB;
const password = process.env.PASS;
const host = process.env.HOST;
const port = process.env.DB_PORT;
const dbName = process.env.DB;

const url = `mongodb://${user}:${password}@${host}:${port}/${dbName}`;

const client = new MongoClient(url,{ useNewUrlParser: true });


client.connect((error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    }

    console.log('Database connected')

    const db = client.db('freecodecamp');
    
    app.get('/api/polls',(req,res) => {                
        try{
            findDocuments(db,(docs) => {                
                res.send(docs);
                //client.close();                                
            });
        }catch(e){
            handleError(e,res);
        }    
    })

    app.get('/api/polls/:_id',(req,res) => {
        try{        
            findDocument(db,req.params._id,(response)=>{
                res.send(response);
                //client.close();
            })            
        }catch(e){
            handleError(e,response);
        }
    })
    
    app.post('/api/polls/add',(req,res) => {
        try{        
            insertDocument(db,req.body,(response) => {                
                res.send(response);
                client.close(); 
            });
        }catch(e){
            handleError(e,response);
        }
    })

    app.delete('/api/polls/delete/:_id',(req,res) => {
        try{        
            removeDocument(db,req.params._id,(response)=>{
                res.send(response);
                client.close();
            })            
        }catch(e){
            handleError(e,response);
        }
    })

    app.get('/*', function(req,res) {    
        res.sendFile(path.join(__dirname+'/dist/votingapp/index.html'));
    });    
    
    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);    
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('polls');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      //assert.equal(err, null); 
      if (err) console.error(err);     
      callback(docs);
    });
  }

  const findDocument = function(db, _id, callback) {
    // Get the documents collection
    const collection = db.collection('polls');
    // Find some documents
    collection.findOne({"_id" : ObjectID(_id)}, (err, doc) => {
      //assert.equal(err, null); 
      if (err) console.error(err);     
      callback(doc);
    });
  }

const insertDocument = function(db,doc,callback){
    // Get the documents collection
    const collection = db.collection('polls');
    collection.insertOne(doc,(err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);        
        callback("Inserted document into the collection");
    })
}

const removeDocument = function(db,_id,callback){
    // Get the documents collection
    const collection = db.collection('polls');
    console.log('_id',_id)
    collection.deleteOne({"_id" : ObjectID(_id) },(err,result)=>{
        if (err) console.error(err);
        assert.equal(err, null);
        assert.equal(1, result.result.n);        
        callback(`Removed the document with the _id equal to ${_id}`);
    })
}

function handleError(err, response) {  
    response.status(500);  
    response.send(
      "<html><head><title>Internal Server Error!</title></head><body><pre>"
      + JSON.stringify(err, null, 2) + "</pre></body></pre>"
    );
  }