const path = require("path")
const fs = require("fs/promises")
const Jimp = require("jimp")
const {User} = require('../../models/user')

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const setAvatar = async(req, res) => {
    try {
        const {_id} = req.user;
        const {path: tempPath, originalname} = req.file;
        const [extension] = originalname.split(".").reverse()
        const newName = `${_id}.${extension}`
        const uploadPath = path.join(avatarsDir, newName)

        const img = await Jimp.read(tempPath)
        img.resize(250, 250).write(tempPath)

        await fs.rename(tempPath, uploadPath)
        const avatarURL = path.join("avatars", newName)
        await User.findByIdAndUpdate(_id, {avatarURL})
        res.json({
            avatarURL,
        })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}

module.exports = setAvatar;