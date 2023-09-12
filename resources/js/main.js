// MAIN FILE WHICH CALLS FUNCTIONS FOR EASE OF WORKFLOW
import {getCompletePokedexData, buildPokemon, buildCard} from "./utils";

function buildIndexStructure() {
    getCompletePokedexData.then((data) => {
        let mainContainer = document.getElementById("main-page-container");

        for (const line of data) {
            let hyperlink = document.createElement("a");

            let pokemon = buildPokemon(line);
            let newCard = buildCard(pokemon);
            hyperlink.href = `/overview/?pokemon=${pokemon.name}`;
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
            //.split("-")[1];
        console.log(card.classList[3].toLowerCase())
        let surroundingLink = card.parentElement;

        if (!((title.includes(input.value.toLowerCase())) || (card.classList[3].toLowerCase().includes(input.value.toLowerCase())))) {
            surroundingLink.classList.add("hidden");
        }
        else if (surroundingLink.classList.contains("hidden")) {
            surroundingLink.classList.remove("hidden");
        }
    }
}

function zoomCards() {
    let slider = document.getElementById("card-zoom");
    let allCards = document.getElementsByClassName("card");

    for (let card of allCards) {
        const cardTitle = card.children[0];
        const cardImage = card.children[1];
        const cardBody = card.children[2];
        const types = cardBody.children;

        card.style.width = `${slider.value}rem`;
        if (slider.value < 6){
            card.children[0].textContent = card.children[0].textContent.substring(0,4);
        } else if (!card.children[0].textContent.includes(card.classList[3])) {
            card.children[0].textContent += ` - ${card.classList[3]}`;
        }

        if (slider.value <= 4.5) {
            const type1Colour = getComputedStyle(types[0].children[1]).backgroundColor;
            let rgbValues1 = type1Colour.split(",");
            rgbValues1[0] = rgbValues1[0].substring(4);
            rgbValues1[2] = rgbValues1[2].slice(0,-1);

            if (types[1]) {
                const type2Colour = getComputedStyle(types[1].children[1]).backgroundColor;
                let rgbValues2 = type2Colour.split(",");
                rgbValues2[0] = rgbValues2[0].substring(4);
                rgbValues2[2] = rgbValues2[2].slice(0,-1);
                cardTitle.style.backgroundColor = `rgba(${rgbValues2[0]}, ${rgbValues2[1]}, ${rgbValues2[2]}, 0.58)`;
            }
            cardImage.style.backgroundColor = `rgba(${rgbValues1[0]}, ${rgbValues1[1]}, ${rgbValues1[2]}, 0.58)`;
            cardBody.style.display = "none";
        } else {
            cardTitle.style.backgroundColor = "transparent";
            cardImage.style.backgroundColor = "transparent";
            if (cardBody.style.display === "none"){
                cardBody.style.display = "flex";
            }
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
