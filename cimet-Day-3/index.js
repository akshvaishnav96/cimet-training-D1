// let PokemonsMainData;
let showMorebtn = document.querySelector(".showmore");
let inputArea = document.querySelector("input");
let previewMain = document.querySelector(".preview")
let limit = 20;
let offset = 0;
let mainPokemonData;
let filterPokemonData;

async function fetchData() {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  const data = await res.json();
  return data.results;
}

async function getPokemonData() {
  let pokemons = await fetchData();
  PokemonsMainData = pokemons.map(async (item) => {
    let res = await fetch(item.url);
    let data = await res.json();
    return data;
  });

  return PokemonsMainData;
}

async function generatePreview() {
  let data = await getPokemonData();
  let mainData = await Promise.all(data);
  mainPokemonData = mainData;
 

  mainData.forEach((item) => {
    previewMain.innerHTML += `
         <div class="flip-card">
                     <div class="flip-card-inner">
                       <div class="flip-card-front">
                         <img src="${item.sprites.other["official-artwork"].front_default}" alt="Avatar" ">
                           <h1>${item.name}</h1>
                       </div>
                       <div class="flip-card-back">
                         <h1>${item.name}</h1>
                         <p>Architect & Engineer</p>
                         <img src="${item.sprites.back_default}" alt="Avatar" ">
                       </div>
                     </div>
                   </div>
      `;
  });
}

showMorebtn.addEventListener("click", () => {
  limit += 20;
  offset += 20;
  generatePreview();
});

inputArea.addEventListener("input", (e) => {
    if(e.target.value.length == 0){
        generatePreview()
    }else{

        const inputValue = e.target.value.toLowerCase();
    
        const filteredData = mainPokemonData.filter((item) => {
         
            return item.name.toLowerCase().startsWith(inputValue);
        });
        filterPokemonData = filteredData  
        previewMain.innerHTML = ""
        generateFilterPreview()
        console.log(filterPokemonData);
        
    }

   
    

});

function generateFilterPreview(){
    filterPokemonData.forEach((item) => {
        previewMain.innerHTML += `
             <div class="flip-card">
                         <div class="flip-card-inner">
                           <div class="flip-card-front">
                             <img src="${item.sprites.other["official-artwork"].front_default}" alt="Avatar" ">
                               <h1>${item.name}</h1>
                           </div>
                           <div class="flip-card-back">
                             <h1>${item.name}</h1>
                             <p>Architect & Engineer</p>
                             <img src="${item.sprites.back_default}" alt="Avatar" ">
                           </div>
                         </div>
                       </div>
          `;
      });
}

generatePreview();
