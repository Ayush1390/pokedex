// useEffect()
// two arguments -> callback and dependency array
// call back argument is alaways executed whenever component is rendered for the first time
// dependency array is optional, if it's empty, callback is executed only once when component is mounted
// if dependency array is not there then callback is executed everytime the components renders
// if vars are passed in the dependency array the callback is executed only when the state(val) of var present in changes

import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemons(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');   
        
        const pokemonResults = response.data.results;
        
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url))
        
        const pokemonData = await axios.all(pokemonResultPromise);
        
        // console.log(pokemonData);

        const res = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return {
                name:pokemon.name, 
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                type:pokemon.types,
                id:pokemon.id
            }
        })

        console.log(res);

        setPokemonList(res);

        setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemons();
    },[])

    return(
        <div className="pokemon-list-wrapper">
           <div className="pokemon-list-heading">Pokemon List</div>
           <div className="pokemon-wrapper">
            {   
                (isLoading)? 'Loading...':
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />) 
            }
           </div>
           <div className="controls">
                <button className="btn">Prev</button>
                <button className="btn">Next</button>
           </div>
        </div>
    )
}


export default PokemonList