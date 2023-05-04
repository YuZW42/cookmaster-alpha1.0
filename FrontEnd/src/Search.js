import './Search.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function Search(){
  const [ingredient, setIngredient] = useState('');
  const [returnRecipe, setReturnRecipe] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [errormsg, setErrormsg] = useState('');
  
  const handleInputChange = (event) => {
    const { value } = event.target;
    setIngredient(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/search', {'name': ingredient});
      console.log('Response:', response.data);
      // Handle response, update UI, etc.
      setReturnRecipe(response.data.recipes);
      setErrormsg('')
    } catch (error) {
      console.error('Error:', error.message);
      setErrormsg('check your spelling, please')
      // Handle error, show error message, etc.
    }

    setIngredient('');
  }



  const handleExpand =  ( id) => {
    setReturnRecipe(prevRecipes => {
      return prevRecipes.map( rec => {
        if (rec.id === id) {
        // Yt Link 

        console.log('This is my rec :)', rec.title)
        const r = axios.post('/ytlink', { 'name': rec.title }).then((response) => {
          console.log('here is your link', response.data.Ytlink.items[0].id.videoId);
          setVideoId(response.data.Ytlink.items[0].id.videoId);
          return response.data.Ytlink.items[0].id.videoId
        });
        return { ...rec, expanded: !rec.expanded, videoId: r}

          
        } else{
          return{ ...rec, expanded:false};
        }
        return rec
        
      });
    });
  }


  return(
    <body className="search">
        <header><h1> <img class = "logo" src="cm2.png" alt="alternatetext" /> </h1> </header>
      <form onSubmit={handleSubmit}>
      <p class="warning">Separate Different Ingredients With Commas</p>
        <label htmlFor="ingredient"></label>
        <br></br>
        <div class="searchbox">
        <input
          type="text"
          class="string"
          id="ingredient"
          placeholder="List Ingredients Here..."
          value={ingredient}
          onChange={handleInputChange}
          required
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button type="submit" className="button"><i class="fa fa-search"></i></button>
        </div>
      </form>
      <div>{errormsg}</div>
      <div className="returned-recipe">
        
        {returnRecipe.map((rec)=>{
          return(
            <div className="card"> 
          <h3>{rec.title}</h3>
          <img src={rec.image} className="r-image" alt="food image"></img><br></br>
          <button onClick={() => handleExpand(rec.id)} className="expand-button">
              {rec.expanded ? 'Click here to collapse' : 'Click here to expand'} ↓
            </button>
            {rec.expanded && (
              <div>
                <p>Missing Ingredients: {rec.missedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
                <p>Used Ingredients: {rec.usedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
                <a href={`https://www.epicurious.com/search/${encodeURIComponent(rec.title)}`} target="_blank">Link to related recipes</a>
                <br></br><nr></nr>
                <a href={`https://www.target.com/s?searchTerm=${encodeURIComponent(rec.title)}`} target="_blank">Link to look at {rec.title} on Target  </a>
                {videoId && (
                <iframe width='420' height='315' allowfullscreen='0'
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`}
                  />
                )}
              </div>
            )}         
          </div>
          )
        }    
        )}
      </div>
    </body>
  )

}

export default Search;