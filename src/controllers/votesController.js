import { db, objectId } from "../dbStrategy/mongo.js";
import dayjs from "dayjs";

export async function insertVote(req, res) {

    const { id } = req.params;

    try {

        const choiceDb = await db.collection("choices")
            .findOne({ _id: new objectId(id) });

        if (!choiceDb) {
            res.sendStatus(404);
            return;
        }

        await db.collection("votes")
            .insertOne({
                choiceId: id,
                createdAt: dayjs().format("YYYY-MM-DD hh:mm")
            });

        const pollDb = await db.collection("polls")
            .findOne({ _id: new objectId(choiceDb.poolId) });

        const date1 = new Date(dayjs().format('YYYY-MM-DD hh:mm'));
        const date2 = new Date(pollDb.expireAt);

        if (date1 > date2) {
            res.sendStatus(403);
            return;
        }

        res.status(201).send("Voto registrado com sucesso");

    } catch (error) {
        res.sendStatus(500);
    }

}

export async function getResultVote(req, res) {

    const { id } = req.params;

    try {

        const pollDb = await db.collection("polls")
            .findOne({ _id: new objectId(id) });
        
        if (!pollDb) {
            res.sendStatus(404);
            return;
        }

        const choiceDb = await db.collection("choices")
        .find({ poolId: id }).toArray();

        let choiceVotes = await db.collection("votes").find().toArray();
        
        let newChoicesVotes = [];
        let majorChoicesVotes = [];
        let titleChoice = "";

        for(let i = 0; i < choiceDb.length; i ++) {

            newChoicesVotes = await choiceVotes.filter(v => 
                v.choiceId === `${choiceDb[i]._id}`);
            
            if(newChoicesVotes.length > majorChoicesVotes.length) {
                majorChoicesVotes = await newChoicesVotes;
                titleChoice = `${choiceDb[i].title}`;
            }
        }

        const infoPoll = {
            ...pollDb,
            result: {
                title: titleChoice,
                votes: majorChoicesVotes.length}
        }

        res.send(infoPoll);

    } catch (error) {
        res.sendStatus(500);
    }

}