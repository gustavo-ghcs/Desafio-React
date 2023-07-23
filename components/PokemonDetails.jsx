import React, { useState } from 'react';
import axios from 'axios';

const PokemonDetails = () => {
    const [pokemonNumber, setPokemonNumber] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonType, setPokemonType] = useState('');
    const [loading, setLoading] = useState(false);
    const [pokemonSprite, setPokemonSprite] = useState(null);
    const [error, setError] = useState('');

    const fetchPokemonSprite = async () => {
        try {

            setLoading(true);

            if (pokemonNumber) {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
                const pokemonData = response.data;
                const spriteUrl = response.data.sprites.front_default;
                setPokemonName(pokemonData.name);
                setPokemonType(pokemonData.types[0].type.name);
                setPokemonSprite(spriteUrl);
                setError('');
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }

        } catch (error) {
            console.error('Erro ao buscar os detalhes do Pokémon - ', error);
            setPokemonName('Pokémon não encontrado');
            setPokemonType('Tipo desconhecido');
            setLoading(false);
            setPokemonSprite(null);
            setError('Pokémon não encontrado.');
        }
    };

    const handleChange = (event) => {
        setPokemonNumber(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchPokemonSprite();
    };

    return (
        <div>
            <h1>Pokémon</h1>
            <form onSubmit={handleSubmit}>
                Digite o ID do Pokémon - {' '}
                <input
                    type="number"
                    value={pokemonNumber}
                    onChange={handleChange} />

                <button
                    type="submit"
                    style={{ fontSize: '0.8rem', padding: '5px 10px' }}>Atualizar
                </button>
            </form>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {pokemonName && <p>Nome - {pokemonName}</p>}
                    {pokemonType && <p>Tipo - {pokemonType}</p>}
                    {error && <p>{error}</p>}
                    {pokemonSprite && <img src={pokemonSprite} alt="Pokemon Sprite" />}
                </>
            )}
        </div>
    );
};

export default PokemonDetails;