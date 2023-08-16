const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jsonWebTok = require('jsonwebtoken')
const mongoose = require("mongoose")
const User = require('./models/User')
const app = express()
const secret = bcrypt.genSaltSync(8)
const cookieParser = require('cookie-parser')
const jwtSecret = 'fjfjghhssigslhgruhgsnnsjg'
const Restaurant = require('./models/restaurants')
const Reservation = require('./models/Reservation')
// react-reservation-kubert-992 is password for MongoDb

app.use(express.json())
app.use(cookieParser())
// Server is listening to port 5174 or REact app
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}))

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb+srv://reservation:react-reservation-kubert-992@cluster0.fmo4hbp.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message)
    }
  }
  
connectToDatabase()

app.get('/test', (req,res) => {
    res.json('Test Ok')
})

function getUserData(requ) {
    const {token} = requ.cookies

    return new Promise((resolve, reject) => {
        // if (!token || !token) {
        //     reject(new Error('JWT token is missing'));
        //     return;
        // }
        
        jsonWebTok.verify(token, jwtSecret, {}, (err, tokenData) => {
            if (err) {
                reject(err);
            } else {
                resolve(tokenData);
            }
        });
    })
}

app.post('/register', async (req,res) => {
    const {name, email, password} = req.body;

    try {
        const newUser = await User.create({
            name, 
            email, 
            password: bcrypt.hashSync(password, secret),
        })
        res.json(newUser)
    } catch (signUpError) {
        res.status(422).json(signUpError)
    }
    
})

app.post('/signin', async (req,res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email})

    if(userDoc) {
        const checkPassword = bcrypt.compareSync(password, userDoc.password)

        if(checkPassword) {
            jsonWebTok.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDoc)
                console.log('Signed In')
            })
        } else {
            res.status(422).json('Password invtlid')
        }
    } else {
        res.json('user not found')
    }
})

// Verifies JWT, and responds with decoded token data if valid. first line is listening to http get requests to profile endpoint, tokenData in this case is all the user auth info
app.get('/account', (req, res) => {
    const {token} = req.cookies
    if(token) {
        jsonWebTok.verify(token, jwtSecret, {}, async (err, tokenData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(tokenData.id)
            res.json({name, email, _id})
        })
    } else {
        res.json(null)
    }
})

app.post('/signout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.post('/places', async (req,res) => {
    const {name, address, photos, description, ratings, timings, menu_items} = req.body;
    try {
        const newPlace = await Restaurant.create({
            name, 
            address, 
            photos,
            description,
            ratings,
            timings,
            menu_items,
        })
        res.json(newPlace)
    } catch (signUpError) {
        res.status(422).json(signUpError)
    }
})

app.get('/restaurants', async (req, res) => {
    try {
        const documents = await Restaurant.find();
        res.json(documents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
})

app.get('/restaurants/:id', async (req, res) => {
    const {id} = req.params
    try {
        const documents = await Restaurant.findById(id);
        res.json(documents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
})

app.get('/reservation', async (req, res) => {
    res.json( await Reservation.find({user: req.query.userId}).populate('restaurant')) 
})

app.post('/reservation', async (req, res) => {
    // const userData = await getUserData(req);
    const {restaurant, dineDate, dineTime, reservationName, phomeNumber, reservationPeople, user} = req.body
    Reservation.create({restaurant, dineDate, dineTime, reservationName, phomeNumber, reservationPeople, user}).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw err
    })
})




app.listen(4000)