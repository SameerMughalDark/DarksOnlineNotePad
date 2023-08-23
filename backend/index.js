const connectToMongo=require('./db');

// connecting to my mongodb or db.js mein sara logic likha hai or function mein wrap kr ky export kr dia hai or yahan py use kr raha hoo clean code ky liye
connectToMongo();

// connecting to express server
const express = require('express')
var cors = require('cors')//agr y package install kr ky use ni karo gy to reactjs mein front side py apny backend ki API use ni kr sko gy data ni aye gaa
const app = express()
const port = 5000
app.use(cors());//agr y package install kr ky use ni karo gy to reactjs mein front side py apny backend ki API use ni kr sko gy data ni aye gaa

// Y neechy wali line mein middleware use kr raha hoo taaky req.body sy data ly skoo warna undefined aye ga
app.use(express.json());


// Our Available Routes
app.use('/api/notes',require('./routes/notes'))
app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})