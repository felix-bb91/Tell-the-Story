// ROUTES

const express = require('express');
const router = express.Router();
// const storyController = require('../controllers/story');
const storyController = require('../controllers/storyV2');
const sectionController = require('../controllers/sectionController');
const Token = require('../util/Token'); // Cargamos el token


//router.post('/addStory/:id/:token', Token.verifyParam, storyController.postStory); 
router.post('/addStory', Token.verifyToken, storyController.postStory); 

//router.post('/addSection/:idStory/:token', Token.verifyParam, sectionController.postSection); 
router.post('/addSection', Token.verifyToken, sectionController.postSection); 

//router.get('/home/:token', Token.verifyParam, storyController.getAllStoriesAndTags); 
router.get('/home', Token.verifyToken, storyController.getAllStoriesAndTags); 

//router.get('/story/:idStory/:token', Token.verifyParam, storyController.getAStory); 
router.get('/story', Token.verifyToken, storyController.getAStory); 

//router.get('/showAll/:token',Token.verifyParam, storyController.getAllStoriesAndTagsShowAll); 
router.get('/showAll',Token.verifyToken, storyController.getAllStoriesAndTagsShowAll); 

router.get('/userStories', Token.verifyToken, storyController.getAllStoriesAuthor);

router.get('/userSections', Token.verifyToken, sectionController.getAllStoriesSectionsAuthor);

router.post('/filteredByTags', Token.verifyToken, storyController.getAllStoriesByTagsFiltered);

router.get('/allAuthors', Token.verifyToken, storyController.getAllAuthors);

router.post('/filteredByAuthors', Token.verifyToken, storyController.getAllStoriesByAuthorFiltered);

router.get('/allSectionsAuthors', Token.verifyToken, sectionController.getAllSectionsAuthors);

router.post('/filteredBySectionsAuthors', Token.verifyToken, sectionController.getAllStoriesByAuthorFiltered);


module.exports = router;

