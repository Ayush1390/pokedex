import './Pokemon.css'
import {Link} from 'react-router-dom'

function Pokemon({name,image,id}){
    return(
        <>
            <Link to={`/pokemon/${id}`} className="pokemon">
                <div className='pokemon-name'>{name}</div>
                <img className='pokemon-image' src={image}/>
            </Link>
        </>
    )
}


export default Pokemon;