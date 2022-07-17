const express = require('express')

const ctrl = require('../../controllers/contacts')
const {ctrlWrapper} = require('../../helpers')
const { validation, isValidId } = require('../../middlewares')
const {schemas} = require('../../models/contact')

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.listContacts))

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById))

router.post("/", validation(schemas.contactAddSchema), ctrlWrapper(ctrl.addContact))

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact))

router.put("/:id", isValidId, validation(schemas.contactAddSchema), ctrlWrapper(ctrl.updateContact))

router.patch("/:id/favorite", isValidId, validation(schemas.updateFavorite), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
