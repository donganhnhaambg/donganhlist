const User = require("../model/User");
const UserRepository = require("./UserRepository");
class ActionRepository {
    async save(data) {
        const user = await User.findById(data._id);
        user.dashboard = data.dashboard;
        await user.save()
    }

    async saveMessage(data) {
        console.log(data);
        const userFrom = await User.findOne({"email": data.from});
        const userTo = await User.findOne({"email": data.to});
        if (userFrom && userTo) {
            userFrom.message_to.push({
                "user_to": data.to,
                "subject": data.subject,
                "message": data.message,
                "time": data.time
            });
            await UserRepository.save(userFrom).then();

            userTo.message_from.push({
                "user_from": data.from,
                "subject": data.subject,
                "message": data.message,
                "time": data.time
            })

            await UserRepository.save(userTo).then();

            return {
                "message": "Success!"
            }
        } else {
            return {
                "message": "Message has not been sent yet!"
            }
        }
    }

    findById(id) {
        return User.findById(id);
    }
}

module.exports = new ActionRepository;