import React,{ useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import Recipe from './Recipe';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    margin:'10px auto',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  
}));

function App() {
  const classes = useStyles();
  const [recipe ,setRecipe] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('chicken');
  const APP_ID ="dd2a9489";
  const APP_KEY = "c3621d978f23af56e25da34a9b9f75b9";

  useEffect(()=>{
    // console.log('effect runs');
    getRecipe();
  } ,[query] );

  const getRecipe = async ()=> {
    const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipe(response.data.hits);
    console.log(response.data.hits);
  }

const updateSearch = (e)=>{
  setSearch(e.target.value);
  console.log(e.target.value);
}

const updateQuery = (e)=>{
 e.preventDefault();
 setQuery(search);
 setSearch("");
}
  return (
    <div>

<Paper onSubmit ={updateQuery} component="form" className={classes.root}>
     
      <InputBase
        type="text" value={search} onChange={updateSearch}
        className={classes.input}
        placeholder="Search For Recipe"
        inputProps={{ 'aria-label': 'search for recipe' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
     
    </Paper>

    
    <Grid container>
      {recipe.map((recipe,index)=> (
          <Grid item xs={3}>
              <Recipe 
                key = {recipe.recipe.label} 
                title = {recipe.recipe.label}
                calories = {recipe.recipe.calories}
                image = {recipe.recipe.image}
                ingredients = {recipe.recipe.ingredients}
              />
          </Grid>
      ))}
    </Grid>
    </div>
  );
}

export default App;
