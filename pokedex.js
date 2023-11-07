async function pokemonAll(numero) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+numero);
    const json = await response.json();
    console.log(json);
    }

async function init() {
    const pokemonAll = pokemonAll();


}

