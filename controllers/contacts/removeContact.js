const { Contact } = require('../../models/contact')
const {createError} = require('../../helpers')

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id)
    if (!result) {
        throw createError(404)
    }
    res.json({
        message: "contact deleted"
    })
}

module.exports = removeContact