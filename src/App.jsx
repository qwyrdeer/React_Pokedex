import './App.css'
import PKMN_Logo from '../src/assets/PKMNLogo.svg'
import DexCard from "./components/dexcard/DexCard.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {

    const [allPokemon, setAllPokemon] = useState(null);
    const [error, setError] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [nextUrl, setNextUrl] = useState(null)
    const [previousUrl, setPreviousUrl] = useState (null)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPokemon() {
            try {
                setError(false);
                const response = await axios.get(currentUrl);
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
                console.log(response.data.results);
                setAllPokemon(response.data.results);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }
        fetchPokemon();
        return function cleanup() {
            controller.abort();
    }}, [currentUrl]);

  return (
      <>
          <div className='header-image-sizer'>
              <img src={PKMN_Logo} alt="pokemon logo"/>
          </div>
          
          <div className='button-box'>
          <button
              disabled={!previousUrl}
              onClick={() => setCurrentUrl(previousUrl)}
          >
              vorige
          </button>

          <button
              disabled={!nextUrl}
              onClick={() => setCurrentUrl(nextUrl)}
          >
              volgende
          </button>
          </div>

        <div className='pokemon-box'>
          {allPokemon?.map((pokemon) => (
              <DexCard key={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      </>
  )
}

export default App
