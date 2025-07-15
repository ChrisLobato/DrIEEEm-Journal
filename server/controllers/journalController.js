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
    console.log("route hit");
    const { text } = req.body;
    const { userId } = req.params; // leaving it with generic name of userId since I'm not sure if i want username, email to be unique identifier outside of DB id not sure if that is unsafe
    const user = await prisma.user.findUnique({ where: { email: userId }});
    await prisma.entry.create({
        data: {
            text: text,
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