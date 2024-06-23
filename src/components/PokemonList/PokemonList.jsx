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

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl,setNextUrl] = useState('');
    // const [prevUrl,setPrevUrl] = useState('');

    //                       or

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    })

    async function downloadPokemons(){

        // setIsLoading(true);
        //              or
        setPokemonListState((state)=>({...state, isLoading:true}));
        
        // const response = await axios.get(pokedexUrl); 
        //              or
        const response = await axios.get(pokemonListState.pokedexUrl);
    

        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);
        //              or
        setPokemonListState((state)=>({
            ...state, 
            nextUrl:response.data.next, 
            prevUrl:response.data.previous
        }));


        
        const pokemonResults = response.data.results; 
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonResultPromise);
        

        const res = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return {
                name:pokemon.name, 
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                type:pokemon.types,
                id:pokemon.id
            }
        })

        // setPokemonList(res);
        // setIsLoading(false);
        //              or
        setPokemonListState((state)=>({
            ...state, 
            pokemonList:res, 
            isLoading:false
        }));
    }

    // useEffect(()=>{
    //     downloadPokemons();
    // },[pokedexUrl])
    //          or
    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl])

    return(
        <div className="pokemon-list-wrapper">
           <div className="pokemon-list-heading">Pokemon List</div>
           <div className="pokemon-wrapper">
            {   
                // (isLoading)? 'Loading...':
                // pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />) 
                //              or
                (pokemonListState.isLoading)? 'Loading...':
                pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />) 
            }
           </div>
           <div className="controls">
                {/* <button className="btn" disabled={!prevUrl} onClick={()=> setPokedexUrl(prevUrl)} >Prev</button>
                <button className="btn" disabled={!nextUrl} onClick={()=> setPokedexUrl(nextUrl)} >Next</button> */}
                {/*                 or               */}
                <button className="btn" disabled={pokemonListState.prevUrl === null} onClick={()=> setPokemonListState((state)=>({...state, pokedexUrl:state.prevUrl}))} >Prev</button>
                <button className="btn" disabled={pokemonListState.nextUrl === null} onClick={()=> setPokemonListState((state)=>({...state, pokedexUrl:state.nextUrl}))} >Next</button>
           </div>
        </div>
    )
}


export default PokemonList