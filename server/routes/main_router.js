const express = require("express")
const axios = require('axios')
const auth = require("../authUtility.js")
let router = express.Router()
const User = require("../models/user.js") //not sure if we need this one but imported for now
const Journal = require("../models/journal.js")
const Dream = require("../models/entry.js")
const journal = require("../models/journal.js")


//Get Requests
router.get('/journals/:_user', auth.verify, async(req,res)=>{
    try{
        let author = req.params._user;
        console.log(author);
        const journalsQuery = await Journal.find({username: author})
        .populate("dreams")

        res.json(journalsQuery.reverse());
    }
    catch (error) {
        //We do this just incase there is some kind of error the server wont just die instantly
        console.log(error);
    }
});



//Post Requests
router.post('/journals', auth.verify,async(req,res)=>{
    //So I think the main things that need to be in the post req body are
    /* {
        username: 
        lanugage:
        title:
        description:
        }
    */
        /* {
        text: 
        hoursslept:
        journalId:
        }
    */
    let newJournalJson = req.body;
    const journalAuthor = await User.findOne({username: newJournalJson.username});

    const newJournal = new Journal({
        username: newJournalJson.username,
        title: newJournalJson.title,
        description: newJournalJson.description,
        dreams: [],
        language: newJournalJson.language,
    });

    journalAuthor.journals.push(newJournal);
    journalAuthor.save();
    await newJournal.save();
    await journalAuthor.populate("journals");
    let listOfJournals = journalAuthor.journals;
    await listOfJournals.forEach(journal => {
         journal.populate("dreams");
    }); 
    res.json(listOfJournals.reverse());

});



//Delete Requests might not have time to implement these 


//Dream Interpretation
router.post('/journals/Interpretation',auth.verify,async(req,res)=>{
    try{
        let journalText = req.body.text;
        const response = await axios.post('http://localhost:7000/image_text', {dream: journalText} );
        const dataFromFlask = response.data;
        res.json({ success: true, data: dataFromFlask });
  } catch (error) {
    console.error('Error making request to Flask backend:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.post('/journals/:_id', auth.verify,async(req,res)=>{
    // console.log(req);
    let newJournalEntry = req.body;
    
    const journalID = await Journal.findById(req.params._id);
    console.log(journalID);
    const newEntry = new Dream({
        Text: newJournalEntry.Text,
        Hours: newJournalEntry.Hours,
    });

    journalID.dreams.push(newEntry); // dreams instead of journals look at journal.js
    journalID.save();
    await newEntry.save();
    await newEntry.save(); 
    await journalID.populate("dreams")
    res.json(journalID.dreams);

});

module.exports = router;
