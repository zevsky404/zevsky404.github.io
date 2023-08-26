// PRINT STATEMENTS FOR DEBUGGING
import {getCompletePokedexData, buildPokemon, findPokemonByName, findPokemonByNumber, buildCard} from "./utils";
function debugMain() {
    getCompletePokedexData.then((result) => {
        console.log(result[1]);
        const ivysaur = buildPokemon(result[1]);
        console.log(ivysaur);

        let raichu = findPokemonByName("Raichu", result);
        console.log(raichu)
        raichu = buildPokemon(raichu);
        console.log(raichu)

        let charmander = findPokemonByName("Charmander", result);
        charmander = buildPokemon(charmander);
        console.log(charmander)


    })
}

document.addEventListener("DOMContentLoaded", debugMain);


