const express = require("express")
const auth = require("../authUtility.js")
let router = express.Router()
const User = require("../models/user.js") //not sure if we need this one but imported for now
const Journal = require("../models/journal.js")
const Dream = require("../models/entry.js")


//Get Requests
router.get('/journals/:user', auth.verify, async(req,res)=>{
    try{
        let author = req.params.author
        const journalsQuery = await Journal.find({username: author})
        .populate("dreams")

        res.json(journalsQuery);
    }
    catch (error) {
        //We do this just incase there is some kind of error the server wont just die instantly
        console.log(error);
    }
});



//Post Requests
router.post('/journals',auth.verify, async(req,res)=>{
    //So I think the main things that need to be in the post req body are
    /* {
        username: 
        lanugage:
        title:
        description:
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
    res.json({message: "success"})

});



//Delete Requests might not have time to implement these 


///Post Journal Entry 



router.get('/journals/:entry', auth.verify, async(req,res)=>{

    let newJournalEntry = req.body;
    const journalID = await User.findById(newJournalEntry.id);

    const newEntry = new Dream({
        Text: newJournalEntry.Text,
        Date: newJournalEntry.Date,
        Hours: newJournalEntry.Hours,
        Location: newJournalEntry.Location,
    });

    journalID.Dream.push(newEntry); // dreams instead of journals look at journal.js
    journalID.save();
    await newEntry.save(); 
    res.json({message: "success"})



});

module.exports = router;


