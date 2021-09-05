const persist = require('./persist')
const express = require('express')
const limitter = require('express-rate-limit')
const app = express()
express.static('public')

const bcrypt = require('bcryptjs')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

const UserModel = require("./models/User")
const ProductModel = require("./models/Product")
const MessageModel = require("./models/Message")
const PersonalProductModel = require("./models/PersonalProduct")
const mongoURI = "mongodb://localhost:27017/sessions"

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }).then((res) => {
    console.log("MongoDB connected")
})

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySessions',
})

// let usersData = fs.readFileSync('./persistent_data/users.json')
// let usersFile = JSON.parse(usersData)
// store.collection.users(usersFile, ()=> {
//     console.log("yes")
// })
// store.users.insertMany(usersFile, ()=>{
//     console.log("yes")
// })

app.use(
    session({
        secret: 'key that will sign the cookie',
        resave: false,
        saveUninitialized: false,
        store: store
    })
)

// DDOS ATTACKS PROTECTION
app.use(limitter({
    windowMs: 5000, //5 seconds
    max: 500, //maximum 500 requests per 5 seconds
    message: {
        code: 429,
        message: 'Sorry! You have attempted too many requests :('
    }
}))

const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next()
    } else {
        res.redirect("/Index.html")
    }
}

app.get('*.css', express.static('./static/style/'))
app.get('*.PNG', express.static('./static/'))
app.get('*.JPG', express.static('./static/'))
app.get('*.js', express.static(__dirname))
app.get("/menu.html", express.static('./static/html/'))

app.get("/Index.html", (req, res)=>{
    res.sendFile("Index.html", { root: './static/html/' })
})

app.get("/Register.html", (req, res)=>{
    res.sendFile("Register.html", { root: './static/html/' })
})

// TODO: readme
app.get("/readme.html", (req, res)=>{
    res.sendFile("readme.html", { root: './static/html/' })
})

app.get("/Store.html", isAuth, (req,res) => {
    res.sendFile("Store.html", { root: './static/html/' })
})

app.get("/Admin.html", isAuth, (req,res) => {
    if (req.session.user.username == 'admin') {
        res.sendFile("Admin.html", { root: './static/html/' })
    } else {
        res.redirect('/Homepage.html')
    }

})

app.get("/Messages.html", isAuth, (req,res) => {
    if (req.session.user.username == 'admin') {
        res.sendFile("Messages.html", { root: './static/html/' })
    } else {
        res.redirect('/Homepage.html')
    }

})

app.all('/*.html', (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect("/Index.html")
    }
})
app.get("/*.html", express.static('./static/html/'));

app.post('/register/:user/:pass', async (req,res)=>{ // Register route
    const username = req.params.user
    const password = req.params.pass
    try {
        let user = await UserModel.findOne({username})
        if(user) { // found a user with such username

            res.status(200).send({result:false})

        } else {

            const hashedPsw = await bcrypt.hash(password, 12)
            user = new UserModel({
                username,
                email: `${username}@artbyme.com`,
                password: hashedPsw //encrypted
            })

            await user.save() // in the database

            res.status(200).send({result:true})
        }
    } catch (err) {
        console.log("There has been a problem with registration process!")
    }

})

app.post('/login/:user/:pass/:rm', async (req,res)=>{ // LogIn route
    console.log('Server started login process')
    const username = req.params.user
    const password = req.params.pass
    const rememberMe = req.params.rm
//    try {
        let user = await UserModel.findOne({username})
        if(!user){ // no such user with such username exists
            res.status(200).send({result:'userNotFound'})
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                res.status(200).send({result:'wrongPassword'})
            } else {
                req.session.isAuth = true
                req.session.user = user
                user.loginActivity.push(currentLogTime())

                // if remember me not checked - set cookie 30 minutes
                if (rememberMe == "false") {
                    req.session.cookie.expires = Date.now()
                    req.session.cookie.maxAge = 30 * 60 * 1000
                }

                await user.save()

                res.status(200).send({result:'userFound', session: req.session})
            }
        }
    // } catch (err) {
    //     console.log("There has been a problem with logging in process!")
    // }

})

function currentLogTime(){
    let currentDate = new Date();
    let datetime = currentDate.getDate() + "/"
        + (currentDate.getMonth()+1)  + "/"
        + currentDate.getFullYear() + " @ "
        + currentDate.getHours() + ":"
        + currentDate.getMinutes() + ":"
        + currentDate.getSeconds();
    return datetime;
}

app.post('/logout', isAuth, async (req,res) => {
    try {
        let user = await UserModel.findOne({username: req.session.user.username})
        user.logoutActivity.push(currentLogTime())
        await user.save()
        req.session.destroy((err)=> {
            if (err) throw err
            res.status(200).redirect("/login.html")
        })
    } catch (err) {
        console.log("There has been a problem with logging out process!")
    }

})

app.get('/user', async (req,res) => {
    let response = {
        username: undefined
    }
    if (req.session.user != undefined) {
        try {
            let user = await UserModel.findOne({username: req.session.user.username})
            response = {
                username: user.username,
                cart: user.cart,
                purchases: user.purchases,
                loginActivity: user.loginActivity,
                logoutActivity: user.logoutActivity,
                isAdmin: user.username == 'admin'
            }
        } catch (err) {
            console.log("There has been a problem, could not load user info!")
        }
    }
    res.status(200).send(response)
})

app.get('/get-users-list', async (req,res) => {
    let response = {
        result: undefined
    }
    if (req.session.user != undefined && req.session.user.username == 'admin') {
        try {
            let users = await UserModel.find({})
            response = {
                result: true,
                users: users
            }
        } catch {
            console.log("There has been a problem, could not !")
        }
    }
    res.status(200).send(response)
})

app.get('/messages', async (req,res) => {
    let response = {
        result: undefined
    }
    if (req.session.user != undefined) {
        try {
            if (req.session.user.username == 'admin') {
                let messages = await MessageModel.find({})
                response = {
                    result: true,
                    messagesArray: messages
                }
            }
        } catch (err) {
            console.log("There has been a problem with getting the messages!")
        }
    }
    res.status(200).send(response)
})

app.put('/add-to-cart/:name', async (req,res) => {
    if (req.session.user != undefined) {
        console.log('Server started add-to-cart process')
        const productName = req.params.name
        try {
            let product = await ProductModel.findOne({name: productName})
            let user = await UserModel.findOne({username: req.session.user.username})
            user.cart.push(product)

            await user.save()
            res.status(200).send({result: "The item was added to your cart successfully!"})
        } catch (err) {
            console.log("There has been a problem with add-to-cart process!")
        }

    } else {
        res.status(200).send({result: "You are not connected!"})
    }

})

app.put('/pickColor/add-to-cart/:name/:color', async (req,res) => {
    if (req.session.user != undefined) {
        console.log('Server started pick color & add-to-cart process')
        const productName = req.params.name
        const backgroundColor = req.params.color
        try {
            let product = await PersonalProductModel.findOne({name: productName})
            if (product) {
                product.image_background = backgroundColor
                let user = await UserModel.findOne({username: req.session.user.username})
                user.cart.push(product)
                await user.save()
            }

            res.status(200).send({result: "The item was added to your cart successfully!"})
        } catch (err) {
            console.log("There has been a problem with pick color & add-to-cart process!")
        }

    } else {
        res.status(200).send({result: "You are not connected!"})
    }

})

app.put('/image-to-art/add-to-cart/:image', async (req,res) => {
    if (req.session.user != undefined) {
        console.log('Server started image to art & add-to-cart process')
        try {
            let product = await PersonalProductModel.findOne({name: 'Image-To-Art'})
            product.name += ": " + req.params.image
            product.image_path = "/gallery/personal.png"
            let user = await UserModel.findOne({username: req.session.user.username})
            user.cart.push(product)

            await user.save()
            res.status(200).send({result: "The item was added to your cart successfully!"})
        } catch (err) {
            console.log("There has been a problem with image to art & add-to-cart process!")
        }

    } else {
        res.status(200).send({result: "You are not connected!"})
    }

})

app.put('/remove-from-cart/:name', async (req,res) => {
    if (req.session.user != undefined) {
        console.log('Server started remove-from-cart process')
        const productName = req.params.name
        try {
            let product = await ProductModel.findOne({name: productName})
            if (!product) {
                product = PersonalProductModel.findOne({name: productName})
            }
            let user = await UserModel.findOne({username: req.session.user.username})
            let index = ItemIndex(user.cart, product)
            user.cart.splice(index, 1)
            await user.save()

            res.status(200).send({result: "The selected item was removed from your cart successfully!"})
        } catch (err) {
            console.log("There has been a problem with remove from cart process!")
        }

    }
})

app.put('/checkout', async (req,res) => {
    let response = {result: "Your cart is empty!"}
    if (req.session.user != undefined) {
        console.log('Server started checkout process')
        try {
            let user = await UserModel.findOne({username: req.session.user.username})
            if (user.cart.length != 0) { // cart is not empty
                user.purchases.push({
                    purchased_at: currentLogTime(),
                    items: user.cart
                })
                user.cart = []
                await user.save()
                response = {result: "Thank you for your purchase! :)"}
            }
        } catch (err) {
            console.log("There has been a problem with checkout process!")
        }

    }
    res.status(200).send(response)

})

app.post('/send-message/:header/:content', async (req,res) => {
    let response = {result: true}
    const header = req.params.header
    const content = req.params.content
    let message = null
    if (req.session.user != undefined) {
        console.log('Server started message sending process')
        try {
            message = new MessageModel({
                header: header,
                message: content,
                user: req.session.user,
                sent_at: currentLogTime()
            })
            await message.save()
        } catch (err) {
            console.log("There has been a problem with sending message process!")
        }

    }
    res.status(200).send(response)

})

app.get('/products', async (req,res) => {
    let response = {result: undefined}
    if (req.session.user != undefined) {
        try {
            let products = await ProductModel.find({})
            response = {
                result: true,
                products: products
            }
        } catch (err) {
            console.log("There has been a problem with getting products process!")
        }

    }
    res.status(200).send(response)

})

app.get('/personal-products', async (req,res) => {
    let response = {result: undefined}
    if (req.session.user != undefined) {
        try {
            let products = await PersonalProductModel.find({})
            response = {
                result: true,
                products: products
            }
        } catch (err) {
            console.log("There has been a problem with getting personal-products process!")
        }

    }
    res.status(200).send(response)

})


function ItemIndex(array, item) {
    let i = -1
    for (const arrayElement of array) {
        if (arrayElement.name == item.name) {
            i = array.indexOf(arrayElement)
        }
    }
    return i
}

// loading persisted data into the database
async function loadData() {
    let prods = await ProductModel.findOne({})
    if (!prods) {
        await MessageModel.collection.insertMany(persist.getMessagesData)
        await PersonalProductModel.collection.insertMany(persist.getPersonalProductsData)
        await ProductModel.collection.insertMany(persist.getProductsData)
    }
}
loadData()

module.exports = app
