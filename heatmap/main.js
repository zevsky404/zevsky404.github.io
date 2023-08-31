import * as d3 from "d3"
import {buildCard, buildPokemon, buildHeatmapIcon, findPokemonByName} from "../resources/js/utils";
import {color} from "d3";

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
        card.classList.add(pokemon.name);
        const main = d3.select("#pokemon-heatmap");
        let div = main.append('div')
            .html(serialiser.serializeToString(card));
            // mouse events go here
    }

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


});


