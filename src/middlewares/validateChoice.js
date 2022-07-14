import { db, objectId } from '../dbStrategy/mongo.js';

async function validateChoice(req, res, next) {

  const { poolId, title } = req.body;

  const pollDb = await db.collection("polls")
    .findOne({ _id: new objectId(poolId) });

  if (!pollDb) {
    res.sendStatus(404);
    return;
  }
  

  const choicesDb = await db.collection("choices")
    .findOne({ title, poolId });

  if (choicesDb) {
    res.sendStatus(409);
    return;
  }

  res.locals = { pollDb, choicesDb };

  console.log(pollDb)

  next();
}

export default validateChoice;