const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//implement flask microservice in a later update
// const auth = require("../middleware/auth");


exports.getUser = async (req, res) => {
    const { username } = req.params // params will be a user identifier
    const user = await prisma.user.findUnique({ where: { username }});
    if(!user){
        console.log("User not found with username: " + username)
        return res.status(400).json({ErrorMsg : "User not found"});
    }
    return res.json(user);
}


//swapping to accounts only containing one journal for simplicity

exports.postEntry = async (req, res) => {
    //deconstruct body
    const { text, date } = req.body;
    const { userId } = req.params; // leaving it with generic name of userId since I'm not sure if i want username, email to be unique identifier outside of DB id not sure if that is unsafe
    const user = await prisma.user.findUnique({ where: { email: userId }});
    await prisma.entry.create({
        data: {
            text: text,
            createdAt: date,
            userId: user.id,
        }
    });

    const updatedUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { entries: true }
    });

    //might good to update it to return the user's entries after adding the new instance
    res.json({
        message: "successfully added journal entry",
        entries: updatedUser.entries
    });
}

//function to get entries made by a user, requires email to be in req params
exports.getEntries = async (req, res) => {
    const { email } = req.params;
    const user = await prisma.user.findUnique({
        where: { email },
        include: {entries : true}
    });

    res.json({ userEntries : user.entries});
}

exports.updateEntry = async (req, res) => {
    const { text, createdAt } = req.body;
    const { email } = req.params;
    //TODO create the rest of the logic for retrieving an entry and updating the text field in PSQL
    //Some considerations maybe can there be overlapping dates, if so how would we identify which entry to update
    //for now we wil assume that we can only do one entry per day
    //This may require ensuring users

}