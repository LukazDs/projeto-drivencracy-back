import { db } from "../dbStrategy/mongo.js";

export async function insertPoll(req, res) {
    const poll = req.body;

    await db.collection("polls").insertOne(poll)
    
}