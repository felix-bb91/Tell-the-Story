// CONTROLLER

const User = require('../models/users');
const formidable = require('../node_modules/formidable'); // Para poder manejar ficheros en la edición del perfil
const Token = require('../util/Token'); // Cargamos el token
const StatisticsService = require('../services/statisticsService');// Cargamos el servicio de mongo 
const UserService = require('../services/usersService');
const Section = require('../models/section');
const Story = require('../models/story');
const StoriesService = require('../services/storiesService');
const Donations = require('../models/donations');



// Remove User
exports.postRemoveUser = (req, res, next) => {
    
    const idUser = req.userId; 
    
    /* Antes de borrarlo es necesario actualizar los relatos y secciones a un author ANONYMOUS */

    Story.setLikeAnonymousStory(idUser)
    .then(() => { 
        Section.setLikeAnonymousSection(idUser)
        .then(() => { 
            User.removeUser(idUser) 
            .then(() => { 
                //res.redirect('/');
                const jRemoveProfile = {
                    userId : idUser,
                    userRemoved: true,
                };
                res.send(jRemoveProfile);
            })
        })
    })
    .catch(err => console.log(err));

};



// Block User by admin
exports.postBlockAccess = (req, res, next) => {
    
    const idUser = req.userId; 
    let myToken = Token.buildToken(idUser);
    const idUserToRemoveFromAdmin = req.params.userId;

    User.blockAccess(idUserToRemoveFromAdmin) 
    .then(() => { 
        StoriesService.getAllStories()
        .then((stories) => {
            UserService.getAllUsers()
            .then((users) => {
                //console.log(users);
                Donations.getAllDonationsData()
                .then((donationRes) => {
                    StatisticsService.getAllAccessStatistics()
                    .then((results) =>{
                        //console.log(results);
                        res.render('adminHome', { 
                            pageTitle: 'adminHome',
                            AllAccessStatistics : results,
                            AllUsersInfo : users, 
                            AllStoriesInfo : stories,
                            AllDonationsInfo: donationRes, // [total, 30, 7 dias]
                            token : myToken,
                        }); 
                    })
                })
            })
        })
        .catch(err => {console.log(err);});    
    })
    .catch(err => console.log(err));
};


// Unblock User by admin
exports.postUnblockAccess = (req, res, next) => {
    
    const idUser = req.userId; 
    let myToken = Token.buildToken(idUser);
    const idUserToUnblockFromAdmin = req.params.userId;

    User.unblockAccess(idUserToUnblockFromAdmin) 
    .then(() => { 
        StoriesService.getAllStories()
        .then((stories) => {
            UserService.getAllUsers()
            .then((users) => {
                //console.log(users);
                Donations.getAllDonationsData()
                .then((donationRes) => {
                    StatisticsService.getAllAccessStatistics()
                    .then((results) =>{
                    //console.log(results);
                    res.render('adminHome', { 
                        pageTitle: 'adminHome',
                        AllAccessStatistics : results,
                        AllUsersInfo : users, 
                        AllStoriesInfo : stories,
                        AllDonationsInfo: donationRes, // [total, 30, 7 dias]
                        token : myToken,
                    }); 

                })
                })
                

            })
        })
        .catch(err => {console.log(err);});    
    })
    .catch(err => console.log(err));
};

// Get myProfile
exports.getProfile = (req, res, next) => {
    
    const idUser = req.userId; // en Token.js modificamos el req para añadir este parámetro
    
    User.getUserByID(idUser)
        .then(([row]) => {

            const jSeeProfile = {
                userInfo: row[0],
                token: Token.buildToken(idUser),
                userId : idUser,
            };
            res.send(jSeeProfile);

            /*
            res.render('myProfile', { 
                pageTitle: 'myProfile',
                user: row[0], // Variable que puedo usar en la plantilla que tiene la info del usuario
                token : Token.buildToken(idUser), // usamos el dato que es único para cada usuario a la hora de construir el token
            }); */
    })
    .catch(err => console.log(err));


};



// Get a Public Profile
exports.getPublicProfile = (req, res, next) => {
    
    const idUser = req.userId; // en Token.js modificamos el req para añadir este parámetro
    const idPublicUser = req.body.idPublicUser;
    //console.log(req.body);
    
    User.getUserByID(idPublicUser)
        .then(([row]) => {
            const publicUserInfo = row[0];
            Story.getByAuthorID(idPublicUser)
                .then(([row]) => {
                    const storiesPublicUser = row;
                    Section.getByAuthorID(idPublicUser)
                        .then(([row]) => {
                            const sectionsPublicUser = row;

                            const jSeePublicProfile = {
                                publicUserInfo: publicUserInfo,
                                sectionsPublicUser:sectionsPublicUser,
                                storiesPublicUser:storiesPublicUser,
                                token: Token.buildToken(idUser),
                                userId : idUser,
                                idPublicUser : idPublicUser,
                            };
                            res.send(jSeePublicProfile);


                        })

                })




            

    })
    .catch(err => console.log(err));


};




// Post EDIT myProfile

exports.saveImg = (req, res) => {
    //console.log('inside post');
    const idUser = req.userId; 
    var form = new formidable.IncomingForm(); // Creo un formulario
    form.parse(req); // Parseo la request
    //console.log(req.body);
    // Cuando empiece la transferencia:
    form.on('fileBegin', function (name, file){ 
        //console.log('inside fileBegin');
        let whereTheFileWillBe = __dirname + '/../public/images/uploads/' + file.name; // ruta donde irá temporalmente el fichero
        file.path = whereTheFileWillBe; // Cambio la ruta por defecto a la que yo he dicho
        //console.log("Imagen subiendose");
        //console.log(whereTheFileWillBe);
        //console.log('traza');
    });
    // Cuando se haya realizado la transferencia:
    form.on('file', function(name,file){
        
        //console.log('Uploaded ' + file.name);
        const fileRelativePath = '/images/uploads/' + file.name;
        // Guarda URL Img en DDBB
        User.postImg(idUser, fileRelativePath)
        .then(([]) => {
            // Una vez guardada la muestro en pantalla
            return User.getUserByID(idUser)})
                .then(([row]) => {
                    console.log(row);   // Vemos que da un array de objetos

                    const jSeePublicProfile = {
                        updatedProfile: row[0],
                    };
                    res.send(jSeePublicProfile);

                    /*
                    res.render('myProfile', { 
                        pageTitle: 'myProfile',
                        user: row[0], // Variable que puedo usar en la plantilla que tiene la info del usuario
                        token : Token.buildToken(idUser) // usamos el dato que es único para cada usuario a la hora de construir el token
                    });
                    */
                
                })
        .catch(err => console.log(err));

    });
    
};





























