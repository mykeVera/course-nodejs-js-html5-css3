const express = require('express');
const bcrypt = require('bcrypt');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const validateJwt = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
});

const signToken = _id => jwt.sign({ _id }, process.env.JWT_SECRET);

const findAndAssignUser = async (req, res, next) => {
    try {
        // En express-jwt v6, el payload del token está en req.user por defecto
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }           
        req.auth = user;
        next();
    } catch (err) {
        next(err);
    }
};

const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser);

const Auth = {
    login: async (req, res)  => {
        const {body} = req;
        try {
            const user = await User.findOne({ email: body.email });
            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
            } else {
                const isMatch = await bcrypt.compare(body.password, user.password);
                if (isMatch) {
                    const signed = signToken(user._id);
                    res.status(200).json({ token: signed });
                } else {
                    res.status(401).json({ message: 'Invalid email or password' });
                }
            }
        } catch (e) {
            res.send(e.message);
        }
    },
    register: async (req, res) => {
        const {body} = req;
        try {
            const isUser = await User.findOne({ email: body.email });
            if (isUser) {
                res.status(409).json({ message: 'Email already in use' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(body.password, salt);
                const user = await User.create({
                    email: body.email,
                    password: hashed,
                    salt: salt,
                });
                const signed = signToken(user._id);
                res.status(201).json({ token: signed } );
            }
        } catch (e) {
            res.status(500).send(e.message);
        }
    },
}

module.exports = { Auth, isAuthenticated };