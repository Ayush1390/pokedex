import './App.css'
import CustomRoutes from './routes/CustomRoutes'
import {Link} from 'react-router-dom'

function App() {

  return (
    <div className='outer-wrapper'>
      <h1><Link to={'/'} id='pokedex-heading'>Pokedex</Link></h1>
      <CustomRoutes/>
    </div>
  )
}

export default App
