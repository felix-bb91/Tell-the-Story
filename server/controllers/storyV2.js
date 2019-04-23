// CONTROLLER

const User = require('../models/users');
const Story = require('../models/story');
const Tags = require('../models/tags');
const Token = require('../util/Token'); // Cargamos el token
const TagsInArray = require('../util/reagrupTagsOneStory'); 
const Section = require('../models/section');


// Save a Story
exports.postStory = (req, res, next) => {
    //console.log(req.header('userId'));
    const id = req.body.id;
    const author_id = req.userId;
    const title = req.body.storyTitle; 
    const uploaded_date = req.body.uploaded_date;
    const body = req.body.storyBody; 

    const story = new Story (null, author_id, title, null, body);

    const tags = req.body.tags.split('|'); // reconstruyo el array con los tags
    console.log(req.body);

    let userRow;   // Objeto con toda la info del user
    let idStory; // id de la última story

    story.createStory()
    .then(() => {
        return User.getUserByID(author_id) }) // Recojo la info del user creador
    .then(([row]) => {
        userRow = row[0];
        return Story.getLastStoryId()}) // Necesitamos el id del relato recien creado
    .then(([row]) => { // Devuelve la fila con el id de la última story
        idStory = row[0].id; // Este es el id del relato recien creado
            if(tags){ // Si hay tags
                    return Tags.fetchAll()}}) // Traigo todos los tags de la DDBB
    // forEach of the tags in our create story form, go through each of our tags in the database and check if the tag in the database equals to the tagname in the body.
    .then(([rowsOfTags]) => { // rowsOfTags: todos los tags de la DDBB
        //console.log('hola');
        //console.log(Array.isArray(tags));
        if(typeof tags === 'object'){ // Si se han introducido más de un tag será un array
            tags.forEach(async (tags) => { // tag es la variable con los tags deseados para la story
                rowsOfTags.forEach(async (rowOfTag) => {
                    if (tags === rowOfTag.tagname) {
                        await Tags.saveTagsWithStory(idStory, rowOfTag.id);
                    }
                })
            })
        }
        else{ // Si solo se ha introducido un tag
            rowsOfTags.forEach(async (rowOfTag) => {
                if (tags === rowOfTag.tagname) {
                    await Tags.saveTagsWithStory(idStory, rowOfTag.id);
                }
            })
        }

    })
    .then(() => {
        
        const jStory = {
            userId: author_id,
            story: story,
            token : Token.buildToken(author_id)
        };
        res.send(jStory);
        
        /* Irá a la ruta especificada en el redirect y hará lo que diga
        el router, en este caso verificar el token y cargar todas las historias */
       //res.redirect(`/home/${token}`);
    })  
    .catch(err => console.log(err));
};




// Trae todas las historias en formato objeto con todos sus tags en un array y devuelve los 8 últimos creados
exports.getAllStoriesAndTags = (req, res, next) => {

    //token = req.params.token;
    token = req.token; // token en la propia request
    userId = req.userId;

    Story.getAllStoriesAndTags()
    .then(([rows]) => {
        
        uniqueIdStories = TagsInArray.createUniqueStoriesWithAllTags(rows);
        //console.log(uniqueIdStories);
        uniqueIdStories = uniqueIdStories.slice(0,8);

        const jHome = {
            stories: uniqueIdStories,
            token: token,
            userId : userId,
        };
        res.send(jHome);
        /*
        res.render('home', { 
            pageTitle: 'home',
            stories: uniqueIdStories, // Array de objetos que puedo usar en la plantilla que tiene la info de TODOS los relatos Si un Relato tiene más de un tag ya NO aparecerá como dos objetos diferentes. 
            token: token,
            userId : userId,
        });*/
    })
    
    .catch(err => console.log(err));


};




// Get one Story
exports.getAStory = (req, res, next) => {

    //const idStory = req.params.idStory; // Lo sacará de la URL - mira el js/story.js
    var idStory = req.header('storyId');
    //console.log(idStory);
    idUser = req.userId;

    Story.getStoryByID(idStory)
    .then(([row]) => {
        const story = row;
        Section.getAllSectionsByStoryID(idStory)
        .then(([rowSection]) =>{
            const sections = rowSection;
            //console.log(sections[0]); // Te dará el primero de la lista
            Tags.getAllTagsOfAStory(idStory)
            .then(([rowTags]) =>{
                const tags = rowTags;
                const jStory = {
                    tags: tags,
                    userId: idUser,
                    story: story,
                    sections: sections,
                    // Da un objeto en el que la primera (y única fila) es la que tiene la info
                    token : Token.buildToken(idUser)
                };
                res.send(jStory);
                /*
                res.render('story', { 
                    pageTitle: 'story',
                    story: story,
                    sections: sections,
                    // Da un objeto en el que la primera (y única fila) es la que tiene la info
                    token : Token.buildToken(idUser)
                });
                */
            })
        }) 
    })    
};




// Trae todas las historias en formato objeto con todos sus tags en un array
// Verificar que esta función no hace lo mismo que la de /home aparte del buildToken
exports.getAllStoriesAndTagsShowAll = (req, res, next) => {

    Story.getAllStoriesAndTags()
    .then(([rows]) => {

        uniqueIdStories = TagsInArray.createUniqueStoriesWithAllTags(rows);

        const idUser = req.userId;
         
        const jSeeAll = {
            stories: uniqueIdStories,
            token: Token.buildToken(idUser),
            userId : idUser,
        };
        res.send(jSeeAll);
        /*
        res.render('showAll', { 
            pageTitle: 'showAll',
            stories: uniqueIdStories, // Array de objetos que puedo usar en la plantilla que tiene la info de TODOS los relatos Si un Relato tiene más de un tag ya NO aparecerá como dos objetos diferentes. 
            token : Token.buildToken(idUser),
        });
        */
    })
    
    .catch(err => console.log(err));


};      



// Traer todas las historias creadas por un usuario
exports.getAllStoriesAuthor = (req, res, next) => {

    const author_id = req.userId;
    
    Story.getByAuthorID(author_id)
    .then(([rows]) => {
        const jAllStoriesAuthor = {
            stories: rows,
            token: Token.buildToken(author_id),
            userId : author_id,
        };
        res.send(jAllStoriesAuthor);

    })
    
    .catch(err => console.log(err));


};   



// Traer todas las historias creadas por un usuario
exports.getAllStoriesByTagsFiltered = (req, res, next) => {

    const idUser = req.userId;
    const tags = req.body.tags.split('|'); // reconstruyo el array con los tags
    //console.log(tags);
    Story.getByTags(tags)
    .then(([rows]) => {
        //console.log(rows);
        uniqueIdStories = TagsInArray.createUniqueStoriesWithAllTags(rows);
        console.log(uniqueIdStories);
        
        const jAllStoriesFiltered = {
            stories: uniqueIdStories,
            token: Token.buildToken(idUser),
            userId: idUser,
        };
        res.send(jAllStoriesFiltered);

    })
    
    .catch(err => console.log(err));


};   


exports.getAllAuthors = (req, res, next) => {

    const idUser = req.userId;
  
    Story.fectchAuthors()
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
    console.log(req.body.authors);
    const authors = req.body.authors.split('|'); // reconstruyo el array con los tags
    //console.log(authors);
    Story.getByAuthors(authors)
    .then(([rows]) => {
        //console.log(rows);
        uniqueIdStories = TagsInArray.createUniqueStoriesWithAllTags(rows);
        console.log(uniqueIdStories);
        
        const jAllStoriesFiltered = {
            stories: uniqueIdStories,
            token: Token.buildToken(idUser),
            userId: idUser,
        };
        res.send(jAllStoriesFiltered);
        
    })
    
    .catch(err => console.log(err));


};   


