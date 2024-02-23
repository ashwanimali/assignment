const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const fileUpload = require('express-fileupload');
const User = require('./models/user-model')
const { ROLE_LABLE } = require('./models/constants')

const db = require('./db')


const app = express()
const apiPort = process.env.PORT
app.use(fileUpload({
    createParentPath: true
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send('GMSApi is Running!')
})
require('./routes')(app);

User.findOne({ role: ROLE_LABLE.ADMIN })
    .then(async admin => {
        if (!admin) {
            const newAdmin = new User({
                name: "admin",
                username: 'admin',
                password: 'adminpassword',
                role: ROLE_LABLE.ADMIN,
                email: "admin@gmail.com"
            });
            await newAdmin.generateAuthToken()
            return newAdmin.save().then(() => {
                console.log('Admin user added successfully');
            });
        }
    })
    .catch(err => {
        console.error('Error adding admin user:', err);
    });

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))