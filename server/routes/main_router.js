const express = require("express")
const auth = require("../authUtility.js")
let router = express.Router()
const User = require("../models/user.js") //not sure if we need this one but imported for now
const Journal = require("../models/questions.js")

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


