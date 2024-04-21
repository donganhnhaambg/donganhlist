const actionRepository = require('../repository/ActionRepository')
const UserRepository = require("../repository/UserRepository");
const fs = require("fs");
class ActionService {
    save(data) {
        actionRepository.save(data).then();
    }

    saveMessage(data) {
        return actionRepository.saveMessage(data).then();
    }

    async uploadFile(userId, file) {
        try {
            const user = await UserRepository.findOneById(userId);
            if (user) {
                user.file = (file.filename);
                await UserRepository.save(user);
                return {
                    statusCode: 200,
                    message: "Upload Success",
                    url: `./public/file/${file.filename}`
                }
            } else {
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error('Lỗi khi xoá tệp tin:', err);
                    }
                });
                return {
                    statusCode: 400,
                    message: "Upload fail"
                }
            }
        } catch (err) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Lỗi khi xoá tệp tin:', err);
                }
            });
            return {
                statusCode: 400,
                message: "Upload fail"
            }
        }
    }

    async downloadFile(reqUser) {
        const user = await UserRepository.findOneById(reqUser.id);
        if (user && user.file != "" ) {
            return user.file
        }
    }

    async getAllUser() {
        const users = await UserRepository.findAll();
        return {
            statusCode: 200,
            users: users
        }
    }
}

module.exports = new ActionService;