import * as d3 from "d3"
import {buildPokemon, findPokemonByName, getCompletePokedexData} from "../resources/js/utils";

export function buildOverview(pokemonName) {
    getCompletePokedexData.then((data) => {
        const pokemonFromData = findPokemonByName(pokemonName, data);
        const pokemon = buildPokemon(pokemonFromData);


    });
}