
const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://azizul:12345@cluster0.13lfhki.mongodb.net/?retryWrites=true&w=majority";

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

    const blogCollection = client.db("blogsDB").collection("blogs");
    const commentCollection = client.db("blogsDB").collection("comment");
    const userCollection = client.db("blogsDB").collection("user");

    // Blog
    app.get('/blogs', async(req, res) => {
      const result = await blogCollection.find().toArray()
      res.send(result)
    })
    app.get('/blogs/:id', async(req, res) => {
      const id = req.params.id
      const filter = {id: id}
      const result = await blogCollection.findOne(filter)
      res.send(result)
    })
    app.post('/blogs', async(req, res) => {
      const query = req.body
      const result = await blogCollection.insertOne(query)
      res.send(result)
    })

    app.patch('/blogs/:id', async(req, res) => {
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const updatedBlog = req.body
      const updateDoc = {
          $set:{

            title:updatedBlog.title, 
            body:updatedBlog.body,
          }
      } 
      const result = await blogCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    app.delete('/blogs/:id', async(req, res) => {
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await blogCollection.deleteOne(filter)
      res.send(result)
    })


    // Comment
    app.get('/comment', async(req, res) => {
      const result = await commentCollection.find().toArray()
      res.send(result)
    })
    app.post('/comment', async(req, res) => {
      const query = req.body
      const result = await commentCollection.insertOne(query)
      res.send(result)
    })
    app.delete('/comment/:id', async(req, res) => {
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await commentCollection.deleteOne(filter)
      res.send(result)
    })

    // user
    app.post('/user', async(req, res) => {
      const query = req.body
      const result = await userCollection.insertOne(query)
      res.send(result)
    })
    app.get('/user', async(req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })
    app.get('/user/:email', async(req, res) => {
      const email = req.params.email
      const filter = {email: email}
      const result = await userCollection.findOne(filter)
      res.send(result)
    })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Blog app running!')
})

app.listen(port, () => {
  console.log(`Blog app running on port ${port}`)
})