// Sofia Luisa Suazo Monsalve | november, 2018
// Text to voice sketch, for generative music performance
// The skecth randomly read phrases that were generated with a LSTM model on radiohead lyric data
// Developed for ITP-NYU "Generative Music" class (Fall 2018)
// In collaboration with Guillermo Montecinos
//TO-DO'S: CHANGE FONT AND DECORATE BACKGROUND. ADD MORE LYRICS.


var myVoice = new p5.Speech('Google UK English Male'); // new P5.Speech object
var saying = []; // holds phrase selected for the speech
var sayingRept = [];//holds phrase that is said
                   //when the key pressed is the same as the the last one.
var key = []; // holds value of keys that were pressed
var keyCounter = []; // holds value of the last key that were pressed
var counter = 0;
var writting = "";
var mouseX2rate;
var mouseY2pitch;
var myFont;
var gif;

myVoice.OnLoad = keyPressed;

var markovLyrics = ["In red baby, or speakers ",
"I wanna know today?",
"You've got something big is not confusion a bug in sun away out all,",
"Think that I'd been around around enough is eating the dark,",
"From the moon full over can't hurts.",
"He talk about you take it but no, no, no",
"Breath you park the new found and emptiest want",
"everythings into the heads down",
"I'm not want a perfect,",
"Turn climbing time,",
"Denial, denial, denial,",
"And to little pland you know when I'm no righ,",
"But I'm a hearts makes and the head,",
"Your dance are free unborn little by thout, done,",
"So why shout,",
"In the thing walking sky,",
"That the the world in the can't gets so last as I'd lone,",
"Suck, sucking on people,",
"You're lost myself, yes-yes, your mouth will mess you up,",
"The one like a quiet down (that's what I had),",
"There there'll be no more lies,",
"Your face the wally sympatten you?,",
"Do what I'm not,",
"Why don't reach out, don't leave,",
"We don't know I know,",
"Take themselves and cents and standing on the weeds,",
"Taking over toys for the words and sometimes,",
"efil ym fathing,",
"Everything on the worms,",
"I get up get swept under anaesthetic,",
"I am her me,",
"Nowhere wrong we got myself, no return,",
"You remember my drip feeds me,"
];

function setup(){
  createCanvas(windowWidth, windowHeight);
  //gif = loadGif('/gan_visuals.gif');
  //gif.play();
  myVideo = createVideo(['./gan_visuals.mp4']);
  //myVideo.size(windowWidth, windowHeight);
  //myVideo.position(0, 0);
  myVideo.loop();
  myVideo.hide();
}

function draw(){

    background(0); // clear screen
    image(myVideo, width/2-(height/2), 0, height, height);
    fill(0,125);
    noStroke();
    rect(0, height/2-25, windowWidth, 35);

    fill(255);
    //stroke(255);
    //strokeWeight(1);
    textSize(30);
    textAlign(CENTER);
    //textStyle(BOLD);
    textFont('Courier');
    text(writting, width/2, height/2);

    keyCounter = [key];
    //mouseX2rate = map(mouseX, 0, width, 0.2, 0.9);
    //mouseY2pitch = map(mouseY, 0, width, 0.2, 0.9);
    //console.log("writting lenght is " + writting.lenght);

}

function doList()
{
  myVoice.listVoices(); // debug printer for voice options
}


function keyPressed()
{
  myVoice.setPitch(0.45);
  //text(saying[counter], width/2, height/2);
  console.log(saying);
  console.log(key + keyCounter);

  if (key != keyCounter){
    saying.push(markovLyrics[Math.floor(random(markovLyrics.length))]);
    writting = saying[counter];
    myVoice.setRate(0.6);
    myVoice.speak(writting);
    counter = counter + 1;
    console.log(counter);
  }

  if (key == keyCounter){

    console.log(counter-1);
    writting = saying[counter-1]
    myVoice.setRate(0.4);
    myVoice.speak(writting);
  }
}
