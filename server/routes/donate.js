const express = require('express');
const donateRouter = express.Router();
const stripe = require("stripe")(process.env.SP_KEY);
// process.env.SP_KEY --> tu sk_test entre comillas
// https://dashboard.stripe.com/test/dashboard
const Donation = require('../models/donations');
const Token = require('../util/Token');



const charge = (token, amt) => {
  return stripe.charges.create({
    amount: amt * 100,
    currency: 'eur',
    source: token,
    description: 'Donation'
  });

}

donateRouter.post("/donate", Token.verifyToken, async (req, res) => {
    //console.log(req.body);
    try {
      let data = await charge(req.body.token.id, req.body.amount);
      
      if(data.status == 'succeeded'){
        const id = req.body.id;
        const user_id =  req.userId;
        const donation =   req.body.amount;
        const uploaded_date = req.body.uploaded_date;

        const userDonation = new Donation (null, user_id, donation, null);

        userDonation.createDonation()
        .then(() => {

          const jDonation = {
            token : Token.buildToken(user_id),
          }
          res.send(jDonation);
        
        })
        .catch(err => {console.log(err);});  

      }
      else{
        res.send("Donation failed!");
      }
      
  
      
    } catch (err) {
      res.status(500);
    }
});

module.exports = donateRouter;