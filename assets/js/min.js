let offset = 0;
const limit = 5;
maxRecords= 151;
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;



function convertPokemonToLi(pokemon) {
  return `
   <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      
      <div class="detail">
      <ol class="types">
         ${pokemon.types.map(type => `<li class="type ${type}">${type.name}<li>`).join('')}
      </ol>
      <img src="${pokemon.photo}"
       alt="${pokemon.name}">
      </div>
   </li>
   `;
}

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');


function loadPokemonItems(offset, limit){
   fetch(url)
     pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
         const newHtml =  pokemons.map(pokemon =>
         
            `
               <li class="pokemon ${pokemon.type}">
                  <span class="number">#${pokemon.number}</span>
                  <span class="name">${pokemon.name}</span>
                  
                  <div class="detail">
                  <ol class="types">
                     ${pokemon.types.map(type => `<li class="type ${type}">${type}<li>`).join('')}
                  </ol>
                  <img src="${pokemon.photo}"
                  alt="${pokemon.name}">
                  </div>
               </li>
            `
         ).join('');
         pokemonList.innerHTML += newHtml;
     })
     .catch((error) => console.log(error));
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', ()=>{
   offset += limit;

   let qtyNextPage = offest + limit;

   if(qtyNextPage >= maxRecords){
      newLimit = maxRecords - offset;
      loadPokemonItems(offset, newLimit);


      loadMoreButton.parentNode.removeChild(loadMoreButton);
      return;
   }
   loadPokemonItems(offset, limit);
})

 

