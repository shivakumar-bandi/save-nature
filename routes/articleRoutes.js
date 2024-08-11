const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Route to create an article
router.post('/articles', articleController.createArticle);

// Route to get all articles
router.get('/articles', articleController.getAllArticles);

// Route to get an article by ID
router.get('/articles/:id', articleController.getArticleById);

// Route to update an article
router.put('/articles/:id', articleController.updateArticle);

// Route to delete an article
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
