import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1); // Estado para controlar a página atual

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(page - 1) * 20}`);
        const pokemonData = response.data.results;
        setPokemonList((prevList) => [...prevList, ...pokemonData]); // Adicionando novos Pokémon à lista existente
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchPokemonList();
  }, [page]);

  // Função para detectar quando o usuário chegou ao final da lista
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1); // Incrementando o número da página para buscar mais Pokémon
    }
  };

  useEffect(() => {
    // Adicionando um observador de eventos de rolagem
    window.addEventListener('scroll', handleScroll);

    // Removendo o observador quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h2>Lista de Pokémons</h2>
      <div className="pokemon-list-container"> {/* Contêiner com barra de rolagem */}
        <ul>
          {pokemonList.map((pokemon) => (
            <li key={pokemon.name}>
              {pokemon.name} (ID: {getPokemonId(pokemon.url)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const getPokemonId = (url) => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
};

export default PokemonList;