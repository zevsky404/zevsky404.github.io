// UTILITY FUNCTIONS USEFUL FOR THE ENTIRE PROJECT
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {Pokemon, BaseStats} from "/resources/js/objects.js";

export let getCompletePokedexData = d3.csv("/resources/data/pokemon.csv").then((response) => {
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
    let pokemon = new Pokemon(datasetInfo.name);
    pokemon.image = getPokemonImagePath(datasetInfo.name);
    pokemon.number = datasetInfo.pokedex_number;
    pokemon.type1 = datasetInfo.type1;
    pokemon.type2 = datasetInfo.type2;
    if (datasetInfo.type1 === datasetInfo.type2) {
        pokemon.type2 = "";
    }
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

    pokemon.stats = new BaseStats(datasetInfo.base_total,
        datasetInfo.hp,
        datasetInfo.attack,
        datasetInfo.defense,
        datasetInfo.sp_attack,
        datasetInfo.sp_defense,
        datasetInfo.speed);

    pokemon.generation = datasetInfo.generation;
    pokemon.isLegendary = datasetInfo.is_legendary === "1";

    return pokemon;
}

export function buildCard(pokemon) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("text-nowrap");
    cardDiv.classList.add("custom-card");
    cardDiv.classList.add(pokemon.name);
    cardDiv.style.width = "18rem";

    let cardTitle = document.createElement("div");
    cardTitle.className = "card-header";
    if (pokemon.number < 10){
        cardTitle.innerText = `#00${pokemon.number} - ${pokemon.name}`;
    }
    else if (pokemon.number < 100){
        cardTitle.innerText = `#0${pokemon.number} - ${pokemon.name}`;
    }
    else{
        cardTitle.innerText = `#${pokemon.number} - ${pokemon.name}`;
    }
    


    let image = document.createElement("img");
    image.className = "card-img-top";
    image.src = pokemon.image;

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.style.display = "flex";
    cardBody.style.justifyContent = "center";

    let tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    let tooltipText = document.createElement("span");
    tooltipText.className = "tooltip-text";
    tooltipText.innerText = pokemon.type1;

    let iconHolderType1 = document.createElement("div");
    iconHolderType1.className = `icon ${pokemon.type1}`;

    let iconImageType1 = document.createElement("img");
    iconImageType1.src = `/resources/images/icons/${pokemon.type1}.svg`

    tooltip.appendChild(tooltipText);
    tooltip.appendChild(iconHolderType1);
    iconHolderType1.appendChild(iconImageType1);
    cardBody.appendChild(tooltip);
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBody);

    if (pokemon.type2) {
        let tooltip = document.createElement("div");
        tooltip.className = "custom-tooltip";
        let tooltipText = document.createElement("span");
        tooltipText.className = "tooltip-text";
        tooltipText.innerText = pokemon.type2;

        let iconHolderType2 = document.createElement("div");
        iconHolderType2.className = `icon ${pokemon.type2}`;

        let iconImageType2 = document.createElement("img");
        iconImageType2.src = `/resources/images/icons/${pokemon.type2}.svg`

        tooltip.appendChild(tooltipText);
        tooltip.appendChild(iconHolderType2);
        iconHolderType2.appendChild(iconImageType2);
        cardBody.appendChild(tooltip);
    }

    return cardDiv;
}

export function buildHeatmapIcon(pokemon) {
    let cardDiv = document.createElement("div");
    let surroundingLink = document.createElement("a");
    surroundingLink.href = `/overview/?pokemon=${pokemon.name}`;
    cardDiv.classList.add("card");
    cardDiv.classList.add(pokemon.name);
    cardDiv.style.width = "2.1rem";

    let image = document.createElement("img");
    image.className = "card-img-top";
    image.src = pokemon.image;

    surroundingLink.appendChild(cardDiv);
    cardDiv.appendChild(image);
    return surroundingLink;

}

export function minMaxScaling(column, newMin, newMax, data) {
    let scaleValues = data.map(entry => parseFloat(entry[`${column}`]));
    scaleValues = scaleValues.filter(entry => !isNaN(entry));
    const minValue = Math.min(...scaleValues);
    const maxValue = Math.max(...scaleValues);
    let scaledValues = [];

    for (let value of scaleValues) {
        let newValue = ((value - minValue) / (maxValue - minValue) * (newMax - newMin)) + newMin;
        scaledValues.push(newValue);
    }
    return scaledValues;
}
