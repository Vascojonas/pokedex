const pokeApi ={};


function convertPokeApiDetailToPokemon(pokeDetail){
    // console.log(pokeDetail)
   
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map( (poke)=>poke.ability.name)
    pokemon.stats = pokeDetail.stats.map( (poke) => {
            return {'stat_name':poke.stat.name, 'stat_value':poke.base_stat}
    })

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon)=>{
    // console.log(pokemon.url)
    return fetch(pokemon.url)
            .then((response)=>response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((res) => res.json())
        .then((jsonBody) => jsonBody.results)
        .then(pokemos => pokemos.map(pokeApi.getPokemonDetails))
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonDetails => pokemonDetails)
}

