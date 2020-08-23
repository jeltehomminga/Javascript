async function getData() {
  const response = await fetch("/dino.json");
  const { Dinos } = await response.json();
  return Dinos;
}

// Create Creature Constructor
function Creature({ weight, height, diet }) {
  this.weight = weight;
  this.height = height;
  this.diet = diet;
}

// Create Dino Constructor
function Dino({ species, weight, height, diet, where, when, fact }) {
  Creature.call(this, { weight, height, diet });
  this.species = species;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

//Create Human Constructor
function Human({ name, weight, height, diet }) {
  Creature.call(this, { weight, height, diet });
  this.name = name;
}

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

const addDinoTile = (dino, compareText) => {
  return `<div class="grid-item">
    <h3>${dino.species}</h3>
    <h4>${dino.fact}</h4>
    <img src="images/${dino.species.toLowerCase()}.png"> 
    <h4>${compareText}</h4>
    </div>`;
};

// Create human object from user input
const createHuman = () => {
  const name = document.getElementById("name").value,
    heightMeterValue = document.getElementById("meter").value,
    heightCentiMeterValue = document.getElementById("centimeter").value,
    height = heightMeterValue * 100 + heightCentiMeterValue,
    weight = document.getElementById("weight").value,
    diet = document.getElementById("diet").value.toLowerCase();
  return new Human({ name, weight, height, diet });
};

// Generate Tile for human
const addHumanTile = ({ name }) => {
  return `<div class="grid-item">
    <h3>Human</h3>
    <h4>${name}</h4>
    <img src="images/human.png"> 
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

// Use IIFE to get human data from form
const iife = (function () {
  return async function () {
    const dinos = await getData();
    const dinoObjects = dinos.map((dino) => new Dino(dino));
    const human = createHuman();

    let dinoHtml = "";

    dinoObjects.forEach((dino, i) => {
      const randomNumber = Math.floor(Math.random() * 3);
      let randomCompare;
      randomNumber === 0
        ? (randomCompare = dino.compareWeight(human.weight))
        : randomNumber === 1
        ? (randomCompare = dino.compareHeight(human.height))
        : (randomCompare = dino.compareDiet(human.diet));
      if (i === 4) dinoHtml += addHumanTile(human);
      dinoHtml += addDinoTile(dino, randomCompare);
    });

    addTilesToDom(dinoHtml);
    removeFormFromScreen();
  };
})();

// On button click, prepare and display infographic
const button = document.getElementById("btn");

button.addEventListener("click", iife);
