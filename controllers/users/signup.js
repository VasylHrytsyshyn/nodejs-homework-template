const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")

const {User, schemas} = require('../../models/user')

const {createError, sendEmail} = require('../../helpers')

const singup = async(req, res)=> {
    const {error} = schemas.signup.validate(req.body)
    if(error){
        throw createError(400, error.message)
    }
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user) {
        throw createError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email)

    const verificationToken = nanoid()

    const result = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken })

    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения регистрации</a>`
    }
    await sendEmail(mail)
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    })
}

module.exports = singup
