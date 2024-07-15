const express = require("express")
const router = express.Router();

const {createBlog, fetchBlogs, fetchAuthors, fetchTags} = require("../controllers/blog")

router.route("/").post(createBlog).get(fetchBlogs)
router.route("/authors").get(fetchAuthors)
router.route("/tags").get(fetchTags)
module.exports = router