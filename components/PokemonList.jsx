import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(page - 1) * 20}`);
        const pokemonData = response.data.results;

        if (page === 1) {
          setPokemonList(pokemonData);
        } else {
          setPokemonList((prevList) => [...prevList, ...pokemonData]);
        }
        
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchPokemonList();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const listContainer = document.getElementById('pokemon-list-container');
    listContainer.addEventListener('scroll', handleScroll);

    return () => {
      listContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="pokemon-list-container">
      <h2>Lista de Pokémons</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            {pokemon.name} (ID: {getPokemonId(pokemon.url)})
          </li>
        ))}
      </ul>
    </div>
  );
};

const getPokemonId = (url) => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
};

export default PokemonList;