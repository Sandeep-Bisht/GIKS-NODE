const blogController = require('./BlogController')
const router = require("express").Router();
const upload = require('../../multer')

router.post("/add_blog",upload.array('image',10), blogController.createBlog);
// router.post("/add_blog",upload.single("image") ,blogController.createBlog);

router.get("/find_all_blog", blogController.getAllBlogs);
router.delete("/delete_blogById", blogController.deleteBlogById);
router.post("/get_blog_by_slug", blogController.getBlogBySlug);
router.post("/get_blog_by_category", blogController.getBlogByCategory);
router.put("/update_blog_by_slug",upload.array('image',10),blogController.updateBlog)


module.exports = router;