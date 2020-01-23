import express from 'express';
import User from './user'
const app = express();

app.use(User);

export default app;

