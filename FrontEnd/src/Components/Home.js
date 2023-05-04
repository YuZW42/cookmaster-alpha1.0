/*async function getRecipe(){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '43a538bf98msh845702fed47406cp111041jsn999253279440',
      'X-RapidAPI-Host': 'random-recipes.p.rapidapi.com'
    }
  };
  
  const res =  await fetch('https://random-recipes.p.rapidapi.com/ai-quotes/5', options).then(res => res)
    
  const result = await res.json();

  return result
  /*<div className="random-recipe">

  {result.map((res)=>
    <p>{res.title}</p>  
  )}

</div>;
  console.log(result);
  console.log('hello', result[1].title)


} */ 

import './Home.css';
import {Link} from "react-router-dom";

export  function Home(){
    const r1 = <></>;
    /* getRecipe().then(res=>
      
      console.log('hiiiiii', res[0]) 
      
      );*/



    

    return(
    <body>
    <h2 class="header"> <img class = "logo" src="cm.png" alt="alternatetext" /></h2>
    <div className = "words">
    Normally, we would have some nice introduction text here. But instead of that,
    </div>
    <h1 className="linkbox"> <Link to="/Search" className="searchlink"> Let's Start Cooking! </Link></h1>
    <p></p>
  </body>)

}




export default Home;