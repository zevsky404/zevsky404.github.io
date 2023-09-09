import * as d3 from "d3"
import {buildPokemon, findPokemonByName, getCompletePokedexData} from "../resources/js/utils";

export function buildOverview(pokemonName) {
    getCompletePokedexData.then((data) => {
        const pokemonFromData = findPokemonByName(pokemonName, data);
        const pokemon = buildPokemon(pokemonFromData);
        const mainBody = document.getElementById("overview");

        let leftView = document.createElement("div");
        let rightView = document.createElement("div");
        leftView.classList.add("left-view");
        rightView.classList.add("right-view");
        mainBody.appendChild(leftView);
        mainBody.appendChild(rightView);

        let pokemonImage = document.createElement("img");
        pokemonImage.src = pokemon.image;
        leftView.appendChild(pokemonImage);

        let shortDescription = document.createElement("div");
        shortDescription.classList.add("pokemon-short-description");
        let pokemonTitle = document.createElement("span");
        pokemonTitle.classList.add("pokemon-title");
        pokemonTitle.innerText = `#${pokemon.number} - ${pokemon.name}`;
        let pokemonClassification = document.createElement("span");
        pokemonClassification.classList.add("pokemon-classification");
        pokemonClassification.innerText = `${pokemon.classification}`;
        shortDescription.appendChild(pokemonTitle);
        shortDescription.appendChild(pokemonClassification);
        leftView.appendChild(shortDescription);

        let iconHolder = document.createElement("div");
        iconHolder.classList.add("type-icon-holder");
        let typeOneIcon = document.createElement("div");
        typeOneIcon.classList.add("icon");
        typeOneIcon.classList.add(pokemon.type1);
        let typeOneSvg = document.createElement("img");
        typeOneSvg.src = `/resources/images/icons/${pokemon.type1}.svg`;
        typeOneIcon.appendChild(typeOneSvg);
        iconHolder.appendChild(typeOneIcon);
        leftView.appendChild(iconHolder);

        if (pokemon.type2) {
            let typeTwoIcon = document.createElement("div");
            typeTwoIcon.classList.add("icon");
            typeTwoIcon.classList.add(pokemon.type2);
            let typeTwoSvg = document.createElement("img");
            typeTwoSvg.src = `/resources/images/icons/${pokemon.type2}.svg`;
            typeTwoIcon.appendChild(typeTwoSvg);
            iconHolder.appendChild(typeTwoIcon);
        }

        let statsDiagram = document.createElement("div");
        statsDiagram.classList.add("stats-diagram");
        statsDiagram.id = "diagram";
        rightView.appendChild(statsDiagram);

        let generalInfo = document.createElement("div");
        generalInfo.classList.add("general-information");

        let spanGen = document.createElement("span");
        spanGen.className = "gen-info-span";
        spanGen.innerText = `From Generation ${pokemon.generation}`;

        let spanWeight = document.createElement("span");
        spanWeight.className = "gen-info-span";
        spanWeight.innerText = `Weight in kg: ${pokemon.weight}`;

        let spanHeight = document.createElement("span");
        spanHeight.className = "gen-info-span";
        spanHeight.innerText = `Height in m: ${pokemon.height}`;

        let spanAbilities = document.createElement("span");
        spanAbilities.className = "gen-info-span";
        let abilitiesArray = pokemon.abilities.split(",");
        let abilitiesString = "";
        for (let ability of abilitiesArray) {
            ability = ability.replace(/[^a-zA-Z0-9 ]/g, '');
            ability = ability.trim();
            abilitiesString += `${ability}, `;
        }
        spanAbilities.innerText = `Possible Passive Abilities: ${abilitiesString.slice(0, -2)}`;

        let weaknessSpan = document.createElement("span");
        weaknessSpan.className = "gen-info-span";
        let weaknessList = "";
        for (let [type, multiplier] of Object.entries(pokemon.damageAgainst)) {
            if (multiplier == 2.0) {
                weaknessList += `${type}, `;
            }
        }
        weaknessSpan.innerText = `Is especially weak against: ${weaknessList.slice(0,-2)}`;

        let resistanceSpan = document.createElement("span");
        resistanceSpan.className = "gen-info-span";
        let resistanceList = "";
        for (let [type, multiplier] of Object.entries(pokemon.damageAgainst)) {
            if (multiplier == 0.5 || multiplier == 0.25) {
                resistanceList += `${type}, `;
            }
        }
        resistanceSpan.innerText = `Is especially resistant against: ${resistanceList.slice(0,-2)}`;

        generalInfo.appendChild(spanGen);
        generalInfo.appendChild(spanWeight);
        generalInfo.appendChild(spanHeight);
        generalInfo.appendChild(spanAbilities);
        generalInfo.appendChild(weaknessSpan);
        generalInfo.appendChild(resistanceSpan);

        rightView.appendChild(generalInfo);
        mainBody.appendChild(rightView);


    });
}