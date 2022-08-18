const {User, schemas} = require('../../models/user');

const {createError, sendEmail} = require('../../helpers');

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const {error} = schemas.email.validate({email});
    if(error){
        throw createError(400, error.message);
    }
    const user = await User.findOne({email});
    if(!user) {
        throw createError(404);
    }
    if(user.verify) {
        throw createError(400, "Verification has already been passed")
    }
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Нажмите для подтверждения регистрации</a>`
    }
    await sendEmail(mail);
    res.status(200).json({
        message: "Verification email sent"
    })
}

module.exports = resendVerifyEmail;