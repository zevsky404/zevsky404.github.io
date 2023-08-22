// UTILITY FUNCTIONS USEFUL FOR THE ENTIRE PROJECT
import * as d3 from "d3"

let getCompletePokedexData = d3.csv("../data/pokemon.csv").then((response) => {
    return response;
});
