// ===========================Global Variables===========================

Product.collection = [];
var totalClicks = 0;
var maxClicks = 25;
var randomArray = [];
var altRandomArray = [];

// ===========================Basic Functions===========================

function pickRandom(min, max){
  return Math.floor(Math.random() * (max-min) + min);
}

// ===========================Constructor Function===========================

function Product(imgSrc, productName){
  this.clicked = 0;
  this.shown = 0;
  this.imgSrc = imgSrc;
  this.productName = productName;

  Product.collection.push(this);
}

new Product('img/bag.jpg', 'Robot Suitcase');
new Product('img/banana.jpg', 'Banana Slicer');
new Product('img/bathroom.jpg', '2-in-1 Tablet Holder and Toilet Paper Dispenser');
new Product('img/boots.jpg', 'Toeless Boots');
new Product('img/breakfast.jpg', 'All in One Breakfast Maker');
new Product('img/bubblegum.jpg', 'Meatball Bubblegum');
new Product('img/chair.jpg', 'Standing Chair');
new Product('img/cthulhu.jpg', 'Cthulhu Figurine');
new Product('img/dog-duck.jpg', 'Dog Bill');
new Product('img/dragon.jpg', 'Dragon Meat, 19oz');
new Product('img/pen.jpg', 'Cutlery Pens');
new Product('img/pet-sweep.jpg', 'Animal Powered Debris Removal System');
new Product('img/scissors.jpg', 'Pizza Scissors');
new Product('img/shark.jpg', 'Great White Sleeping Bag');
new Product('img/sweep.png', 'Infant Powered Debris Removal System');
new Product('img/tauntaun.jpg', 'Eviscerated Tauntaun Sleeping Bag');
new Product('img/unicorn.jpg', 'Unicorn Meat, 5.5oz');
new Product('img/usb.gif', 'Tentacle USB');
new Product('img/water-can.jpg', 'Self-Watering Can');
new Product('img/wine-glass.jpg', 'Terrarium Style Wine Glass');

console.log('Product Collection',Product.collection);

// ===========================Random Array Function===========================

function fillRandomArray(){

  randomArray = [];

  while (randomArray.length<3){

    var randomIndex = Math.floor(Math.random() * Product.collection.length);

    if (randomArray.indexOf(randomIndex) !== -1){
      var randomIndex = Math.floor(Math.random() * Product.collection.length);
    } else {
    randomArray.push(randomIndex)
    }
  }
};

fillRandomArray();
console.log('Primary Array', randomArray)

// ===========================Reroll Random Array Function===========================

function rerollRandomArray(){

  altRandomArray = [];

  while (altRandomArray.length<3){

    var randomIndex = Math.floor(Math.random() * Product.collection.length);

    if ((altRandomArray.indexOf(randomIndex) !== -1) || (randomArray.indexOf(randomIndex) !== -1)){
      var randomIndex = Math.floor(Math.random() * Product.collection.length);
    } else {
      altRandomArray.push(randomIndex)
    }
  }
  randomArray.splice(0, 3, altRandomArray[0], altRandomArray[1], altRandomArray[2]);
};

// ===========================Event Listener===========================

var productImgSection = document.getElementById('products');
productImgSection.addEventListener('click', handleChoiceClick);

function handleChoiceClick(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;

    var targetSrc = event.target.getAttribute('src');
    for(var i = 0; i < Product.collection.length; i++){
      if (Product.collection[i].imgSrc === targetSrc){
        // console.log('it was', Product.collection[i]);
        Product.collection[i].clicked++;
      }
    }

    if (totalClicks === maxClicks){
      alert('Thanks for your input!  Take a look at the results to your left.')
      productImgSection.removeEventListener('click', handleChoiceClick);
      printResults();
    }
    
  } else {
    alert('Please click on your favorite product of the three shown'); //TODO: This doesn't seem to be happening
  }
  rerenderProductImages();
}

// ===========================Function to Display Initial Images===========================

function displayInitialProducts(){

  fillRandomArray();
  leftProductIndex = randomArray[0];
  centerProductIndex = randomArray[1];
  rightProductIndex = randomArray[2];

  var productDisplayWindow = document.getElementById('products');

  //Left Product
  var figureElement = document.createElement('figure');

  var leftproductImage = document.createElement('IMG');
  leftproductImage.src = Product.collection[leftProductIndex].imgSrc;
  leftproductImage.id = 'left-img';
  figureElement.appendChild(leftproductImage);

  var leftproductTitle = document.createElement('figcaption');
  leftproductTitle.textContent = Product.collection[leftProductIndex].productName;
  leftproductTitle.id = 'left-text';
  figureElement.appendChild(leftproductTitle);

  productDisplayWindow.appendChild(figureElement);

//Center Product
figureElement = document.createElement('figure');

var centerProductImage = document.createElement('IMG');
centerProductImage.src = Product.collection[centerProductIndex].imgSrc;
centerProductImage.id = 'center-img';
figureElement.appendChild(centerProductImage);

var centerProductTitle = document.createElement('figcaption');
centerProductTitle.textContent = Product.collection[centerProductIndex].productName;
centerProductTitle.id = 'center-text';
figureElement.appendChild(centerProductTitle);

productDisplayWindow.appendChild(figureElement);

//Right Product
figureElement = document.createElement('figure');

var rightproductImage = document.createElement('IMG');
rightproductImage.src = Product.collection[rightProductIndex].imgSrc;
rightproductImage.id = 'right-img';
figureElement.appendChild(rightproductImage);

var rightproductTitle = document.createElement('figcaption');
rightproductTitle.textContent = Product.collection[rightProductIndex].productName;
rightproductTitle.id = 'right-text';
figureElement.appendChild(rightproductTitle);

productDisplayWindow.appendChild(figureElement);

}

displayInitialProducts();

// ===========================Function to Cycle Products Displayed===========================


function rerenderProductImages(){

  rerollRandomArray();

  var leftProductIndex = randomArray[0];
  var centerProductIndex = randomArray[1];
  var rightProductIndex = randomArray[2];
  
  var leftImage = document.getElementById('left-img');
  var leftText = document.getElementById('left-text');
  
  var middleImage = document.getElementById('center-img');
  var middleText = document.getElementById('center-text');
  
  var rightImage = document.getElementById('right-img');
  var rightText = document.getElementById('right-text');
  
  leftImage.src = Product.collection[leftProductIndex].imgSrc;
  leftText.textContent = Product.collection[leftProductIndex].productName;
  Product.collection[leftProductIndex].shown++;
  
  middleImage.src = Product.collection[centerProductIndex].imgSrc;
  middleText.textContent = Product.collection[centerProductIndex].productName;
  Product.collection[centerProductIndex].shown++;
  
  rightImage.src = Product.collection[rightProductIndex].imgSrc;
  rightText.textContent = Product.collection[rightProductIndex].productName;
  Product.collection[rightProductIndex].shown++;
}
  
// ===========================Function to Render Results===========================

function printResults(){

  var resultsUL = document.getElementById('results');
  for (var i = 0; i < Product.collection.length; i++){

  var resultsLI = document.createElement('li');

  var productResult = document.createElement('p');

    productResult.textContent = (Product.collection[i].productName + ' had ' + Product.collection[i].clicked + ' votes and was shown ' + Product.collection[i].shown + ' times');
 
    resultsLI.appendChild(productResult);
    
    resultsUL.appendChild(resultsLI);
  }

}

