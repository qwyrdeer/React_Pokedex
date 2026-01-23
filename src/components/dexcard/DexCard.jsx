import './DexCard.css';

import { useEffect, useState } from "react";
import axios from "axios";

function DexCard({url}) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchDetails() {
            const response = await axios.get(url);
            setPokemon(response.data);
        }
        fetchDetails();
        return function cleanup() {
            controller.abort();
    }}, [url]);

    if (!pokemon) return <article className="base-dex-card">Loading...</article>;

    return (
        <article className="base-dex-card">
            <h2>{pokemon.name}</h2>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
            />
            <p>#{pokemon.id}</p>
            <p>Moves: {pokemon.moves.length}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Abilities:</p>
                {pokemon.abilities.map((a) => (
                    <p key={a.slot}>{a.ability.name}</p>
                ))}
        </article>
    );
}

export default DexCard;
