let meme;
let memeName;
let memeImage;
let memeURL;
let p5Image;
let clickedB;
// ===============================
let memeText;
let memeNameText;
let memeImageText;
let memeURLText;

//loads initial meme
window.addEventListener("load", function() {
fetch("https://api.imgflip.com/get_memes")
.then(response => response.json())
.then(data => {
    console.log(data.data.memes)
    memeData = data.data.memes
    randomMeme = Math.floor(Math.random() * data.data.memes.length);
    
    // console.log(memeData[randomMeme].url)
    let memeName = document.getElementById("meme_name");
    memeName.innerHTML = memeData[randomMeme].name;

    let memeImage = document.getElementById("meme_img")
    memeImage.src = memeData[randomMeme].url;

    memeURL = memeData[randomMeme].url
    p5Image = loadImage(memeURL)
    console.log(p5Image);

    })
});

//loads initial meme text from https://github.com/D3vd/Meme_Api
window.addEventListener("load", function() {
  console.log('page is loaded!');
fetch("https://meme-api.herokuapp.com/gimme/15?action=render")
.then(response => response.json())
.then(data => {
  //Seems like the config to access data is contengent upon the api or the config of what your accessing
  console.log(data.memes[0].title); // ".title" did the trick to render the "Title" portion of the 2nd Meme API

  // Process this API portion here...
  memeTextData = data.memes.title
  randomTextMeme = Math.floor(Math.random() * data.memes.length);
  console.log(randomTextMeme);

  memeText = document.getElementById("meme_text");
  //memeText.innerHTML = data.memes[randomTextMeme].title;
  })
});

//refreshes the memeText with the a meme button press
let memeButton = document.getElementById("button");
memeButton.addEventListener("click", function() {

  fetch("https://meme-api.herokuapp.com/gimme/15?action=render")
  .then(response => response.json())
  .then(data => {
    console.log(data.memes[0].title); // ".title" did the trick to render the "Title" portion of the 2nd Meme API

    // Process this API portion here...
    memeTextData = data.memes.title
    randomTextMeme = Math.floor(Math.random() * data.memes.length);
    console.log(randomTextMeme);
  
    memeText = document.getElementById("meme_text");
    memeText.innerHTML = data.memes[randomTextMeme].title;
    })
})

//refreshes the meme with the meme button
//let memeButton = document.getElementById("button"); //We can just create another click event for the same button press event...
memeButton.addEventListener("click", function() {

    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(data => {
    console.log(data.data.memes)
    memeData = data.data.memes
    randomMeme = Math.floor(Math.random() * data.data.memes.length);

    memeName = document.getElementById("meme_name");
    memeName.innerHTML = memeData[randomMeme].name;

    memeImage = document.getElementById("meme_img")
    memeImage.src = memeData[randomMeme].url;

    memeURL = memeData[randomMeme].url
    p5Image = loadImage(memeURL)
    })
})

//creates the surprise button and links it to the inverse display function
let surpriseButton = document.getElementById("surprise_b");
surpriseButton.addEventListener("click", function() {
    clickedB = !clickedB
    console.log(clickedB)
})

// ===============================

// global parameters for fire
// fire code is from https://kampeki-factory.blogspot.com/2018/03/set-your-browser-on-fire-with-p5js.html
var fireElemLenght  = 9; // Changed to 9 for more intensity...
var elemOpacity     = 255;

var fireLines   = [];
var fireWidth   = 0;
var fireHeight  = 0;

var nbColors    = 255;  // Nb Colors in the palette
var palette     = [];   // our color palette for the fire

//p5 to distort images?
function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);

    // 2D Fire: init size of fire
  fireWidth   = int(width / fireElemLenght);
  fireHeight  = int(height / fireElemLenght);
  print(fireWidth + ", " + fireHeight);
  
  // for each fire's 'lines'
  for(let i= 0; i<fireHeight; i++)
  {
    fireLines[i] = [];      // create the new line of fire pixels
    
    for(var x=0; x<fireWidth; x++)
      fireLines[i][x] = 0;  // Initialize to black
  }
  
  // generate fire colors palette
  initializePalette();
  
  // set black background
  background(0,0,0);
  noStroke();
}

function draw() {
    // We clean the background each time
    background(0,0,0);
  
    // We generate a new base fire line (to make it 'move')
    initFireLine();
  
    // Compute the whole fire pixels
    fireGrow();
  
    // Display the result
    drawFire();

    //IMAGE distortion
    image(p5Image, 0, 0)
    // filter(INVERT);
    image(p5Image, 0, 200)
    tint(255, 92, 53, 126)

    push();
    scale(0.5);
    image(p5Image, 200, 0);
    filter(POSTERIZE, 15);
    pop();

    //inverts image if "Surprise" button pressed
    if (clickedB==true) {
        filter(INVERT);
  }
}

function initializePalette()
{
  // generate our 255 color palette
  // try to change colors composing the fire
  for(var i=0; i<nbColors; i++)
  {
    var val   = exp(i/10) - 1;

    var red   = map(val, 0, exp(7.5), 0, 255);
    var green = map(val, 0, exp(10), 0, 255);
    var blue  = random(50);
    
    if(green > 254) // check for colors range
    {
      red   = 255;
      green = 255;
      blue  = 255;
    }
    
    // check/erase for 'noisy' blue pixels
    if(red < 20 && green < 20)
    {
      red = green = blue = 0;
    }

    // add new color
    palette[i]  = color(red, green, blue, elemOpacity);
  }
}

// ======================================
// &gt; initFireLine() method
// Make a new base fire line (randomly, to make the fire 'move' when it grows)
// Remark: Y axis is inverter on our screens ==&gt; baseY = fireHeight-1
// ======================================
function initFireLine()
{
  // generate fire base (1st line) color ('randomly')
  for(var x=0; x<fireWidth; x++)
  {
    fireLines[fireHeight-1][x] = random(0,nbColors);
    fireLines[fireHeight-2][x] = random(0,nbColors);
    fireLines[fireHeight-3][x] = random(0,100);
  }
}

// ======================================
// &gt; fireGrow() method
// Compute the whole fire, line by line. Start after the base line
// We compute each pixel color from its neighbors (a kind of median)
// It gives a blurry effect
// ======================================
function fireGrow(){
 
 // for each fire line
 for(var y=fireHeight-2; y>=1; y--)
 {

  // compute new fire color line 
  // based on the bottom &amp; top lines
   for(var x=1; x<fireWidth-1; x++)
   {
       // Get neighbors colors
       var c1 = fireLines[y+1][x];
       var c2 = fireLines[y][x-1];
       var c3 = fireLines[y][x+1];
       var c4 = fireLines[y-1][x];
       var c5 = fireLines[y][x];

       // We make a 'median' color
       var newCol = int((c1 + c2 + c3 + c4 + c5) / 5) - 1;
       fireLines[y - 1][x] = newCol;
   }
 }
}

// ======================================
// &gt; drawFire() method
// Drawing pass - to draw the fire from its computed matrix
//
// ======================================
function drawFire(){

  // foreach fire lines
  for(var y=fireHeight-1; y>0; y--)
  {
    // foreach pixel in the line
    for(var x=0; x<fireWidth-1; x++)
    {
      // get current pixel color index
      var idx = int(fireLines[y][x]);

      // check for color index limits
      if(idx<0) idx = 0;
      if(idx >= nbColors) idx = nbColors-1;
      
      // apply current pixel color
      fill(palette[idx]); 

      // Draw a square representing the current fire's pixel
      rect(int(x * fireElemLenght - (fireElemLenght / 2)),
          int(y * fireElemLenght + (fireElemLenght / 2)),
          fireElemLenght * 2 , 
          fireElemLenght * 2);
    }

  }

}