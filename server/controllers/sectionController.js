const User = require('../models/users');
const Story = require('../models/story');
const Section = require('../models/section');
const Token = require('../util/Token'); // Cargamos el token
const TagsInArray = require('../util/reagrupTagsOneStory'); 

// Save a Section
exports.postSection = (req, res, next) => {
   
    //console.log(req.userId); // Lo saca del token

    const id = req.body.id;
    const story_id = req.header('storyId');
    const author_id =  req.userId;
    const uploaded_date = req.body.uploaded_date;
    const body = req.header('section');

    const section = new Section (null, story_id, author_id, null, body);
    //console.log(section);

    // getAllSectionsByStoryID(StoryId) 

    section.createSection()
    .then(() => {
        Story.getStoryByID(story_id)
        .then(([row]) => {

            const story = row;
            Section.getAllSectionsByStoryID(story_id)
            .then(([rowSection]) =>{

                const sections = rowSection;
                //console.log(sections[0]); // Te dará el primero de la lista
                
                const jSection = {
                    token : Token.buildToken(author_id),
                    story: story,
                    sections: sections,
                }
                res.send(jSection);
                /*
                res.render('story', { 
                    pageTitle: 'story',
                    story: story,
                    sections: sections,
                    // Da un objeto en el que la primera (y única fila) es la que tiene la info
                    token : Token.buildToken(author_id)
                });
                */
            }) 
    
        })
    })
    .catch(err => console.log(err));


};


// Traer todas las historias creadas por un usuario
exports.getAllStoriesSectionsAuthor = (req, res, next) => {

    const author_id = req.userId;
    
    Section.getStoriesWhereIWroteSections(author_id)
    .then(([rows]) => {
        const jAllAllStoriesSectionAuthor = {
            storiesTitleSections: rows,
            token: Token.buildToken(author_id),
            userId : author_id,
        };
        res.send(jAllAllStoriesSectionAuthor);

    })
    
    .catch(err => console.log(err));


}; 



exports.getAllSectionsAuthors = (req, res, next) => {

    const idUser = req.userId;
  
    Section.fectchAuthors()
    .then(([rows]) => {
        //console.log(rows);
        allAuthors = [rows];
        console.log(allAuthors);
        
        const jAllAuthors = {
            allAuthors: allAuthors,
            token: Token.buildToken(idUser),
        };
        res.send(jAllAuthors);

    })
    
    .catch(err => console.log(err));


};   


exports.getAllStoriesByAuthorFiltered = (req, res, next) => {

    const idUser = req.userId;
    //console.log(req.body.contributors);
    const contributors = req.body.contributors.split('|'); // reconstruyo el array con los tags
    //console.log(contributors);
    Story.getStoriesByContributors(contributors)
    .then(([rows]) => {
        console.log(rows);
        uniqueIdStories = TagsInArray.createUniqueStoriesWithAllTags(rows);
        //console.log(uniqueIdStories);
        
        const jAllStoriesFiltered = {
            stories: uniqueIdStories,
            token: Token.buildToken(idUser),
            userId: idUser,
        };
        res.send(jAllStoriesFiltered);
        
    })
    
    .catch(err => console.log(err));


};   


