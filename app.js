// ===========================Global Variables===========================

Product.collection = [];
var totalClicks = 0;
var maxClicks = 25;

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

  var productDisplayWindow = document.getElementById('products');

  //Left Product
  var figureElement = document.createElement('figure');

  var leftproductImage = document.createElement('IMG');
  leftproductImage.src = Product.collection[0].imgSrc;
  leftproductImage.id = 'left-img';
  figureElement.appendChild(leftproductImage);

  var leftproductTitle = document.createElement('figcaption');
  leftproductTitle.textContent = Product.collection[0].productName;
  leftproductTitle.id = 'left-text';
  figureElement.appendChild(leftproductTitle);

  productDisplayWindow.appendChild(figureElement);

//Center Product
figureElement = document.createElement('figure');

var centerProductImage = document.createElement('IMG');
centerProductImage.src = Product.collection[1].imgSrc;
centerProductImage.id = 'center-img';
figureElement.appendChild(centerProductImage);

var centerProductTitle = document.createElement('figcaption');
centerProductTitle.textContent = Product.collection[1].productName;
centerProductTitle.id = 'center-text';
figureElement.appendChild(centerProductTitle);

productDisplayWindow.appendChild(figureElement);

//Right Product
figureElement = document.createElement('figure');

var rightproductImage = document.createElement('IMG');
rightproductImage.src = Product.collection[2].imgSrc;
rightproductImage.id = 'right-img';
figureElement.appendChild(rightproductImage);

var rightproductTitle = document.createElement('figcaption');
rightproductTitle.textContent = Product.collection[2].productName;
rightproductTitle.id = 'right-text';
figureElement.appendChild(rightproductTitle);

productDisplayWindow.appendChild(figureElement);

}

displayInitialProducts();

// ===========================Function to Cycle Products Displayed===========================


function rerenderProductImages(){
  var leftRandom = pickRandom(0, Product.collection.length);

  var middleRandom = pickRandom(0, Product.collection.length);

  while(middleRandom === leftRandom){
    middleRandom = pickRandom(0, Product.collection.length);
  }

  var rightRandom = pickRandom(0, Product.collection.length);

  while(rightRandom === leftRandom || rightRandom === middleRandom){
    rightRandom = pickRandom(0, Product.collection.length);
  }
  // console.log('Random Product Index', leftRandom, middleRandom, rightRandom);
  
  var leftImage = document.getElementById('left-img');
  var leftText = document.getElementById('left-text');
  
  var middleImage = document.getElementById('center-img');
  var middleText = document.getElementById('center-text');
  
  var rightImage = document.getElementById('right-img');
  var rightText = document.getElementById('right-text');
  
  leftImage.src = Product.collection[leftRandom].imgSrc;
  leftText.textContent = Product.collection[leftRandom].productName;
  Product.collection[leftRandom].shown++;
  
  middleImage.src = Product.collection[middleRandom].imgSrc;
  middleText.textContent = Product.collection[middleRandom].productName;
  Product.collection[middleRandom].shown++;
  
  rightImage.src = Product.collection[rightRandom].imgSrc;
  rightText.textContent = Product.collection[rightRandom].productName;
  Product.collection[rightRandom].shown++;
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

