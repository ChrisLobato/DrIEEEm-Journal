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
    const { text } = req.body;
    const { userId } = req.params;

    await prisma.entry.create({
        data: {
            text: text,
            userId: userId,
        }
    });

    //might good to update it to return the user's entries after adding the new instance
    res.json({message: "successfully added journal entry"});
}