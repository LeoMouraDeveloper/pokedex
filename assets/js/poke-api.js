const pokeApi = {}


function createPokemon(pokemonAPI) {
    const pokemon = new Pokemon(pokemonAPI.id, pokemonAPI.name, pokemonAPI.sprites.other['official-artwork'].front_default, pokemonAPI.types)
    pokemon.types = pokemon.convertTypesToList(pokemonAPI.types)
    return pokemon
}

goToProfile = (number, name, photo, notArrayTypes) => {
    const types = notArrayTypes.split(',');
    const pokemon = {number, name, photo, types}
    sessionStorage.setItem('pokemon', JSON.stringify(pokemon));
    window.location.href = "pokemon-descricao.html"
}


pokeApi.getPokemonDetail = (pokemon) => 
    fetch(pokemon.url)
        .then((pokemonList) => pokemonList.json())
        .then(createPokemon)

        
pokeApi.getPokemons = (offset = 0, limit = 16) => {
    const url =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((pokemonsDetail) => Promise.all(pokemonsDetail))
        .catch((error) => {
            console.error('Erro:', error);
    });
}