import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails(){

    const {id} = useParams();
    console.log(id);

        const [pokemonInfo, setPokemonInfo] = useState({});
    

    async function donwloadPokemonDeatils(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data)

        setPokemonInfo({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((p)=>p.type.name)

        })

    }

    useEffect(()=>{
        donwloadPokemonDeatils();
    },[])

    return(
        <div className="pokemon-details-wrapper">
            <img src={pokemonInfo.image} className="pokemon-details-image"/>
            <div className="pokemon-details-common-to-all">name : {pokemonInfo.name}</div>
            <div className="pokemon-details-common-to-all">weight : {pokemonInfo.weight} kg</div>
            <div className="pokemon-details-common-to-all">height : {pokemonInfo.height} m</div>
            <div className="pokemon-details-types-wrapper">
                {pokemonInfo.types && pokemonInfo.types.map((t)=> <div className="pokemon-details-types">{t}</div>)}
            </div>
        </div>
    )
}


export default PokemonDetails