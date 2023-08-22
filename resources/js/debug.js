// PRINT STATEMENTS FOR DEBUGGING

import {getCompletePokedexData, buildPokemon, findPokemonByName, findPokemonByNumber} from "./utils";

getCompletePokedexData.then((result) => {
    console.log(result[1]);
    const ivysaur = buildPokemon(result[1]);
    console.log(ivysaur);

    let arceus = findPokemonByName("Arceus", result);
    console.log(arceus)
    arceus = buildPokemon(arceus);
    console.log(arceus);
})

