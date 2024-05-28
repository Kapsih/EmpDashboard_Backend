const express = require("express")
const router = express.Router();

const {createBlog, fetchBlogs, fetchBlog} = require("../controllers/blog")

router.route("/").post(createBlog)
router.route("/:id").get(fetchBlogs)
router.route("/Blog/:id").get(fetchBlog)

module.exports = router