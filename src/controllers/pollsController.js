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
            ? dayjs().add(30, 'day').format("YYYY-MM-DD hh:mm")
            : poll.expireAt;

        await db.collection("polls").insertOne({title: poll.title, expireAt})

        res.status(201).send('Poll criada com sucesso');

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getPolls(_req, res) {

    try {

        const polls = await db.collection("polls").find().toArray();
        res.status(201).send(polls);

    } catch (error) {
        res.sendStatus(500);
    }
}
