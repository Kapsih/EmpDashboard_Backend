const express = require("express")
const router = express.Router();

const {createBlog, fetchBlogs, fetchAuthors} = require("../controllers/blog")

router.route("/").post(createBlog).get(fetchBlogs)
router.route("/authors").get(fetchAuthors)

module.exports = router