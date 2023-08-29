import * as d3 from "d3"
import {buildCard, buildPokemon, buildHeatmapIcon} from "../resources/js/utils";

let getCompletePokedexData = d3.csv("../resources/data/pokemon.csv").then((response) => {
    return response;
});

const dimensions = {top: 20,
    right: 280,
    bottom: 20,
    left: 20,
    width: "100",
    height: 100};

getCompletePokedexData.then(function (data) {
    const totalBaseStatValues = data.map(entry => parseInt(entry.base_total));
    const hpValues = data.map(entry => parseInt(entry.hp));
    const attackValues = data.map(entry => parseInt(entry.attack));
    const defenseValues = data.map(entry => parseInt(entry.defense));
    const spAttackValues = data.map(entry => parseInt(entry.sp_attack));
    const spDefenseValues = data.map(entry => parseInt(entry.sp_defense));
    const speedValues = data.map(entry => parseInt(entry.speed));

    const serialiser = new XMLSerializer();

    const colour = d3.scaleSequential()
        .interpolator(d3.interpolateOranges)
        .domain([d3.min(hpValues), d3.max(hpValues)])

    for (let entry of data) {
        const pokemon = buildPokemon(entry);
        const card = buildHeatmapIcon(pokemon)
        const main = d3.select("#pokemon-heatmap")
        let div = main.append('div')
            .html(serialiser.serializeToString(card))
            .style("background-color", colour(pokemon.stats.hp));


    }


});


