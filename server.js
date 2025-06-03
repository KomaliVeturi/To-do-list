
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tiger@123',
    database: 'todo'
})

db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database");
        return
    }
    console.log("connected with database");
})


app.get('/', (req, res) => {
    console.log('Default Route');
    db.query('select * from todoItems',(err,result)=>{
        if (err) {
            console.log("error occurred");
            return
        }
        console.log("Data :",result);
        res.send(result)
    })
})


app.post('/add-item', (req, res) => {
    console.log(req.body);
    db.query(`insert into todoItems(itemDescription) values('${re.body.text}')`, (err, results) => {
        if (err) {
            console.log("error occurred",err);
            return
        }
        console.log("Created succesfully");
    })
     res.send("Added Succesfully!")
})

app.put('/edit-item',(req,res)=>{
    console.log('Line 54:',req.body);

    db.query(`update todoItems set itemDescription="${req.body.itemDescription}" where ID=${req.body.ID};`, (err, results) => {
        if (err) {
            console.log("error occurred",err);
            return
        }
        console.log("Updated Succesfully");
    })
    res.send("Success");  
})

app.delete('/delete-item',(req,res)=>{
    db.query(`delete from todoitems where id='${req.body.ID}'`,(err,result)=>{
         if (err) {
            console.log("error occurred",err);
            return
        }
        console.log("Deleted Succesfully");
    })
})

app.listen(5000, () => {
    console.log('Server started running on port 5000');
})


