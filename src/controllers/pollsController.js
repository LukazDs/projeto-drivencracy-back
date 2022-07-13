import { db } from "../dbStrategy/mongo.js";
import { pollSchema } from "../schemas/pollsSchema.js";

export async function insertPoll(req, res) {
    const poll = req.body;

    const validation = pollSchema.validate(poll)

    if (validation.error) {
        return res.sendStatus(422);
    }

    await db.collection("polls").insertOne(poll)
}