import * as d3 from "d3"
import {buildCard, buildPokemon, buildHeatmapIcon, findPokemonByName, minMaxScaling} from "../resources/js/utils";

let getCompletePokedexData = d3.csv("../resources/data/pokemon.csv").then((response) => {
    return response;
});

const dimensions = {top: 20,
    right: 280,
    bottom: 20,
    left: 20,
    width: "100",
    height: 100};

function colourHeatmapBy(stat, interpolator, data) {
    const filterValues = data.map(entry => parseInt(entry[`${stat}`]));
    const colour = d3.scaleSequential()
        .interpolator(interpolator)
        .domain([d3.min(filterValues), d3.max(filterValues)]);

    let allCards = document.getElementsByClassName("card");

    for (let card of allCards) {
        const pokemonName = card.classList[1];
        let pokemon = findPokemonByName(pokemonName, data);
        pokemon = buildPokemon(pokemon);
        card.style.backgroundColor = colour(pokemon.stats[`${stat}`]);
    }

}

function colourHeatmapByWeaknessAgainst(type, data) {
    const colour = d3.scaleOrdinal()
        .range(["#ca0020","#ffffff","#bababa","#404040"])
        .domain(["2.0", "1", "0.5", "0.25"]);

    let allCards = document.getElementsByClassName("card");

    for (let card of allCards) {
        const pokemonName = card.classList[1];
        let pokemon = findPokemonByName(pokemonName, data);
        pokemon = buildPokemon(pokemon);
        card.style.backgroundColor = colour(pokemon.damageAgainst[`${type}`]);
    }
}

function colourHeatmapByWeight(data){
    const filterValues = minMaxScaling("weight_kg", 0, 300, data);
    const colour = d3.scaleSequential()
        .interpolator(d3.interpolateOranges)
        .domain([d3.min(filterValues), d3.max(filterValues)]);

    let allCards = document.getElementsByClassName("card");

    for (let card of allCards) {
        const pokemonName = card.classList[1];
        let pokemon = findPokemonByName(pokemonName, data);
        pokemon = buildPokemon(pokemon);
        card.style.backgroundColor = colour(pokemon.weight);
    }
}

function colourHeatmapByCatchRate(data){
    const filterValues = data.map(entry => parseInt(entry["capture_rate"]));
    const colour = d3.scaleSequential()
        .interpolator(d3.interpolatePuRd)
        .domain([d3.min(filterValues), d3.max(filterValues)]);

    let allCards = document.getElementsByClassName("card");

    for (let card of allCards) {
        const pokemonName = card.classList[1];
        let pokemon = findPokemonByName(pokemonName, data);
        pokemon = buildPokemon(pokemon);
        card.style.backgroundColor = colour(pokemon.captureRate);
    }
}

function filter(types, generations, legendary, data, explicit){
    
    if(explicit){
        explicitFilter(types, generations, legendary, data);
    }
    else{
        let allCards = document.getElementsByClassName("card");
        for (let card of allCards) {
            const pokemonName = card.classList[1];
            let pokemon = findPokemonByName(pokemonName, data);
            pokemon = buildPokemon(pokemon);

            if (types.length === 0 && generations.length === 0 && (legendary[2] || legendary.length === 0)){
                card.parentElement.style.display = "flex";
            }
            else if (types.length === 0 && generations.length === 0 && legendary[0] && pokemon.isLegendary){
                card.parentElement.style.display = "flex";
            }
            else if (types.length === 0 && generations.length === 0 && legendary[1] && !pokemon.isLegendary) {
                card.parentElement.style.display = "flex";
            }
            else if ((types.includes(pokemon.type1) || types.includes(pokemon.type2)) && generations.length === 0
                                                                                && (legendary[2] || legendary.length === 0)){
                card.parentElement.style.display = "flex";
            }
            else if ((types.includes(pokemon.type1) || types.includes(pokemon.type2)) && generations.length === 0
                                                                                && legendary[0] && pokemon.isLegendary){
                card.parentElement.style.display = "flex";
            }
            else if ((types.includes(pokemon.type1) || types.includes(pokemon.type2)) && generations.length === 0
                                                                                && legendary[1] && !pokemon.isLegendary){
                card.parentElement.style.display = "flex";
            }
            else if (generations.includes(pokemon.generation) && types.length === 0 && (legendary[2] || legendary.length === 0)){
                card.parentElement.style.display = "flex";
            }
            else if (generations.includes(pokemon.generation) && types.length === 0 && legendary[0] && pokemon.isLegendary){
                card.parentElement.style.display = "flex";
            }
            else if (generations.includes(pokemon.generation) && types.length === 0 && legendary[1] && !pokemon.isLegendary){
                card.parentElement.style.display = "flex";
            }
            else if (generations.includes(pokemon.generation) &&
                (types.includes(pokemon.type1) || types.includes(pokemon.type2)) && (legendary[2] || legendary.length === 0)){
                card.parentElement.style.display = "flex";
            }
            else if (generations.includes(pokemon.generation) &&
                (types.includes(pokemon.type1) || types.includes(pokemon.type2)) && legendary[0] && pokemon.isLegendary){
                card.parentElement.style.display = "flex";
            }
            else if (generations.includes(pokemon.generation) &&
                (types.includes(pokemon.type1) || types.includes(pokemon.type2)) && legendary[1] && !pokemon.isLegendary){
                card.parentElement.style.display = "flex";
            }
            else{
                card.parentElement.style.display = 'none';
            }
        }
    }
}

function explicitFilter(types, generations, legendary, data){
    let allCards = document.getElementsByClassName("card");
    
    for (let card of allCards) {
        const pokemonName = card.classList[1];
        let pokemon = findPokemonByName(pokemonName, data);
        pokemon = buildPokemon(pokemon);
        if (types.length === 0 && generations.length === 0 && (legendary[2] || legendary.length === 0)){
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 1 && types.includes(pokemon.type1) && (pokemon.type2 === "") && generations.length === 0 && (legendary[2] || legendary.length === 0)){
            card.parentElement.style.display = "flex";
        }
        else if (types.includes(pokemon.type1) && types.includes(pokemon.type2) && generations.length === 0 && (legendary[2] || legendary.length === 0)) {
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 0 && generations.includes(pokemon.generation) && (legendary[2] || legendary.length === 0)){
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 1 && types.includes(pokemon.type1) && (pokemon.type2 === "") && generations.includes(pokemon.generation) && (legendary[2] || legendary.length === 0)){
            card.parentElement.style.display = "flex";
        }
        else if (types.includes(pokemon.type1) && types.includes(pokemon.type2) && generations.includes(pokemon.generation) && (legendary[2] || legendary.length === 0)) {
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 0 && generations.length === 0 && legendary[0] && pokemon.isLegendary){
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 1 && types.includes(pokemon.type1) && (pokemon.type2 === "") && generations.length === 0 && legendary[0] && pokemon.isLegendary){
            card.parentElement.style.display = "flex";
        }
        else if (types.includes(pokemon.type1) && types.includes(pokemon.type2) && generations.length === 0 && legendary[0] && pokemon.isLegendary) {
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 0 && generations.includes(pokemon.generation) && legendary[0] && pokemon.isLegendary){
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 1 && types.includes(pokemon.type1) && (pokemon.type2 === "") && generations.includes(pokemon.generation) && legendary[0] && pokemon.isLegendary){
            card.parentElement.style.display = "flex";
        }
        else if (types.includes(pokemon.type1) && types.includes(pokemon.type2) && generations.includes(pokemon.generation) && legendary[0] && pokemon.isLegendary) {
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 0 && generations.length === 0 && legendary[1] && !pokemon.isLegendary){
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 1 && types.includes(pokemon.type1) && (pokemon.type2 === "") && generations.length === 0 && legendary[1] && !pokemon.isLegendary){
            card.parentElement.style.display = "flex";
        }
        else if (types.includes(pokemon.type1) && types.includes(pokemon.type2) && generations.length === 0 && legendary[1] && !pokemon.isLegendary) {
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 0 && generations.includes(pokemon.generation) && legendary[1] && !pokemon.isLegendary){
            card.parentElement.style.display = "flex";
        }
        else if (types.length === 1 && types.includes(pokemon.type1) && (pokemon.type2 === "") && generations.includes(pokemon.generation) && legendary[1] && !pokemon.isLegendary){
            card.parentElement.style.display = "flex";
        }
        else if (types.includes(pokemon.type1) && types.includes(pokemon.type2) && generations.includes(pokemon.generation) && legendary[1] && !pokemon.isLegendary) {
            card.parentElement.style.display = "flex";
        }
        else {
            card.parentElement.style.display = "none";
        }
    }
}

function toggleTypeFiltering(explicit) {
    let checkbox = document.getElementById("type-toggle-checkbox");
    let typeListing1 = document.getElementById("type-listing");
    /*let typeListing2;
    let parent = document.getElementById("type-collapse");*/

    if (checkbox.checked) {
        /*parent.classList.add("custom-flex");
        typeListing2 = document.createElement("div");
        typeListing2.classList.add("btn-toggle-nav");
        typeListing2.classList.add("list-unstyled");
        typeListing2.classList.add("fw-normal");
        typeListing2.classList.add("pb-1");
        typeListing2.classList.add("small");
        typeListing2.id = "type-listing-2";
        typeListing2.innerHTML = "<div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"normal2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"normal-checkbox\">Normal</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"fire2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"fire-checkbox\">Fire</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"water2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"water-checkbox\">Water</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"grass2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"grass-checkbox\">Grass</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"flying2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"flying-checkbox\">Flying</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"fighting2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"fighting-checkbox\">Fighting</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"poison2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"poison-checkbox\">Poison</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"electric2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"electric-checkbox\">Electric</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"ground2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"ground-checkbox\">Ground</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"rock2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"rock-checkbox\">Rock</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"psychic2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"psychic-checkbox\">Psychic</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"ice2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"ice-checkbox\">Ice</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"bug2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"bug-checkbox\">Bug</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"ghost2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"ghost-checkbox\">Ghost</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"steel2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"steel-checkbox\">Steel</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"dragon2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"dragon-checkbox\">Dragon</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"dark2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"dark-checkbox\">Dark</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"form-check\">\n" +
            "                        <input class=\"form-check-input\" type=\"checkbox\" id=\"fairy2-checkbox\" name=\"type2-selector\">\n" +
            "                        <label for=\"fairy-checkbox\">Fairy</label>\n" +
            "                    </div>"

        parent.appendChild(typeListing2);*/
        return explicit = true;
    }
    else /*if (parent.children[1])*/ {
        /*parent.children[1].remove();
        parent.classList.remove("custom-flex");*/
        return explicit = false;
    }
}

function createContentForLegend(option) {
    let container = document.getElementById("legend-wrapper");

    switch (option) {
        case "weakness":
            let multipliers = ["2.0", "1.0", "0.5", "0.25"];
            let colours = ["#ca0020","#ffffff","#bababa","#404040"];


            for (let i = 0; i < multipliers.length; ++i) {
                let legendBullet = document.createElement("div");
                legendBullet.classList.add("legend-bullet");

                let bulletIcon = document.createElement("div");
                bulletIcon.classList.add("bulletIcon")
                bulletIcon.style.backgroundColor = colours[i];

                let bulletText = document.createElement("div");
                bulletText.innerText = multipliers[i];

                legendBullet.appendChild(bulletIcon);
                legendBullet.appendChild(bulletText);

                container.appendChild(legendBullet);
            }
    }
}

function scaleElementsBySpace() {
    const visibleElements = document.querySelectorAll(".heatmap-icon-container[style='display: flex;']");
    let newSize;
    const size = (1 / visibleElements.length) * 1700;
    if (visibleElements.length === 801) {
        newSize = 2.1;
    } else if (size > 4 && visibleElements.length > 50) {
        newSize = 4;
    } else if (visibleElements.length <= 50){
        newSize = 8;
    } else {
        newSize = size;
    }


    for (let element of visibleElements) {
        element.children[0].style.width = `${newSize}rem`;
        element.children[0].style.height = `${newSize}rem`;
    }

}

getCompletePokedexData.then(function (data) {
    let tooltip = d3.select("#pokemon-heatmap")
        .append("div")
        .style("display", "none")
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "3px")
        .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event,d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    const mousemove = function(event, d) {
        tooltip
            .html("The exact value of<br>this cell is: " + event)
            .style("left", (event.x)/2 + "px")
            .style("top", (event.y)/2 + "px")
            .style("position", "relative");
        d3.select(this)
    }
    const mouseleave = function(event,d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }
    const serialiser = new XMLSerializer();

    for (let entry of data) {
        const pokemon = buildPokemon(entry);
        const card = buildHeatmapIcon(pokemon);
        const main = d3.select("#pokemon-heatmap");
        let div = main.append('div')
            .attr("class", "heatmap-icon-container")
            .style("display", "flex")
            .html(serialiser.serializeToString(card))
            //.on("mouseover", mouseover)
            //.on("mousemove", mousemove)
            //.on("mouseleave", mouseleave);
    }


    let typeCheckboxes = document.querySelectorAll("input[type=checkbox][name=type-selector]");
    let genCheckboxes =  document.querySelectorAll("input[type=checkbox][name=generation-selector]");
    let legendRadio = document.querySelectorAll("input[type=radio][name=legendary-selector]");
    //let type2Checkboxes = document.querySelectorAll("input[type=checkbox][name=type2-selector]");

    let selectedTypes = [];
    let selectedTypes2 = [];
    let selectedGens = [];
    let legendary = [];
    let explicit = false;

    typeCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change",  () => {
            selectedTypes = Array.from(typeCheckboxes)
                .filter(element => element.checked)
                .map(element => element.nextElementSibling.innerText.toLowerCase());
            filter(selectedTypes, selectedGens, legendary, data, explicit);
            scaleElementsBySpace();
        });
    });

    legendRadio.forEach((radio) => {
        radio.addEventListener("change", () => {
            legendary = [legendRadio[0].checked, legendRadio[1].checked, legendRadio[2].checked];
            filter(selectedTypes, selectedGens, legendary, data, explicit);
            scaleElementsBySpace();
        });
    });

    genCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            selectedGens = Array.from(genCheckboxes)
                .filter(element => element.checked)
                .map(element => element.nextElementSibling.innerText.toLowerCase().match(/(\d+)/)[0]);
            filter(selectedTypes, selectedGens, legendary, data, explicit);
            scaleElementsBySpace();
        });
    });

    /*type2Checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            selectedTypes2 = Array.from(type2Checkboxes)
                .filter(element => element.checked)
                .map(element => element.nextElementSibling.innerText.toLowerCase());
            filter(selectedTypes, selectedGens, legendary, data, explicit);
            scaleElementsBySpace();
        });
    });*/

    let hpFilter = document.getElementById("hp-filter");
    let attackFilter = document.getElementById("attack-filter");
    let defenseFilter = document.getElementById("defense-filter");
    let spAttackFilter = document.getElementById("special-attack-filter");
    let spDefenseFilter = document.getElementById("special-defense-filter");
    let speedFilter = document.getElementById("speed-filter");
    let baseStatFilter = document.getElementById("base-stat-filter");

    hpFilter.addEventListener("click", () => colourHeatmapBy("hp", d3.interpolateYlGn, data));
    attackFilter.addEventListener("click", () => colourHeatmapBy("attack", d3.interpolateOrRd, data));
    defenseFilter.addEventListener("click", () => colourHeatmapBy("defense", d3.interpolateGnBu, data));
    spAttackFilter.addEventListener("click", () => colourHeatmapBy("sp_attack", d3.interpolateYlOrRd, data));
    spDefenseFilter.addEventListener("click", () => colourHeatmapBy("sp_defense", d3.interpolateBuPu, data));
    speedFilter.addEventListener("click", () => colourHeatmapBy("speed", d3.interpolateGreys, data));
    baseStatFilter.addEventListener("click", () => colourHeatmapBy("base_total", d3.interpolateYlOrBr, data));

    let normalWeakness = document.getElementById("normal-weakness");
    let fireWeakness = document.getElementById("fire-weakness");
    let waterWeakness = document.getElementById("water-weakness");
    let grassWeakness = document.getElementById("grass-weakness");
    let flyingWeakness = document.getElementById("flying-weakness");
    let fightingWeakness = document.getElementById("fighting-weakness");
    let poisonWeakness = document.getElementById("poison-weakness");
    let electricWeakness = document.getElementById("electric-weakness");
    let groundWeakness = document.getElementById("ground-weakness");
    let rockWeakness = document.getElementById("rock-weakness");
    let psychicWeakness = document.getElementById("psychic-weakness");
    let iceWeakness = document.getElementById("ice-weakness");
    let bugWeakness = document.getElementById("bug-weakness");
    let ghostWeakness = document.getElementById("ghost-weakness");
    let steelWeakness = document.getElementById("steel-weakness");
    let dragonWeakness = document.getElementById("dragon-weakness");
    let darkWeakness = document.getElementById("dark-weakness");
    let fairyWeakness = document.getElementById("fairy-weakness");

    normalWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("normal", data));
    normalWeakness.addEventListener("click", () => createContentForLegend("weakness"));
    fireWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("fire", data));
    waterWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("water", data));
    grassWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("grass", data));
    flyingWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("flying", data));
    fightingWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("fight", data));
    poisonWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("poison", data));
    electricWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("electric", data));
    groundWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("ground", data));
    rockWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("rock", data));
    psychicWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("psychic", data));
    iceWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("ice", data));
    bugWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("bug", data));
    ghostWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("ghost", data));
    steelWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("steel", data));
    dragonWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("dragon", data));
    darkWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("dark", data));
    fairyWeakness.addEventListener("click", () => colourHeatmapByWeaknessAgainst("fairy", data));

    let weight = document.getElementById("weight");
    weight.addEventListener("click", () => colourHeatmapByWeight(data));
    weight.addEventListener("click", scaleElementsBySpace);

    let catchRate = document.getElementById("catch-rate");
    catchRate.addEventListener("click", () => colourHeatmapByCatchRate(data));

    let typeToggle = document.getElementById("type-toggle-checkbox");
    typeToggle.addEventListener("change", () => {
        explicit = toggleTypeFiltering(explicit);
        selectedTypes = Array.from(typeCheckboxes)
                .filter(element => element.checked)
                .map(element => element.nextElementSibling.innerText.toLowerCase());
            filter(selectedTypes, selectedGens, legendary, data, explicit);
            scaleElementsBySpace();
    });
});


