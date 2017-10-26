var openData;
var events = [];
var announcements = [
  "Døren til DD Lab må ikke stå åben uden for åbningstiderne, på grund af alarmen.",
  "Hvis du/I har et projekt, det være sig bachelor-, eksamens- (kandidat), speciale- e.lign. og ønsker 24-7 adgang til lab´et, så send en kort beskrivelse af projektet, den periode det løber i samt en kort beskrivelse af din/jeres tilknytning til universitetet. Du kan altid anvende lab’et indenfor dets åbningstid. Ansøgningen sendes til: Rasmus Lunding, rasl@cc.au.dk"
];
var min;
var tSize;//window.height/20;
// var ddImg;
// var labRat;

var millisJSON;
var lastTime;
var loadInterval = 10000;

var notInLab;
var timerIntervalMin = 5;
var millisPause;
var lastPause;
var waitForData = 0;


function preload () {
  // ddImg=loadImage("images/lab1.png");
}


function setup() {
  update();
  noCursor();
  createCanvas (windowWidth, windowHeight);
  if(windowWidth<windowHeight){
    tSize = windowWidth/20;
  }
  else{
    tSize = windowHeight/20;
  }
  textSize(32);
  textAlign(CENTER);
  textSize(tSize);
  background(50);
  text("Henter JSON", windowWidth/2, windowHeight/2);

  millisJSON = millis();
  millisPause = millis();
  lastTime = millisJSON;
  notInLab = 0;
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
  println(openData);
  waitForData= 1;
}

function draw() {
  fill(255);
  if(waitForData != 0){
    update();
    drawOpen();
  }
}

function handleData(){
  //openData = data; append(openNext, i);
  events = [];
  for(var i = 0; i<openData.items.length; i++){
    var labRat = openData.items[i].summary;
    if(labRat=='Niels' || labRat == 'Ann' || labRat == 'Nikolaj' || labRat == 'Anders' || labRat == 'Søren'){
      append(events,
        new Event(
        openData.items[i].summary,
        openData.items[i].start.dateTime,
        openData.items[i].end.dateTime,
        openData.items[i].description
        )
      );
    }
    if(labRat == 'OBS'){
      append(announcements,
        new Event(
        openData.items[i].summary,
        openData.items[i].start.dateTime,
        openData.items[i].end.dateTime,
        openData.items[i].description
        )
      );
    }
  }

  if(events[0].getDay("begin")==day() && hour()>=events[0].getHour("begin") && hour()<events[0].getHour("end")){
    println("OPEN!!!");
    return events[0].name;
  }
  else {
    println("CLOSED!!!");
    return 'closed';
  }
}

function drawOpen(){
  background(50);
  var result = handleData();
  if(result!= 'closed'){
    text("DD Lab er ",windowWidth/2-textWidth("åbent")/2, windowHeight/2-tSize-tSize/2);
    fill(57,123,255);
    textAlign(RIGHT);
    text("åbent",windowWidth/2+textWidth("DD Lab er ")-textWidth("åbent")/2, windowHeight/2-tSize-tSize/2);
    textAlign(CENTER);
    fill(255);
    text(result + ' er på arbejde',windowWidth/2, windowHeight/2);
    text("Lukker kl " + events[0].getHour('end') + ":" + events[0].getMinute(), windowWidth/2, windowHeight/2+tSize+tSize/2);
    text("Næste åbningstid d. " + events[1].getDay('begin') +
     "/" +  events[1].getMonth('begin') +
      ", fra kl " + events[1].getHour('begin') + " til "
      + events[1].getHour('end')
      ,windowWidth/2, windowHeight/2+tSize*4);
  }
  else{
      var textPlacement = -2*tSize;
      text('DD Lab er ',windowWidth/2-textWidth("lukket")/2, windowHeight/2+textPlacement);
      fill(255,0,0);
      textAlign(RIGHT);
      text('lukket',windowWidth/2+textWidth("DD Lab er  ")-textWidth("lukket")/2, windowHeight/2+textPlacement);
      fill(255);
      textAlign(CENTER);
      textPlacement=textPlacement+tSize;
      textAlign(CENTER);
      for(var i = 0; i<3; i++){
        textPlacement=textPlacement+tSize;
        text("Lab'et har åbent d. " + events[i].getDay('begin') +
         "/" + events[i].getMonth('begin') +
          ", fra kl " +events[i].getHour('begin') +":"+ events[i].getMinute('begin') + " til "
          +events[i].getHour() +":"+ events[i].getMinute()
            ,windowWidth/2, windowHeight/2+textPlacement);
        textPlacement=textPlacement+tSize;
        text("ansatte på arbejde er "+ events[i].name,windowWidth/2, windowHeight/2+textPlacement);
        textPlacement=textPlacement+tSize;
      }
    }
}

function keyTyped() {
  if (key === 'a') {
    notInLab = notInLab+ timerIntervalMin*60*1000;
    millisPause = millis();
    lastPause = millisPause;
  }
  if (key == 's') {
    notInLab = 0;
    update();
    handleData();
  }
}
