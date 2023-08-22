// UTILITY FUNCTIONS USEFUL FOR THE ENTIRE PROJECT
import * as d3 from "d3"
import {Pokemon, BaseStats} from "./objects";

export let getCompletePokedexData = d3.csv("resources/data/pokemon.csv").then((response) => {
    return response;
});

export function getPokemonImagePath(pokeName) {
    return `/resources/data/pokemon-images/${pokeName.toLowerCase()}.png`
}

export function findPokemonByName(pokeName, data) {
    return data.find(pokemon => pokemon.name === pokeName);
}

export function findPokemonByNumber(pokedexNumber, data) {
    return data.find(pokemon => pokemon.pokedex_number === pokedexNumber);
}

export function buildPokemon(datasetInfo) {
    let pokemon = new Pokemon(datasetInfo.name)
    pokemon.image = getPokemonImagePath(datasetInfo.name);
    pokemon.number = datasetInfo.pokedex_number;
    pokemon.type1 = datasetInfo.type1;
    pokemon.type2 = datasetInfo.type2;
    pokemon.classification = datasetInfo.classfication;
    pokemon.height = datasetInfo.height_m;
    pokemon.weight = datasetInfo.weight_kg;
    pokemon.captureRate = datasetInfo.capture_rate;
    pokemon.baseEggSteps = datasetInfo.base_egg_steps;
    pokemon.abilities = datasetInfo.abilities;
    pokemon.experienceGrowth = datasetInfo.experience_growth;
    pokemon.damageAgainst =
            { "bug" : datasetInfo.against_bug,
            "dark" : datasetInfo.against_dark,
            "dragon" : datasetInfo.against_dragon,
            "electric" : datasetInfo.against_electric,
            "fairy" : datasetInfo.against_fairy,
            "fight" : datasetInfo.against_fight,
            "fire" : datasetInfo.against_fire,
            "flying" : datasetInfo.against_flying,
            "ghost" : datasetInfo.against_ghost,
            "grass" : datasetInfo.against_grass,
            "ground" : datasetInfo.against_ground,
            "ice" : datasetInfo.against_ice,
            "normal" : datasetInfo.against_normal,
            "poison" : datasetInfo.against_poison,
            "psychic" : datasetInfo.against_psychic,
            "rock" : datasetInfo.against_rock,
            "steel" : datasetInfo.against_steel,
            "water" : datasetInfo.against_water
            };
    pokemon.baseStatsTotal = datasetInfo.base_total;
    pokemon.stats = new BaseStats(datasetInfo.hp, datasetInfo.attack, datasetInfo.defense, datasetInfo.sp_attack, datasetInfo.sp_defense, datasetInfo.speed);
    pokemon.generation = datasetInfo.generation;
    pokemon.isLegendary = !Boolean(datasetInfo.is_legendary);


    return pokemon;
}