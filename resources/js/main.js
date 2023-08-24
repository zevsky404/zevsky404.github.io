// MAIN FILE WHICH CALLS FUNCTIONS FOR EASE OF WORKFLOW
import {getCompletePokedexData, buildPokemon, findPokemonByName, findPokemonByNumber, buildCard} from "./utils";
import data from "bootstrap/js/src/dom/data";

function buildIndexStructure() {
    getCompletePokedexData.then((data) => {
        let mainContainer = document.getElementById("main-page-container");

        for (const line of data) {
            let hyperlink = document.createElement("a");
            hyperlink.href = `/overview/`;

            let pokemon = buildPokemon(line);
            let newCard = buildCard(pokemon);
            hyperlink.appendChild(newCard);
            mainContainer.appendChild(hyperlink);
        }
    })
}

function filterPokemon(element) {
    let mainContainer = document.getElementById("main-page-container");
    let allCards = document.getElementsByClassName("card");
    let input = element.target.value;

    for (let card of allCards) {
        const title = card.children[0].textContent;

        if(!input.toString().includes(title)) {
            card.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", buildIndexStructure);
 let filterBox = document.getElementById("search-pokemon");
