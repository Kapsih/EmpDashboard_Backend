const express = require("express")
const router = express.Router()
const {fetchComments, createComments} = require("../controllers/commentController")

router.route("/").post(createComments)
router.route("/:id").get(fetchComments)

module.exports= router