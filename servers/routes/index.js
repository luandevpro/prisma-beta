const express = require('express');
router = express.Router();
userControllers = require('../controllers/user.controllers');
postControllers = require('../controllers/post.controllers');
categoryControllers = require('../controllers/category.controllers');

router
  .route('/api/user')
  .post(userControllers.createUser)
  .get(userControllers.getUsers);

router
  .route('/api/user/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

router
  .route('/api/post')
  .post(postControllers.createPost)
  .get(postControllers.getPosts);

router
  .route('/api/post/:id')
  .get(postControllers.getPost)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);

router.route('/api/category').get(categoryControllers.getCategories);
router.route('/api/category/:id').get(categoryControllers.getCategory);

module.exports = router;
