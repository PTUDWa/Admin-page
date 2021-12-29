const Admin = require("./auth.model");
const User = require("./user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

class Course {
  findByUsername(username) {
    return Admin.findOne({ username: username }).lean();
  }
  validPassword(password, user) {
    return bcrypt.compare(password, user.password);
  }
  async createAdmin({ username, password, name }) {
    const passwordHash = await bcrypt.hash(password, 10);
    var ad = new Admin({
      username: username,
      password: passwordHash,
      name: name,
    });

    ad.save((err, doc) => {
      if (!err) {
        return true;
      } else return false;
    });
  }
  showAdmin() {
    return Admin.find({}).lean();
  }
  showUser() {
    return User.find({}).lean();
  }
  async lockUser(id){
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const update = {
      lock_status: true,
    };
    await User.findOneAndUpdate(filter, update);
  }
  async unlockUser(id){
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const update = {
      lock_status: false,
    };
    await User.findOneAndUpdate(filter, update);
  }
  detailUser(id){
    return User.findOne({_id: mongoose.Types.ObjectId(id)})
  }
}

module.exports = new Course();
