let offset = 0;
const limit = 10;
const maxRecords= 151;

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');







function loadPokemonItems(offset, limit){

     pokeApi.getPokemons(offset, limit).then((pokemons = []) => {    
         console.log(pokemons)

         const newHtml =  pokemons.map(pokemon =>
         
            `
               <li class="pokemon ${pokemon.type}">
                  <a class="nav-link" href="details.html?number=${pokemon.number}">
                     <span class="number">#${pokemon.number}</span>
                     <span class="name">${pokemon.name}</span>
                     
                     <div class="detail">
                     <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}<li>`).join('')}
                     </ol>
                     <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                     </div>
                  </a>
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

   console.log(offset)

   let qtyNextPage = offset + limit;

   if(qtyNextPage >= maxRecords){
      newLimit = maxRecords - offset;
      loadPokemonItems(offset, newLimit);


      loadMoreButton.parentNode.removeChild(loadMoreButton);
      return;
   }
   loadPokemonItems(offset, limit);
})

 

