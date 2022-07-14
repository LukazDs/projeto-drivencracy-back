import { db, objectId } from '../dbStrategy/mongo.js';

async function validateChoice(req, res, next) {

  const { poolId } = req.body;
  
  const pollDb = await db.collection("polls")
  .findOne({ _id: new objectId(poolId) });

  if (!pollDb) {
    res.sendStatus(404);
    return;
  }

  res.locals.pollDb = pollDb;

  console.log(pollDb)

  next();
}

export default validateChoice;