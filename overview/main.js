import * as d3 from "d3"
import {buildPokemon, findPokemonByName, getCompletePokedexData} from "../resources/js/utils";

export function buildOverview(pokemonName) {
    getCompletePokedexData.then((data) => {
        const eggMax = Math.max(...data.map(entry => parseFloat(entry["base_egg_steps"])).filter(entry => !isNaN(entry)));
        const catchMax = Math.max(...data.map(entry => parseFloat(entry["capture_rate"])).filter(entry => !isNaN(entry)));
        const growthMax = Math.max(...data.map(entry => parseFloat(entry["experience_growth"])).filter(entry => !isNaN(entry)));
        const heightMax = Math.max(...(data.map(entry => parseFloat(entry["height_m"])).filter(entry => !isNaN(entry))));
        const weightMax = Math.max(...data.map(entry => parseFloat(entry["weight_kg"])).filter(entry => !isNaN(entry)));


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

        let card = document.createElement("div");
        card.className = "card";
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

        let generalInfoHeading = document.createElement("h4");
        generalInfoHeading.className = "gen-info-heading";
        generalInfoHeading.innerText = "General Information";

        let spanGen = document.createElement("span");
        spanGen.className = "gen-info-span";
        spanGen.innerText = `From Generation ${pokemon.generation}`;

        let spanWeight = document.createElement("span");
        spanWeight.className = "gen-info-span";
        spanWeight.innerText = `Weight: ${pokemon.weight}kg`;

        let spanHeight = document.createElement("span");
        spanHeight.className = "gen-info-span";
        spanHeight.innerText = `Height: ${pokemon.height}m`;

        let heightBorder = document.createElement("div");
        heightBorder.className = "gen-info-border";
        
        let weightBorder =document.createElement("div");
        weightBorder.className = "gen-info-border";

        let heightBar = document.createElement("div");
        heightBar.className = "gen-info-bar";
        heightBar.style.width = `${pokemon.height / heightMax * 100}%`;

        let weightBar = document.createElement("div");
        weightBar.className = "gen-info-bar";
        weightBar.style.width = `${pokemon.weight / weightMax * 100}%`;

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

        let levelBreed = document.createElement("div");
        levelBreed.className = "leveling-breeding-information";

        let levelBreedHeading = document.createElement("h4");
        levelBreedHeading.className = "leveling-breeding-heading";
        levelBreedHeading.innerText = "Leveling and Breeding Information";

        let expGrowth = document.createElement("span");
        expGrowth.className = "lvl-exp-info";
        expGrowth.innerText = `Needs ${pokemon.experienceGrowth} experience points to get to level 100.`;

        let catchRate = document.createElement("span");
        catchRate.className = "lvl-exp-info";
        catchRate.innerText = `Capturing Rate specific for this species: ${pokemon.captureRate}`;

        let eggSteps = document.createElement("span");
        eggSteps.className = "lvl-exp-info";
        eggSteps.innerText = `Steps needed to hatch egg: ${pokemon.baseEggSteps}`;

        let growthBorder = document.createElement("div");
        growthBorder.className = "lvl-exp-border";

        let catchBorder = document.createElement("div");
        catchBorder.className = "lvl-exp-border";

        let eggBorder = document.createElement("div");
        eggBorder.className = "lvl-exp-border";

        let growthBar = document.createElement("div");
        growthBar.className = "lvl-exp-bar";
        growthBar.style.width = `${pokemon.experienceGrowth / growthMax * 100}%`;

        let catchBar = document.createElement("div");
        catchBar.className = "lvl-exp-bar";
        catchBar.style.width = `${pokemon.captureRate / catchMax * 100}%`;

        let eggBar = document.createElement("div");
        eggBar.className = "lvl-exp-bar";
        eggBar.style.width = `${pokemon.baseEggSteps / eggMax * 100}%`;

        weightBorder.appendChild(weightBar);
        heightBorder.appendChild(heightBar);

        growthBorder.appendChild(growthBar);
        catchBorder.appendChild(catchBar);
        eggBorder.appendChild(eggBar);
        
        levelBreed.appendChild(levelBreedHeading);
        levelBreed.appendChild(expGrowth);
        levelBreed.appendChild(growthBorder);
        levelBreed.appendChild(catchRate);
        levelBreed.appendChild(catchBorder);
        levelBreed.appendChild(eggSteps);
        levelBreed.appendChild(eggBorder);

        generalInfo.appendChild(generalInfoHeading);
        generalInfo.appendChild(spanGen);
        generalInfo.appendChild(spanWeight);
        generalInfo.appendChild(weightBorder);
        generalInfo.appendChild(spanHeight);
        generalInfo.appendChild(heightBorder);
        generalInfo.appendChild(spanAbilities);
        generalInfo.appendChild(weaknessSpan);
        generalInfo.appendChild(resistanceSpan);

        let infoDiv = document.createElement("div");
        infoDiv.className = "full-description text-wrap";
        infoDiv.appendChild(generalInfo);
        infoDiv.appendChild(levelBreed);

        rightView.appendChild(infoDiv);
        mainBody.appendChild(rightView);

        buildStatDiagram(pokemon.name);

    });
}

function buildStatDiagram(pokemonName) {
    getCompletePokedexData.then((data) => {
        const margin = {top: 10, right: 30, bottom: 40, left: 100}
        const width = 600 - margin.left - margin.right
        const height = 500 - margin.top - margin.bottom;

        let pokemon = findPokemonByName(pokemonName, data);
        pokemon = buildPokemon(pokemon);

        let pokemonStatData = [{key: "Health Points", value: pokemon.stats.hp}, {key: "Attack", value: pokemon.stats.attack},
            {key: "Special Attack", value: pokemon.stats.sp_attack},
            {key: "Defense", value: pokemon.stats.defense}, {key: "Special Defense", value: pokemon.stats.sp_defense}, {key: "Speed", value: pokemon.stats.speed}]

        let svg = d3.select("#diagram")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        let xAxis = d3.scaleLinear()
            .domain([0, 300])
            .range([0, width]);

        let yAxis = d3.scaleBand()
            .range([0, height])
            .domain(["Health Points", "Attack", "Special Attack", "Defense", "Special Defense", "Speed"])
            .padding(1);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xAxis))
            .selectAll("text")
            .attr("transform", "translate(-10,0) rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .call(d3.axisLeft(yAxis));

        svg.selectAll("dataLine")
            .data(pokemonStatData)
            .enter()
            .append("line")
            .attr("x1", (d) => {return xAxis(d.value)})
            .attr("x2", xAxis(0))
            .attr("y1", (d) => {return yAxis(d.key)})
            .attr("y2", (d) => {return yAxis(d.key)})
            .attr("stroke", "black");

        svg.selectAll("endLineCircle")
            .data(pokemonStatData)
            .enter()
            .append("circle")
            .attr("cx", (d) => {return xAxis(d.value)})
            .attr("cy", (d) => {return yAxis(d.key)})
            .attr("r", 3)
            .attr("fill", "none")
            .attr("stroke", "black")

        console.log(yAxis("Health Points"));

    });
}