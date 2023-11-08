// PRINT STATEMENTS FOR DEBUGGING
import {getCompletePokedexData, buildPokemon, findPokemonByName, findPokemonByNumber, buildCard} from "/resources/js/utils.js";

function debugMain() {
    getCompletePokedexData.then((result) => {
        const ivysaur = buildPokemon(result[1]);

        let raichu = findPokemonByName("Raichu", result);
        raichu = buildPokemon(raichu);

        let charmander = findPokemonByName("Charmander", result);
        charmander = buildPokemon(charmander);



    })
}

document.addEventListener("DOMContentLoaded", debugMain);


