// PRINT STATEMENTS FOR DEBUGGING

import {getCompletePokedexData, buildPokemon, findPokemonByName, findPokemonByNumber, buildCard} from "./utils";

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

    let cellList = document.getElementsByClassName("col-4 themed-grid-col");

    let safetyCounter = 0;
    for (let cell of cellList) {
        let pokemon = buildPokemon(result[safetyCounter]);
        cell.appendChild(buildCard(pokemon));
        ++safetyCounter;
    }

})

