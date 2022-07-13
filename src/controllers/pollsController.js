import dayjs from "dayjs";
import { db } from "../dbStrategy/mongo.js";
import { pollSchema } from "../schemas/pollsSchema.js";

export async function insertPoll(req, res) {
    const poll = req.body;

    const validation = pollSchema.validate(poll);

    if (validation.error) {
        return res.sendStatus(422);
    }

    try {

        const expireAt = poll.expireAt.length === 0 
            ? dayjs().add(30, 'day').format("YY-MM-DD hh:mm")
            : poll.expireAt;

        await db.collection("polls").insertOne({title: poll.title, expireAt})

        res.status(201).send('Post criado com sucesso');

    } catch (error) {
        res.sendStatus(500);
    }
}