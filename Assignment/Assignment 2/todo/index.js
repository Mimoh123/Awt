import express, { json } from 'express';
import dotenv from 'dotenv';
import { ourprisma } from './prisma/index.js';
import cors from 'cors';
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5500'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hey');
});
app.get('/allList', async (req, res) => {
  try {
    const todo = await ourprisma.toDO.findMany();
    res.json(todo);
  } catch (err) {
    throw new Error(err);
  }
});
app.post('/create_todo', async (req, res) => {
  const { text } = req.body;
  try {
    const todo = await ourprisma.toDO.create({
      data: {
        todo: text,
      },
    });
    if (todo) {
      res.json(todo);
    } else {
      res.send('Failed');
    }
  } catch (error) {
    throw new Error(error);
  }
});
app.listen(PORT, () => {
  console.log('Listening on the port', PORT);
});
