async function getData() {
  const response = await fetch("/dino.json");
  const { Dinos } = await response.json();
  return Dinos;
}

// Create Dino Constructor
class Dino {
  constructor({ species, weight, height, diet, where, when, fact }) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

// Create Dino Objects
const dinoObjects = async () => {
  const Dinos = await getData();
  console.log(Dinos.map((dino) => new Dino(dino)));
};

// Use IIFE to get human data from form
const iife = (function () {
  return async function () {
    const dinos = await getData();
    const name = document.getElementById("name").value;
    const heightMeterValue = document.getElementById("meter").value;
    const heightCentiMeterValue = document.getElementById("centimeter").value;
    const height = heightMeterValue * 100 + heightCentiMeterValue;
    const weight = document.getElementById("weight").value;
    const diet = document.getElementById("diet").value.toLowerCase();

    const dinoObjects = dinos.map((dino) => new Dino(dino));

    let dinoHtml = "";

    dinoObjects.forEach((dino, i) => {
      const OptionOne = dino.compareWeight(weight);
      const OptionTwo = dino.compareHeight(height);
      const OptionThree = dino.compareDiet(diet);

      const compareRandom = [OptionOne, OptionTwo, OptionThree][
        Math.floor(Math.random() * 3)
      ];

      if (i !== 4) {
        dinoHtml += addTile(dino, compareRandom);
      } else {
        dinoHtml +=
          `<div class="grid-item">
        <h3>Human</h3>
        <h4>${name}</h4>
          <img src="images/human.png"> 
          </div>` + addTile(dino, compareRandom);
      }
    });

    addTilesToDom(dinoHtml);
    removeFormFromScreen();
  };
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (weight) {
  return `The dino is ${weight < this.weight ? "heavier" : "lighter"} than you`;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (height) {
  return `The dino is ${height < this.height ? "taller" : "smaller"} than you`;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (diet) {
  return diet !== this.diet
    ? `The dino is not a ${diet} like you, but a ${this.diet}`
    : `You are both ${diet}`;
};

// Generate Tiles for each Dino in Array
const grid = document.getElementById("grid");

const addTile = (dino, compareText) => {
  return `<div class="grid-item">
  <h3>${dino.species}</h3>
  <h4>${dino.fact}</h4>
    <img src="images/${dino.species.toLowerCase()}.png"> 
    <h4>${compareText}</h4>
    </div>`;
};

// Add tiles to DOM
const addTilesToDom = (tilesHtml) => {
  const grid = document.getElementById("grid");
  grid.innerHTML = tilesHtml;
};

// Remove form from screen
const removeFormFromScreen = () => {
  const form = document.getElementById("dino-compare");
  form.parentNode.removeChild(form);
};

// On button click, prepare and display infographic
const button = document.getElementById("btn");

button.addEventListener("click", iife);
