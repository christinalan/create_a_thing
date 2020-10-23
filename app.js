let meme;
let memeName;
let memeImage;
let memeURL;
let p5Image;

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

//refreshes the meme with the meme button
let memeButton = document.getElementById("button");
memeButton.addEventListener("click", function() {

    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(data => {
    console.log(data.data.memes)
    memeData = data.data.memes
    randomMeme = Math.floor(Math.random() * data.data.memes.length);
    
    // console.log(memeData[randomMeme].url)
    memeName = document.getElementById("meme_name");
    memeName.innerHTML = memeData[randomMeme].name;

    memeImage = document.getElementById("meme_img")
    memeImage.src = memeData[randomMeme].url;

    memeURL = memeData[randomMeme].url
    p5Image = loadImage(memeURL)
    })
})

//p5 to distort images?
function setup() {
    createCanvas(400, 400);
    background('black');
}


function draw() {
    image(p5Image, 0, 0)
    filter(INVERT);
}