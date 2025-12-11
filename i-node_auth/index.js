const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

const User = require('./user');

mongoose.connect('mongodb+srv://mikeveraq_db_user:iwMaJ25BwpEe8vYl@cluster0.h0fg1o3.mongodb.net/?auth=Cluster0');

const app = express();

app.use(express.json());

const validateJwt = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
});
const signToken = _id => jwt.sign({ _id }, process.env.SECRET);

app.post('/register', async (req, res) => {
    const { body } = req;
    console.log({ body })
    try {
        const isUser = await User.findOne({ email: body.email });
        if (isUser) {
            return res.status(403).send('User already exists');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const user = await User.create({
            email: body.email,
            password: hashedPassword,
            salt,
        });
        const signed = signToken(user.id);
        res.status(201).send(signed);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    const { body } = req;
    try {
        const user = await User.findOne({ email: body.email });
        if (!user) {
            res.status(403).send('User or password incorrect');
        }else {
            const isMatch = await bcrypt.compare(body.password, user.password);
            if (isMatch) {
                const signed = signToken(user._id);
                res.status(200).send(signed);
            }else{
                res.status(403).send('User or password incorrect');
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const findAndAssignUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        req.auth = user;
        next();
    } catch (error) {
        next(error);
    }
};

const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser);
app.get('/lele', isAuthenticated, (req, res) => {
    throw new Error('New error');
    res.send(req.auth);
});

app.use((err, req, res, next) => {
    console.error('Mi nuevo error', err.stack);
    next(err);
});
app.use((err, req, res, next) => {
    res.send('Ha ocurrido un error: ' + err.message);
});
app.listen(3000, () => {
    console.log('Auth service listening on port 3000');
});