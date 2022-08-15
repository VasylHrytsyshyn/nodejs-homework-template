const { createError } = require("../../helpers")
const { Contact } = require('../../models/contact')

const updateStatusContact = async (req, res) => {
    const {params, body} = req
    const { id } = params
    if (!body) {
        res.status(400).json({"message": "missing field favorite"})
    }
    const result = await Contact.findByIdAndUpdate(id, body, { new: true })
    if (!result) {
        throw createError(404)
    }
    res.json(result)
}

module.exports = updateStatusContact