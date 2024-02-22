const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/assignment', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongodb Connected")
}).catch(e => {
    console.error('Connection error', e.message)
})

const db = mongoose.connection
mongoose.set('useFindAndModify', false);
db.on('error', console.error.bind(console, 'connection error:'));
module.exports = db