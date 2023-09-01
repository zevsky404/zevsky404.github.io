// MAIN FILE WHICH CALLS FUNCTIONS FOR EASE OF WORKFLOW
import {getCompletePokedexData, buildPokemon, buildCard, shortenText, getTextNodeWidth} from "./utils";

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

function filterPokemonByName() {
    let mainContainer = document.getElementById("main-page-container");
    let allCards = document.getElementsByClassName("card");
    let input = document.getElementById("search-pokemon");

    for (let card of allCards) {
        // takes entire title of card, converts it to lower case and splits it at the - to remove number
        const title = card.children[0].textContent
            .toLowerCase()
            .split("-")[1];
        let surroundingLink = card.parentElement;

        if (!title.includes(input.value.toLowerCase())) {
            surroundingLink.classList.add("hidden");
        } else if (surroundingLink.classList.contains("hidden")) {
            surroundingLink.classList.remove("hidden");
        }
    }
}

function zoomCards() {
    let slider = document.getElementById("card-zoom");
    let allCards = document.getElementsByClassName("card");

    for (let card of allCards) {
        card.style.width = `${slider.value}rem`;
        if (slider.value < 5){
            card.children[0].textContent = card.children[0].textContent.substring(0,4);
        } else if (!card.children[0].textContent.includes(card.classList[3])) {
            card.children[0].textContent += ` - ${card.classList[3]}`;
        }
    }
    
}

function clearInput(element) {
    element.target.value = "";
    let allCards = document.getElementsByClassName("card");
}

document.addEventListener("DOMContentLoaded", buildIndexStructure);
 let filterBox = document.getElementById("search-pokemon");
filterBox.addEventListener("input", filterPokemonByName)

 let slider = document.getElementById("card-zoom")
slider.addEventListener("input", zoomCards);
