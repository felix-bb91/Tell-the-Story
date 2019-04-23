const db = require('../util/database');


module.exports = class Tags {
  
    static fetchAll() {
        return db.execute('SELECT * FROM tags');
    }

    static saveTagsWithStory(story_id, tag_id){
        return db.execute('INSERT INTO project1_2.S_T (story_id, tag_id) values (?, ?)',[story_id, tag_id]);
    }

    static getAllTagsOfAStory(story_id){
        return db.execute('SELECT tagname from story inner join s_t on story.id = s_t.story_id inner join tags on tags.id = s_t.tag_id where story.id = ?', [story_id]);
    }

}
