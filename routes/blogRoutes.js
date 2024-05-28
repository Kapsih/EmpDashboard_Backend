const express = require("express")
const router = express.Router();

const {createBlog, fetchBlogs} = require("../controllers/blog")

router.route("/").post(createBlog)
router.route("/:id").get(fetchBlogs)

module.exports = router