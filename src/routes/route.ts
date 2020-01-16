import express from 'express';
const app = express();

import User from './user'

app.use(User);

export default app;

