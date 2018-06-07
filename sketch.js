var images = [];
var emoji = ["emoji/Hugging_Face_Emoji.png", "emoji/Smiling_Emoji_with_Eyes_Opened.png", "emoji/Wink_Emoji.png", "emoji/Tongue_Out_Emoji_with_Winking_Eye.png", "emoji/Blow_Kiss_Emoji.png"];
var myEmoji = [];

function setup(){
    var ctx = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    ctx.parent('container');
    for (var i = 0; i < emoji.length; i++){
        images[i] = loadImage(emoji[i]);
    }
    if(window.musicChanged === true){
        musicImg = loadImage(window.musicImage);
        window.musicChanged = false;
    }
    
    for(var i = 0; i < 100; i++){
        myEmoji.push(new Emoji());
    }
        
    setInterval(function(){
        if(myEmoji.length < 250){
            for(var i = 0; i < 80; i++){
                myEmoji.push(new Emoji());
            };
        }
        for(var i = 0; i < myEmoji.length; i++){
            if(myEmoji[i].deleteIfFarAway() === true){
                myEmoji.splice(i, 1);
            }
        }
        console.log(myEmoji);
    }, 10000);
    
   
    
    
}


function draw(){
    clear();
    for(var i = 0; i < myEmoji.length; i++){
        myEmoji[i].show();
        myEmoji[i].update();
    }

    }

function Emoji(){
    this.x = 0;
    this.y = 0;
    this.radius = Math.floor(Math.random() * 20) + 20;
    this.xMotion = (Math.random() - 0.5) * 2;
    this.yMotion = (Math.random() - 0.5) * 2;
    this.img = images[Math.floor(Math.random() * images.length)];
    
    this.update = function(){
        this.x = this.x + this.xMotion;
        this.y = this.y + this.yMotion;
    };
    
    this.deleteIfFarAway = function(){
        if (this.x < -window.innerWidth || this.x > window.innerWidth || this.y < -window.innerHeight || this.y > window.innerHeight){
            return true;
        }
        return false
    }
    
    this.show = function(){
        texture(this.img);
        ellipse(this.x, this.y, this.radius, this.radius);
        };
}
