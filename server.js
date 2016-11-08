const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = "mongodb://yuyao17:kabakebohoa123@ds049456.mlab.com:49456/plaid-todolist";
const mongo = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db;

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(express.static('public'))

mongo.connect(url, function(err, database){
  if (err) {
    return console.log(err);
  }
  db = database
  app.listen(3000, () => {
    console.log('Todo-list active on port 3000!')
  })
})

app.get('/', (req, res) => {
  db.collection('lists').find().toArray((err, data) => {
    if (err) {
      return console.log(err);
    }
    res.render('index.ejs', {lists: data})
    console.log(data)
  })
})

app.post('/add', (req,res) => {
  db.collection('lists').save(req.body, (err, data) => {
    if (err) {
      return console.log(err);
    }
    console.log("successfully saved to database");
    console.log(req.body)
    res.redirect("/")
  })
})

app.put('/add', (req,res) =>{
  var o_id = new ObjectID(req.body._id)
  db.collection('lists').findOneAndUpdate({
    _id:o_id
  }, {
    $set: {
      checked: req.body.checked
    }
  }, (err, result) => {
    if (err) {
      return res.send(err)
    }
    res.send(result)
  })
})

app.delete('/add', (req, res)=>{
  var deleteId = new ObjectID(req.body._id)
  db.collection('lists').findOneAndDelete({
    _id:deleteId
  }, (err, result) => {
    if (err) {
      return res.send(err)
    }
    res.send('A note got deleted')
  })
})
