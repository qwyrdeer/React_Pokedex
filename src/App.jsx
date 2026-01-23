import './App.css'
import PKMN_Logo from '../src/assets/PKMNLogo.svg'
import DexCard from "./components/dexcard/DexCard.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import Button from "./components/button/Button.jsx";

function App() {

    const [allPokemon, setAllPokemon] = useState(null);
    const [error, setError] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [nextUrl, setNextUrl] = useState(null)
    const [previousUrl, setPreviousUrl] = useState(null)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPokemon() {
            try {
                setError(false);
                const response = await axios.get(currentUrl, {signal: controller.signal,});
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
                setAllPokemon(response.data.results);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }

        fetchPokemon();
        return function cleanup() {
            controller.abort();
        }
    }, [currentUrl]);

    return (
        <>
            <div className="page-box">
                <div className='header-image-sizer'>
                    <img src={PKMN_Logo} alt="pokemon logo"/>
                </div>

                <div className='button-box'>
                    <Button
                        disabled={!previousUrl}
                        onClick={() => setCurrentUrl(previousUrl)}
                        ButtonName="vorige"
                    />

                    <Button
                        disabled={!nextUrl}
                        onClick={() => setCurrentUrl(nextUrl)}
                        ButtonName="volgende"
                    />
                </div>
                    {error ? <p>Er is een fout opgetreden</p> : ''}

                <div className='pokemon-box'>
                    {allPokemon?.map((pokemon) => (
                        <DexCard key={pokemon.name} url={pokemon.url}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
