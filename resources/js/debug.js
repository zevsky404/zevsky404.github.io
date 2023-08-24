// PRINT STATEMENTS FOR DEBUGGING
import {getCompletePokedexData, buildPokemon, findPokemonByName, findPokemonByNumber, buildCard} from "./utils";
function debugMain() {
    getCompletePokedexData.then((result) => {
        console.log(result[1]);
        const ivysaur = buildPokemon(result[1]);
        console.log(ivysaur);

        let arceus = findPokemonByName("Arceus", result);
        let arceus1 = findPokemonByNumber("493", result);
        console.log(arceus)
        console.log(arceus1)
        arceus = buildPokemon(arceus);
        console.log(arceus);


    })
}

document.addEventListener("DOMContentLoaded", debugMain);


