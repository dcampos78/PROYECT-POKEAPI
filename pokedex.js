// variables generales
const grill$$ = document.querySelector("#pokedex");
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
        return pokeMaped;
        return pokeList;

    } catch (error) {
        console.error("Ha habido un error en la descarga de pokemon", error);
    }
}

const pokeMap = (pokeWMap) => {
    return pokeWMap.map((pokemon) => ({
        abilities: pokemon.abilities,
        nickname: pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1),
        img: pokemon.sprites.other.dream_world["front_default"],
        type: pokemon.types.map((type) => type.type.name.charAt(0).toUpperCase()+type.type.name.slice(1)),
        id: pokemon.id,
        statList: pokemon.stats.map((stat) => stat.base_stat),
        }));
};

const pokeDraw = (pokemons) => {
    grill$$.innerHTML = "";
    for (const pokemon of pokemons) {
    let pokemonFigure$$ = document.createElement("figure");

    let pokemonName = document.createElement("h2");
    pokemonName.textContent = pokemon.nickname;
    pokemonFigure$$.appendChild(pokemonName);

    let pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("class", "pokeImg");
    pokemonImage.setAttribute("src", pokemon.img);
    pokemonImage.setAttribute("alt", pokemon.nickname);
    pokemonFigure$$.appendChild(pokemonImage);

    let pokemonType = document.createElement("p");
    pokemonType.textContent = pokemon.type;
    pokemonFigure$$.appendChild(pokemonType);

    let pokemonStats = document.createElement("p");
    pokemonStats.textContent = pokemon.statList;
    pokemonFigure$$.appendChild(pokemonStats);


    grill$$.appendChild(pokemonFigure$$);
}
};

//funcion de control de pagina
const init = async () => {
    let pokemonData = await getPokemon(baseUrl);
    grill$$.innerHTML = "";  
    // console.log(pokemonData);
    pokeDraw(pokemonData);
}

init();