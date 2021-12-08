const Admin = require('./auth.model')
const User = require('./user.model')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

class Course{
    findByUsername(username){
        return Admin.findOne({username: username}).lean()    
    }
    validPassword(password, user){
        return bcrypt.compare(password, user.password);
    }
    async createAdmin(req, res) {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        var ad = new Admin({
            username: req.body.username,
            password: passwordHash,
            name: req.body.name,
        });

        ad.save((err, doc) => {
            if (!err){
                return true;
            } 
            else
                return false;
            }
        )
    }
    showUser(){
        return User.find().lean();
    }
}

module.exports = new Course();