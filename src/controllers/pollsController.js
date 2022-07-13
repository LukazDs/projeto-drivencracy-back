import { db } from "../dbStrategy/mongo.js";
import { pollSchema } from "../schemas/pollsSchema.js";

export async function insertPoll(req, res) {
    const poll = req.body;

    const validation = pollSchema.validate(poll);

    if (validation.error) {
        return res.sendStatus(422);
    }

    try {

        await db.collection("polls").insertOne(poll)

        res.status(201).send('Post criado com sucesso');

    } catch (error) {
        res.sendStatus(500);
    }
}