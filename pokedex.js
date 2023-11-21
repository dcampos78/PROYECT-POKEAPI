// variables generales
const grill$$ = document.querySelector(".container-pokedex");
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokeId = 151;

//fetch y filtros
const getPokemon = async (url) => {
    try {
        let pokeList = [];
        for (let i = 1; i < pokeId; i++) {
            let response = await fetch(url + i);
            let data = await response.json();
            pokeList.push(data);
        }
        let pokeMaped = pokeMap(pokeList);
        return pokeMaped
    } catch (error) {
        console.error("Ha habido un error en la descarga de pokemon", error);
    }
}

const pokeMap = (pokeWMap) => {
    return pokeWMap.map((pokemon) => ({
        abilities: pokemon.abilities,
        nickname: pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1),
        img: pokemon.sprites.other.dream_world["front_default"],
        type: pokemon.types.map((type) => ' '+type.type.name.charAt(0).toUpperCase()+type.type.name.slice(1)),
        id: pokemon.id,
        statList: pokemon.stats.map((stat) => stat.base_stat),
        }));
};

const pokeDraw = (pokemons) => {
    grill$$.innerHTML = "";
    for (const pokemon of pokemons) {
    let pokemonFigure$$ = document.createElement("figure");
    pokemonFigure$$.setAttribute("class", "container-pokedex-figure");

    let pokemonName = document.createElement("h2");
    pokemonName.textContent = pokemon.nickname;
    pokemonFigure$$.appendChild(pokemonName);

    let pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("class", "container-pokedex-figure-pokeImg");
    pokemonImage.setAttribute("src", pokemon.img);
    pokemonImage.setAttribute("alt", pokemon.nickname);
    pokemonFigure$$.appendChild(pokemonImage);

    let pokeTS$$ =document.createElement('div');
    pokeTS$$.setAttribute("class", "container-pokedex-figure-p");
    let pokemonType = document.createElement("p");
    pokemonType.textContent = pokemon.type;
    pokeTS$$.appendChild(pokemonType);
    let pokemonStats = document.createElement("p");
    pokemonStats.textContent = pokemon.statList;
    pokeTS$$.appendChild(pokemonStats);
    pokemonFigure$$.appendChild(pokeTS$$);

    grill$$.appendChild(pokemonFigure$$);
    }
};

// button effects
const button$$ = document.querySelector(".container-nav-search-button");
button$$.addEventListener('click', inputBtn);
button$$.addEventListener("focus", (event) => {
    event.target.style.background = "yellow";
  });
button$$.addEventListener("blur", (event) => {
event.target.style.background = "";
});

const buttonBug$$ =document.querySelector(".container-item-filter-btn-bug");
const buttonDark$$ =document.querySelector(".container-item-filter-btn-bug");
// buttonBug$$.addEventListener, ('click', bugBtn);
// async function bugBtn(pokemons) {
   


async function inputBtn(data) {
    grill$$.innerHTML = ""; 
    try {
        const input$$ = document.querySelector('input')
        const value = input$$.value;
        const response = await fetch(baseUrl + value);
        const json = await response.json();
        let pokemonFigure$$ = document.createElement("figure");
        pokemonFigure$$.setAttribute("class", "container-pokedex-figure");

        let pokemonName = document.createElement("h2");
        pokemonName.textContent = json.name;
        pokemonFigure$$.appendChild(pokemonName);

        let pokemonImage = document.createElement("img");
        pokemonImage.setAttribute("class", "container-pokedex-figure-pokeImg");
        pokemonImage.setAttribute("src", json.sprites.other.dream_world["front_default"]);
        pokemonImage.setAttribute("alt", json.name);
        pokemonFigure$$.appendChild(pokemonImage);

        let pokeTS$$ =document.createElement('div');
        let pokemonType = document.createElement("p");
        pokemonType.textContent = json.types.map((type) => ' '+type.type.name.charAt(0).toUpperCase()+type.type.name.slice(1));
        pokeTS$$.appendChild(pokemonType);
        let pokemonStats = document.createElement("p");
        pokemonStats.textContent = json.stats.map((stat) => stat.base_stat);
        pokeTS$$.appendChild(pokemonStats);
        pokemonFigure$$.appendChild(pokeTS$$);

        grill$$.appendChild(pokemonFigure$$)
    } catch (error) {
        window.alert('No existe un pokemon con ese nombre', error);
        init();
    }
}
   
//funcion de control de pagina
const init = async () => {
    let pokemonData = await getPokemon(baseUrl);
    grill$$.innerHTML = "";  
    // console.log(pokemonData);
    pokeDraw(pokemonData); 
    
}

init();