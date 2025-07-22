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
    //TODO search for entry of same day/Month/Year
    //If exists update otherwise create a new one
    const dateToCheck = new Date(date);
    const startOfDay = new Date(dateToCheck.getFullYear(), dateToCheck.getMonth(), dateToCheck.getDate());
    const endOfDay = new Date(dateToCheck.getFullYear(), dateToCheck.getMonth(), dateToCheck.getDate(), 23, 59, 59, 999);
    const existingEntry = await prisma.entry.findFirst({
        where: { 
            userId: user.id,
            createdAt: {
                gte: startOfDay,
                lt: endOfDay
            } 
        },
    });

    if (existingEntry){
        //Update the entry rather than create a new entry
        await prisma.entry.update({
            where: { id: existingEntry.id},
            data: { text }
        })
    }
    else{
        //Create a new entry since one does not already exist
        await prisma.entry.create({
        data: {
            text: text,
            createdAt: date,
            userId: user.id,
        }
        });
    }

    return res.json({
        message: "successfully added journal entry"
    });
}

//function to get entries made by a user, requires email to be in req params
exports.getEntries = async (req, res) => {
    const { email } = req.params;
    const user = await prisma.user.findUnique({
        where: { email }
    });

    //fetch all entries in ascending order
    const entries = await prisma.entry.findMany({
        where:{
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc'
        },
        select:{
            id:true,
            createdAt: true,
            text:true
        }
    })

    res.json({ userEntries : entries});
}

exports.getEntriesByMonth = async (req, res) => {
    const { email } = req.params;
    const { year, month } = req.query;

    const startDate = new Date(year, month - 1, 1); //assuming month wont be 0 indexed
    const endDate = new Date(year, month, 0);

    const user = await prisma.user.findUnique({
      where: { email }  
    });
    //fetch them in ascending order
    const entries = await prisma.entry.findMany({
        where: {
            userId: user.id,
            createdAt: {
                gte: startDate,
                lt: endDate
            }
        },
        orderBy: { 
            createdAt: 'desc'
        },
        select: {
            id: true,
            createdAt: true,
            text: true
        }
    });

    return res.json({userEntriesByMonth : entries});
}
