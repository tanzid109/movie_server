const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// HMtsfzChPT9sUKQt




//middleware
app.use(cors())
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://tanzid109:2Y4poTlX4sl07mie@movieportal.agm7k.mongodb.net/?retryWrites=true&w=majority&appName=MoviePortal";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const movieCollection = client.db('movieDB').collection('movie')
        const favouriteMovie=client.db('favMovie').collection('fmovie')

        app.get('/movie',async(req,res)=>{
            const cursor =movieCollection.find();
            const result =await cursor.toArray()
            res.send(result);
        })
        app.get('/movie/:id',async(req,res)=>{
            const id=req.params.id;
            const query ={_id: new ObjectId(id)}
            const result = await movieCollection.findOne(query);
            res.send(result)
        })

        app.post('/movie', async (req, res) => {
            const newMovie = req.body;
            console.log(newMovie);
            const result = await movieCollection.insertOne(newMovie);
            res.send(result);
        })
        app.post('/favmovie', async (req, res) => {
            const favMovie = req.body;
            console.log(favMovie);
            const result = await favouriteMovie.insertOne(favMovie);
            res.send(result);
        })
        app.get('/favmovie', async (req, res) => {
            const cursor = favouriteMovie.find();
            const result = await cursor.toArray()
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Movie server is running')
})

app.listen(port, () => {
    console.log(`Movie server is running on port : ${port}`);
})