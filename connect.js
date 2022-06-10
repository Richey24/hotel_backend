const mongoose = require('mongoose')
const User = require('./schema')
const express = require('express')
const registerController = require('./controller/registerController')
const loginController = require('./controller/loginController')
const updateCustomer = require('./controller/updateCustomer')
const deleteCustomer = require('./controller/deleteCustomer')
const getCustomer = require('./controller/getCustomer')
const app = express()

app.use(express.json())
const port = process.env.PORT || 5000

const url = "mongodb+srv://richey:Rejoice11@cluster0.uq2iuaj.mongodb.net/hotel?retryWrites=true&w=majority"

const start = () => {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(port, () => console.log(`listening at ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()

app.get('/', (req, res) => res.send('hello'))
app.get('/get/customer/all', async (req, res) => {
    const user = await User.find({})
    res.json(user)
})

app.post('/register', registerController)
app.post('/login', loginController)
app.post('/update/customer', updateCustomer)
app.post('/delete/customer', deleteCustomer)
app.post('/get/customer/one', getCustomer)