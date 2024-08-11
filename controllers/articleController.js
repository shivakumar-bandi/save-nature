const Article = require('../models/Article');
const upload = require('../middleware/upload');

// Create a new article with an image
exports.createArticle = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { title, author, content } = req.body;

        if (!title || !author || !content || !req.file) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        try {
            const newArticle = new Article({
                title,
                author,
                content,
                image: req.file.path
            });

            await newArticle.save();
            res.status(201).json({ message: 'Article created successfully!', article: newArticle });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server error');
        }
    });
};

// Get all articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'name email');
        res.status(200).json(articles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'name email');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
};

// Update an article
exports.updateArticle = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { title, author, content } = req.body;

        try {
            let article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            article.title = title || article.title;
            article.author = author || article.author;
            article.content = content || article.content;
            if (req.file) {
                article.image = req.file.path;
            }

            await article.save();
            res.status(200).json({ message: 'Article updated successfully!', article });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server error');
        }
    });
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        await article.remove();
        res.status(200).json({ message: 'Article deleted successfully!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
};
