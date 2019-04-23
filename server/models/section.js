const db = require('../util/database');

module.exports = class Section {
    constructor(id, story_id, author_id, uploaded_date, body){
        this.id = id; // Se pone pero luego en el insert no está y al instanciar será null
        this.story_id = story_id;
        this.author_id = author_id;
        this.uploaded_date = uploaded_date; // Se pone pero luego en el insert no está y al instanciar será null
        this.body = body;
    }

    createSection() {
        return db.execute(
          'INSERT INTO section (story_id, author_id, body) VALUES ( ?, ?, ?)',
          [ this.story_id, this.author_id, this.body ]
        );
    }


    static getAllSectionsByStoryID(StoryId) {
        return db.execute('SELECT section.id, section.story_id, section.author_id, users.username, section.uploaded_date, section.body, users.imgURL from section inner join users on users.id = section.author_id WHERE story_id = ? ORDER BY uploaded_date ASC;', [StoryId]);
    }
    



    static getSectionByID(id) {
        return db.execute('SELECT * FROM section WHERE section.id = ?', [id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM section order by uploaded_date DESC');
    }

    static fectchAuthors() { // Dejará fuera los usuarios no autores
        return db.execute('SELECT users.username from section join users on users.id = section.author_id');
    }

    static getByAuthorID(author_id) {
        return db.execute('SELECT * FROM section WHERE section.author_id = ? order by uploaded_date DESC', [author_id]);
    }

    static setLikeAnonymousSection(id){
        return db.execute('UPDATE section SET author_id = ?  WHERE author_id= ?',[2, id]);
    }

    static getStoriesWhereIWroteSections(author_id) {
        return db.execute('SELECT section.id as sectionID, section.author_id as sectionAuthor, story.id as storyID, story.title as storyTitle from project1_2.section inner join story on story.id = project1_2.section.story_id WHERE section.author_id = ? group by story.id ORDER BY project1_2.section.uploaded_date DESC;', [author_id]);
    }



}
