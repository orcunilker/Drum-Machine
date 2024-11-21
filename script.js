var bars = 1
var anzahlTakte = bars*16;
var currentTakt = 15;
var bpm = 90;

var kickFile = "kick0";
var snareFile = "snare0";
var hihatFile = "hihat0";


//Bloecke machen
bloeckeMachen("kickBlocks", "kb");
bloeckeMachen("snareBlocks", "sb");
bloeckeMachen("hihatBlocks", "hb");
function bloeckeMachen(divId, blockType){
  for (x = 0; x < anzahlTakte; x++) {
    var block = document.createElement("div");
    block.classList.add("block");
    block.id = blockType + x;

    if(x % 4 == 0) block.classList.add("taktEndBlock");

    document.getElementById(divId).appendChild(block);
    }
}




function takt(){
  document.getElementById("kb"+currentTakt).classList.remove("currentTakt");
  document.getElementById("sb"+currentTakt).classList.remove("currentTakt");
  document.getElementById("hb"+currentTakt).classList.remove("currentTakt");
  
  if(currentTakt >= anzahlTakte-1) currentTakt = 0;
  else currentTakt++;
  
  document.getElementById("kb"+currentTakt).classList.add("currentTakt");
  document.getElementById("sb"+currentTakt).classList.add("currentTakt");
  document.getElementById("hb"+currentTakt).classList.add("currentTakt");
  
  var kick = new Audio('sounds/'+kickFile+'.mp3');
  if(document.getElementById("kb"+currentTakt).classList.contains("selected"))  kick.play();
  var snare = new Audio('sounds/'+snareFile+'.mp3');
  if(document.getElementById("sb"+currentTakt).classList.contains("selected"))  snare.play();
  var hihat = new Audio('sounds/'+hihatFile+'.mp3');
  if(document.getElementById("hb"+currentTakt).classList.contains("selected"))  hihat.play();

}

var bloecke = document.getElementsByClassName("block");
for(let b of bloecke){
   b.onclick = function() {
    this.classList.toggle("selected");
   };
}


var taktProgression;
document.getElementById("play").onclick = function() {
	this.classList.toggle("playing");
	if(this.classList.contains("playing")){
    	taktProgression = setInterval(takt, ((60/bpm)*1000)/4);//durch 4 damits mehr unterteilt is
	}
	else clearInterval(taktProgression);
};


document.getElementById("bpm").onchange = function() {
	if(this.value > 0) bpm = this.value;
	else this.value = 1;
	if(document.getElementById("play").classList.contains("playing")){
		clearInterval(taktProgression);
		taktProgression = setInterval(takt, ((60/bpm)*1000)/4);
	}
}

document.getElementById("kickSelect").onchange = function() {kickFile = this.value;}
document.getElementById("snareSelect").onchange = function() {snareFile = this.value;}
document.getElementById("hihatSelect").onchange = function() {hihatFile = this.value;}