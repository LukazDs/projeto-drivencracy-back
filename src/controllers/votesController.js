import { db, objectId } from "../dbStrategy/mongo.js";
import dayjs from "dayjs";

export async function insertVote(req, res) {

    const { id } = req.params;

    try {

        await db.collection("votes").insertOne({ choiceId: id});
        //expireAt: dayjs().add(30, 'day').format("YYYY-MM-DD hh:mm")

        console.log(await db.collection("votes").find().toArray())

        res.status(201).send("Voto registrado com sucesso");

    } catch (error) {
        res.sendStatus(500);
    }

}
