var openData;
var openNext = [];
var min;
var fr=6;
var tSize;//window.height/20;
var ddImg;

function preload () {
  ddImg=loadImage("lab1.png");
}


function setup() {
  loadJSON('https://script.googleusercontent.com/macros/echo?user_content_key=ZOk4S3iYBmLoCSVEYTVn6jZX3Fz-Y0oDKxVEMBBz0hsaTlJgxjhypDtgykm4fEIynfmyFfA0uyg2c44x2MHVCTuVgThqk23hm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDRtrHJ_B07pTY_RGQB9NgIlvQFo4AEb7AWNFWyMdXAla4PE5KW5lkb1btx4KUrnXmlgLNiGRXNx&lib=MLZpv_I1oO55YzaOvgVD5WaTNt6qxM66-', getData);
  //createCanvas(windowWidth ,windowHeight);
  createCanvas (windowWidth, windowHeight);
  noCursor();
  if(windowWidth<windowHeight){
    tSize = windowWidth/20;
  }
  else{
    tSize = windowHeight/20;
  }
  textSize(32);
  textAlign(CENTER);
  frameRate(fr);
  textSize(tSize);
}

function update(){
  loadJSON('https://script.googleusercontent.com/macros/echo?user_content_key=ZOk4S3iYBmLoCSVEYTVn6jZX3Fz-Y0oDKxVEMBBz0hsaTlJgxjhypDtgykm4fEIynfmyFfA0uyg2c44x2MHVCTuVgThqk23hm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDRtrHJ_B07pTY_RGQB9NgIlvQFo4AEb7AWNFWyMdXAla4PE5KW5lkb1btx4KUrnXmlgLNiGRXNx&lib=MLZpv_I1oO55YzaOvgVD5WaTNt6qxM66-', getData);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(windowWidth<windowHeight){
    tSize = windowWidth/20;
  }
  else{
    tSize = windowHeight/20;
  }
}

function getData(data) {
  openData = data;
}

function draw() {
  if(openData){
    background(50);
    imageMode(CENTER);
    ddImg.resize(0,width/8);
    image(ddImg,width/2, height/5.5);
    filter(BLUR,3);
    fill(255);
    var result = handleData();
    if(result == 'Niels' || result == 'Ann' || result == 'Nikolaj'){
      text("DD Lab er ",windowWidth/2-textWidth("åbent")/2, windowHeight/2-tSize-tSize/2);
      fill(57,123,255);
      textAlign(RIGHT);
      text("åbent",windowWidth/2+textWidth("DD Lab er ")-textWidth("åbent")/2, windowHeight/2-tSize-tSize/2);
      textAlign(CENTER);
      fill(255);
      text(result + ' er på arbejde',windowWidth/2, windowHeight/2);
      var closingHours = openData.items[openNext[0]].end.dateTime.substr(11,5);
      text("Lukker kl " + closingHours, windowWidth/2, windowHeight/2+tSize+tSize/2);

      text("Næste åbningstid d. " + openData.items[openNext[1]].start.dateTime.substr(8,2) +
       "/" + openData.items[openNext[1]].start.dateTime.substr(5,2) +
        ", fra kl " +openData.items[openNext[1]].start.dateTime.substr(11,5) + " til "
        +openData.items[openNext[1]].end.dateTime.substr(11,5)
        ,windowWidth/2, windowHeight/2+tSize*4);
    }
    else{
        var textPlacement = -6*tSize;
        text('DD Lab er ',windowWidth/2-textWidth("lukket")/2, windowHeight/2+textPlacement);
        fill(255,0,0);
        textAlign(RIGHT);
        text('lukket',windowWidth/2+textWidth("DD Lab er ")-textWidth("lukket")/2, windowHeight/2+textPlacement);
        fill(255);
        textPlacement=textPlacement+tSize;
        for(var i = 0; i<3; i++){
          textPlacement=textPlacement+tSize;
          text("Lab'et har åbent d. " + openData.items[openNext[i]].start.dateTime.substr(8,2) +
           "/" + openData.items[openNext[i]].start.dateTime.substr(5,2) +
            ", fra kl " +openData.items[openNext[i]].start.dateTime.substr(11,5) + " til "
            +openData.items[openNext[i]].end.dateTime.substr(11,5)
              ,windowWidth/2, windowHeight/2+textPlacement);
          textPlacement=textPlacement+tSize;
          text("ansatte på arbejde er "+ openData.items[openNext[i]].summary,windowWidth/2, windowHeight/2+textPlacement);
          textPlacement=textPlacement+tSize;
        }
      }
    }
  openData= "";
  update();
}



function handleData(){
  //openData = data;
  openNext = [];
  for(var i = 0; i<openData.items.length; i++){
    var labRat = openData.items[i].summary;

    if(labRat=='Niels' || labRat == 'Ann' || labRat == 'Nikolaj'){
      append(openNext, i);
    }
  }
  var today = openData.items[openNext[0]].start.dateTime;
  var beginOf = today.substr(8, 2);
  var openingHours = today.substr(11,2);
  var closingHours = openData.items[openNext[0]].end.dateTime.substr(11,2);
  if(beginOf==day() && hour()>=openingHours && hour()<closingHours){
    return openData.items[openNext[0]].summary;
  }
  else {
    return 'Closed';
  }
}


function drawOpen(){
  dates = openData.items;
  print(hour()+':'+minute()+':'+second()+' '+day()+'/'+month()+'-'+year());
  randomSeed(5);
  for(var i = 0; i<dates.length; i++){
    var w = random(width);
    var h = random(height);
    ellipse(w,h, 20,20);
    text(dates[i].summary + ': ' + dates[i].start.dateTime, w,h+20);
  }
}
