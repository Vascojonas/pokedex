const pokeApi ={};


function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon)=>{
    return fetch(pokemon.url)
            .then((response)=>response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=5) => {
    const pokemonList = document.getElementById('pokemonList');

    return fetch(url)
        .then((res) => res.json())
        .then((jsonBody) => jsonBody.results)
        .then(pokemos => pokemos.map(pokeApi.getPokemonDetails))
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonDetails => pokemonDetails)
}