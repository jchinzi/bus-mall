// ===========================Global Variables===========================

var productsCollection = [];
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

  productsCollection.push(this);
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

console.log('Product Collection',productsCollection);

// ===========================Event Listener===========================

var productImgSection = document.getElementById('products');
productImgSection.addEventListener('click', handleChoiceClick);

function handleChoiceClick(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;

    var targetSrc = event.target.getAttribute('src');
    for(var i = 0; i < productsCollection.length; i++){
      if (productsCollection[i].imgSrc === targetSrc){
        // console.log('it was', productsCollection[i]);
        productsCollection[i].clicked++;
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

// ===========================Function to Cycle Products Displayed===========================


function rerenderProductImages(){
  var leftRandom = pickRandom(0, productsCollection.length);

  var middleRandom = pickRandom(0, productsCollection.length);

  while(middleRandom === leftRandom){
    middleRandom = pickRandom(0, productsCollection.length);
  }

  var rightRandom = pickRandom(0, productsCollection.length);

  while(rightRandom === leftRandom || rightRandom === middleRandom){
    rightRandom = pickRandom(0, productsCollection.length);
  }
  console.log('Random Product Index', leftRandom, middleRandom, rightRandom);
  
  var leftImage = document.getElementById('left-img');
  var leftText = document.getElementById('left-text');
  
  var middleImage = document.getElementById('center-img');
  var middleText = document.getElementById('center-text');
  
  var rightImage = document.getElementById('right-img');
  var rightText = document.getElementById('right-text');
  
  leftImage.src = productsCollection[leftRandom].imgSrc;
  leftText.textContent = productsCollection[leftRandom].productName;
  productsCollection[leftRandom].shown++;
  
  middleImage.src = productsCollection[middleRandom].imgSrc;
  middleText.textContent = productsCollection[middleRandom].productName;
  productsCollection[middleRandom].shown++;
  
  rightImage.src = productsCollection[rightRandom].imgSrc;
  rightText.textContent = productsCollection[rightRandom].productName;
  productsCollection[rightRandom].shown++;
}
  
// ===========================Function to Render Results===========================

function printResults(){

  var resultsUL = document.getElementById('results');
  for (var i = 0; i < productsCollection.length; i++){

  var resultsLI = document.createElement('li');

  var productResult = document.createElement('p');

    productResult.textContent = (productsCollection[i].productName + ' had ' + productsCollection[i].clicked + ' votes and was shown ' + productsCollection[i].shown + ' times');
 
    resultsLI.appendChild(productResult);
    
    resultsUL.appendChild(resultsLI);
  }

}

