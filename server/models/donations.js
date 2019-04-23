const db = require('../util/database');

module.exports = class Donations {
    constructor(id, user_id, donation, donation_date){
        this.id = id; // Se pone pero luego en el insert no está y al instanciar será null
        this.user_id = user_id;
        this.donation = donation;
        this.donation_date = donation_date; // Se pone pero luego en el insert no está y al instanciar será null
    }

    createDonation() {
        return db.execute(
          'INSERT INTO donations (user_id, donation) VALUES ( ?, ?)',
          [ this.user_id, this.donation]
        );
    }

    // Creo que no se usa, comprobar y eliminar
    static getAllDonationsBy() {
        return db.execute('SELECT * from donations');
    }





    static getTotalDonations() {
        return db.execute('SELECT sum(donation) as "total" from donations');
    }

    static getTotalDonationsOfLast7days() {
        return db.execute('SELECT sum(donation) as "total7" FROM donations WHERE donation_date > DATE_SUB(NOW(), INTERVAL 1 MONTH)');
    }

    static getTotalDonationsOfLast30days() {
        return db.execute('SELECT sum(donation) as "total30" FROM donations WHERE donation_date > DATE_SUB(NOW(), INTERVAL 1 WEEK)');
    }

    static getAllDonationsData(){
        return Promise.all([Donations.getTotalDonations(), Donations.getTotalDonationsOfLast30days(), Donations.getTotalDonationsOfLast7days() ]); 
    }
    
}
