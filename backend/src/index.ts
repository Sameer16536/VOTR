import express from 'express';
import userRouter from './routers/user';
import workerRouter from './routers/worker';
const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/v1/user',userRouter)
app.use('/v1/worker',workerRouter)


app.get('/', (req, res) => {
  res.send('Welcome to Votr');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
)
