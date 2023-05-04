import React, {useState, useEffect} from 'react';
import './Mystery.css';
import axios from 'axios';

function Mystery(){
  let [recipe, setRecipe] = useState([])
  useEffect(()=> {
    // Fetch data from /mystery endpoint in your back-end
    axios.get('/mystery')
      .then(response => {
        
        setRecipe(response.data.Mystery);
        console.log(recipe.data);
      })
      .catch(error => {
        console.error('Error fetching Mystery data:', error);
      });
  },[])

  return (
    <div>
       <p className="top">Check out the <b>Mystery Recipes</b> that might inspire your meal </p>
    <div class="Random">
     

      {recipe.map((rec) => (
          <div class="ingredients">
            {console.log('whats going on', rec.image) }
          {console.log(rec.instructions[0].text)}
          <h3>{rec.title}</h3>
          <img src={rec.image} className="m-image" alt="food image"></img>
          {rec.ingredients.map((r) => {
            return <p>{r}</p>
          
          }
          )}
          {rec.instructions.map((r) =>     


            <li>{r.text}</li>

          )}

            
          </div>
        ))}
    </div>
    </div>
  )
}

export default Mystery