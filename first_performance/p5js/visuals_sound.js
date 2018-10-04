var x = 0;
var y = 0;
function preload(){
	complete_grid = loadImage ("data/visuals_performance.jpg");
}

function setup() {
  createCanvas(1000, 1000);
    image(complete_grid, 0, 0);
}

function draw() {

}

// function keyPressed(){
// fill(255);
//  rect(x,y,10,10);
//  x = x+ 10;
//   if (x >= 100){
//     x = 0;
//     y = y+10;
//   }
// }


//=====================================================
//MIDI mesajes recaption function
//=====================================================

//Función receptora de mensajes MIDI usando webMidi.js
WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }
  // Viewing available inputs and outputs
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);
  // Display the current time
  console.log(WebMidi.time);
  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("auxVirtualPort Bus 1");

  input = WebMidi.inputs[0];

  // Listen for a 'note on' message on all channels
  // En Ableton Live las notas midi están
  input.addListener('noteon', "all",
    function (e) {
      // console.log("Recibido: " + e.note.name + parseInt(e.note.octave+2));
      // scene controlling
      console.log("llego nota")
      noStroke();
      fill(255);
       rect(x,y,100,100);
       x = x+ 100;
        if (x >= 1000){
          x = 0;
          y = y+100;
        }
      }

  );
});
