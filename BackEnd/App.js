const express = require('express')
const dotenv = require('dotenv')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser');

  //user login


  const admin = require('firebase-admin');

  const serviceAccount = require('./serviceAccountKey.json');
  // Access Firestore using the admin.firestore() method
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    
  });
  const firestore = admin.firestore();
  // Initialize Firebase Admin SDK

  
  const userCollection = firestore.collection('users');
  
  


const port = 8080

dotenv.config();

app.use (bodyParser.json())


app.get('/', (req, res) => {
  // Send a response to the front-end
  res.send('Hello World!');
});
app.get('/firebase', (req, res) => {
  console.log('secondres',res)
  res.send({"Key": process.env.FB_DB_apiKey, 
  "Auth": process.env.FB_DB_authDomain,
  "ID": process.env.FB_DB_projectId,
  "Bucket": process.env.FB_DB_storageBucket,
  "Sender": process.env.FB_DB_messagingSenderId,
  "App": process.env.FIREBASE_FB_DB_appId});
})

  app.get('/mystery', (req,res) => {
    // Make API call to external API
    const options = {
      method: 'GET',
      url: 'https://random-recipes.p.rapidapi.com/ai-quotes/5',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY_Random,
        'X-RapidAPI-Host': 'random-recipes.p.rapidapi.com'
      }
    };
    
    axios.request(options) 
    .then(response => {
      // Extract relevant data from response and send it to front-end
      const recipe = response.data;
      console.log('this is the desired recipe',recipe)
      res.send({
        "Mystery": recipe
      });
    })
    .catch(error => {
      console.error('Error making API call:', error);
      res.status(500).send("Internal Server Error");
    });
  });
  
  app.post('/search', (req, res) => {
    // Retrieve data from request body
    //console.log('my body', req.body)
    const ingredient = req.body.name;
    //console.log({ingredient})

    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY_Spoon}&ingredients=${ingredient}&number=4`)
    .then(response => {
      console.log('show me', response.data[0].title)
          
      res.status(200).json({ message: 'User data received and processed successfully',  recipes: response.data});
    })
    .catch(error => {
      console.error('Error making GET request:', error.message);

      res.status(500).json({ error: 'Failed to process data' });
    });


  });

  (app.post('/ytlink', (req,res) => {
    const dish = req.body.name;
    console.log(dish)
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q:  `cook ${dish}`,    
          
        part: 'snippet,id',
        regionCode: 'US',
        maxResults: '2',
        order: 'Relevance'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY_YTLINK,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(response =>
   {
      console.log(response.data);
      res.send({
        "Ytlink": response.data
      });

    }).catch( error => {
      console.error(error);
    });
  }) )




  //user login



app.post('/firebase/user', (req, res) => {
  const userEmail = req.body.email;
  let snapShot = null;
  (async () => {
    try {
      snapShot = await (await firestore.collection('users').doc(`/${userEmail}/`).get())
      if (snapShot.data() === undefined) {
        (async () => {
          try {
            await firestore.collection('users').doc(`/${userEmail}/`)
                    .create({email: userEmail});

                return res.status(200).send();
          } catch (err) {
            console.log(err)
            return res.status(500).send(error);
          }
        })();
      } else {
        console.log("User already Exists")
      }
    } catch (err) {
      console.log(err)
      return res.status(500).send(error);
    }
  })();
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
