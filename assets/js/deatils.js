const headerHtml = document.getElementById("header");
const aboutHtml = document.getElementById("about-propety");
const  statHtml = document.getElementById("stat-table");

(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const number = urlParams.get("number");

  const url = `https://pokeapi.co/api/v2/pokemon/${number}/`;

  return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    .then((pokemon) => {
      convertHeaderToHtml(pokemon);
      aboutProperties(pokemon);
      baseStatsPropeties(pokemon)
     
    });
})();

function baseStatsPropeties(pokemon) {
    let total =0;
   
    color = 0;
    let html=  pokemon.stats.map((poke)=>{
        total += poke.stat_value
        color++;
       return ` 
        <tr>
            <td width="180" height="30">
                ${poke.stat_name}
            </td>
            <td width="50">
                ${poke.stat_value}
            </td>
            <td width="400">
                <span class="evolution">
                    <span  
                        class = "${(color%2)?'fighting':'grass'}"
                        style="
                            width: ${poke.stat_value/100*100}%; 
                            height: 6px; 
                            border-radius: 3px;
                            display:block;
                        "
                    >
                    </span>
                </span>
            </td>
        </tr>
    `
    }).join(' ')
    
    html += `
        <tr>
            <td width="180" height="30">
                Total
            </td>
            <td width="50">
                ${total}
            </td>
            <td width="400">
              <span class="evolution">
                    <span 
                        class = "${(++color%2)?'fighting':'grass'}"
                        style="
                            width: ${(total/(100*pokemon.stats.length))*100}%; 
                            height: 6px; 
                            border-radius: 3px;
                            display: block;
                        ">
                    </span>
                </span>
            </td>
        </tr>
    `
    statHtml.innerHTML = html
}


function aboutProperties(pokemon) {
    console.log(pokemon);

  let about = `
        <tr>
            <td class="first-colum" width="300">Species</td>
            <td class="second-colum"width="400">${pokemon.species}</td>
        </tr>
        <tr>
            <td class="first-colum" width="300">Height</td>
            <td class="second-colum"width="300">${pokemon.height}</td>
        </tr>
        <tr>
            <td class="first-colum" width="300">Weight</td>
            <td class="second-colum"width="300">${pokemon.weight}</td>
        </tr>
        <tr>
            <td class="first-colum" width="300">Abilities</td>
            <td class="second-colum"width="300">${pokemon.abilities.join()}!</td>
        </tr>
        
        <tr>
            <td class="about-title">Breeding</td>
        </tr>

        <tr>
            <td class="first-colum" width="300">Gender</td>
            <td class="second-colum"width="300"> 87.5%</td>
            <td class="second-colum"width=""> 12.5%</td>
        </tr>
        <tr>
            <td class="first-colum" width="300">Egg Groups</td>
            <td class="second-colum"width="300">Not implemented</td>
        </tr>
        <tr>
            <td class="first-colum" width="300">Egg Cycle</td>
            <td class="second-colum"width="300">Not implemented</td>
        </tr>
    `;

    aboutHtml.innerHTML = about;
}

function convertHeaderToHtml(pokemon) {
  let htmlContent = `
                <span class=" name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
                
            
                <ol class="list-types">
                    ${pokemon.types
                      .map((type) => `<li class="item">${type}<li>`)
                      .join("")}
                </ol>

                <img class="imagem" 
                    src="${pokemon.photo}" 
                    alt="${pokemon.name}"
                >
            `;
  headerHtml.innerHTML = htmlContent;
  headerHtml.parentNode.classList.add(pokemon.type);
}

function navChange(e) {
  const target = e.target;
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    link.classList.remove("active");
    if (link === target) {
      link.classList.add("active");
    }
  });

  const content_id = target.href.split("#")[1];

  let content_traget = document.getElementById(content_id);

  const simblings = content_traget.parentNode.getElementsByTagName("div");

  for (elemet of simblings) {
    elemet.classList.add("d-none");
  }
  content_traget.classList.remove("d-none");
}
