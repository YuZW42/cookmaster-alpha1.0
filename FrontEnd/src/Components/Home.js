import './Home.css';
import {Link} from "react-router-dom";
export  function Home(){
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