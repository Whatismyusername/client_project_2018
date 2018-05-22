var images = [];
var emoji = ["emoji/Hugging_Face_Emoji.jpg", "emoji/Smiling_Emoji_with_Eyes_Opened.png", "emoji/Wink_Emoji.png"];
var myEmoji;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    console.log(window.innerWidth, window.innerHeight);
    for (var i = 0; i < emoji.length; i++){
        images[i] = loadImage(emoji[i]);
    }
    
    myEmoji = new Emoji();
}


function draw(){
    background(51);
    
    myEmoji.show();
    // myEmoji.update();
    }

function Emoji(){
    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;
    this.radius = Math.floor(Math.random() * 20) + 20;
    this.xMotion = (Math.random() - 0.5) * 2;
    this.yMotion = (Math.random() - 0.5) * 2;
    this.img = images[Math.floor(Math.random() * images.length)];
    
    this.update = function(){
        this.x = this.x + this.xMotion;
        this.y = this.y + this.yMotion;
    };
    
    this.show = function(){
        texture(this.img);
        ellipse(this.x, this.y, this.radius, this.radius);
        console.log(this.x, window.innerWidth, this.y, window.innerHeight)
    };
}

// Emoji.prototype.update = function() {
//     this.x = this.x + this.xMotion;
//     this.y = this.y + this.yMotion;
// }