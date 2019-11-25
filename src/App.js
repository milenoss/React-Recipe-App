import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => { 

  const APP_ID = '7351426b'
  const APP_KEY = '6fb675de4755936ae5095c64ab2e265d	'

  const[search, setSearch] = useState('')
  const [recipes, setRecipes] = useState([]);
  const[query, setQuery] = useState('chicken')
   
  
  useEffect(() => { 
    getRecipes();
  },[query]);

  const getRecipes = async () => { 
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits);

  }
  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search)
  }


  const getSearch = e => {
    e.preventDefault();
    setQuery(search) 
    setSearch('')
  }

  return (
  <div className = 'App'>
  
      <form onSubmit={getSearch} className= "search-form">
      <input className= 'search-bar' 
       type = 'text' value={search}
       onChange={updateSearch}>

       </input>
      <button className= 'search- button' type = 'submit'>Search
        
      </button>
  
    </form>
    <div className="recipes">
    {recipes.map((recipe)=> (
      <Recipe key={Math.random()} 
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}/>
    ))}
  </div>
  </div>
  );
  }
export default App;
