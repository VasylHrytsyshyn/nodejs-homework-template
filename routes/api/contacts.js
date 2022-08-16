const express = require('express')

const ctrl = require('../../controllers/contacts')
const {ctrlWrapper} = require('../../helpers')
const { validation, isValidId } = require('../../middlewares')
const { schemas } = require('../../models/contact')
const { auth } = require("../../middlewares")

const router = express.Router()

router.get("/", auth, ctrlWrapper(ctrl.listContacts))

router.get("/:id", auth, isValidId, ctrlWrapper(ctrl.getContactById))

router.post("/", auth, validation(schemas.contactAddSchema), ctrlWrapper(ctrl.addContact))

router.delete("/:id", auth, isValidId, ctrlWrapper(ctrl.removeContact))

router.put("/:id", auth, isValidId, validation(schemas.contactAddSchema), ctrlWrapper(ctrl.updateContact))

router.patch("/:id/favorite", auth, isValidId, validation(schemas.updateFavorite), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
