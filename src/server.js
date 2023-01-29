import { handler } from '../build/handler.js';
import express from 'express';

const app = express();

app.use('/data', express.static('data'))
app.use(handler);
app.listen(3000, () => {
    console.info('Listening on port 3000');
});
