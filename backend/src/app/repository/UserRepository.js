const User = require("../model/User")
class UserRepository {
    findOneByEmail(email) {
        return User.findOne({"email": email}).exec();
    }

    async save(user) {
        const userCreate = await new User(user);
        await userCreate.save();
    }

    findOneById(id) {
        return User.findById(id);
    }

    findAll () {
        return User.find();
    }
    deleteOne(email){
        return User.deleteOne({'email': email});
    }

}

module.exports = new UserRepository;