var openData;
var min;
var tSize;
// var ddImg;
// var labRat;

var millisJSON;
var lastTime;
var loadInterval = 30000;

var notInLab;
var timerIntervalMin = 5;
var millisPause;
var lastPause;
var waitForData = 0;

var mgr;

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
  // textSize(32);
  textAlign(CENTER);
  textSize(tSize);
  background(50);
  text("Henter JSON", windowWidth/2, windowHeight/2);

  millisJSON = millis();
  millisPause = millis();
  lastTime = millisJSON;
  notInLab = 0;
  frameRate(1);
  mgr = new SceneManager();

  mgr.addScene ( Logo );
  mgr.addScene ( Info );
  mgr.addScene ( Open );
  mgr.addScene ( Access );

  setInterval(function(){
    mgr.showNextScene();
    //mgr.showScene(Open);
    println("next scene!");
  }, 5000);
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
  basicBG();
  mgr.draw();
}

function basicBG(){
  background(50);
  fill(255);
  textSize(tSize/2);
  textAlign(RIGHT);
  text("ddlab logo placeholder", windowWidth-2 ,tSize/2);
  textAlign(CENTER);
  textSize(tSize);
  text("Åbningstider: Man: 10-17, Tirs: 9-16, Ons: 10-17, fre: 9-16:00", windowWidth/2,windowHeight-tSize);
}

function Logo(){
  this.draw = function(){
    textAlign(CENTER);
    textSize(tSize*2);
    fill(255);
    text("Velkommen til", windowWidth/2, windowHeight/2- 2* tSize);
    textSize(tSize*4);
    textAlign(CENTER);
    text("DD Lab", windowWidth/2, windowHeight/2 + 2 * tSize);

  }
}

function Info(){
  this.draw = function(){
    textSize(tSize*2);
    fill(255);
    textAlign(CENTER);
    text("Døren til DD Lab må ikke stå åben \nuden for åbningstiderne, \npå grund af alarmen.",
    windowWidth/2 , windowHeight/2 - tSize*2);
  }
}

function Open(){
  this.draw = function(){
    println("Open");
    fill(255);

    if(waitForData != 0){
      drawOpen();
    }
    millisJSON = millis();
    if(millisJSON>lastTime+loadInterval){
      update();
      lastTime = millisJSON;
    }
  }
}

function Access(){
  this.draw = function(){
    textSize(tSize*2);
    fill(255);
    textAlign(LEFT);
    text("Sådan bliver du 24/7 bruger af DD Lab", tSize*2, tSize*4);
    textSize(tSize);
    //textAlign(CENTER);
    text("Hvis du/I har et projekt, det være sig bachelor-, eksamens- (kandidat), speciale- e.lign. og ønsker 24-7 adgang til lab´et, så send en kort beskrivelse af projektet, den periode det løber i samt en kort beskrivelse af din/jeres tilknytning til universitetet.\nDu kan altid anvende lab’et indenfor dets åbningstid. \n\nAnsøgningen sendes til: \nRasmus Lunding, rasl@cc.au.dk",
    /*windowWidth/2*/tSize*2 , windowHeight/2 - tSize*2, windowWidth-tSize*4);
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
  basicBG();
  textSize(tSize*2);
  var result = handleData();
  if(result!= 'closed'){
    textAlign(CENTER);
    text("DD Lab er ",windowWidth/2-textWidth("åbent")/2, windowHeight/2-tSize*2.5);
    fill(57,123,255);
    textAlign(RIGHT);
    text("åbent",windowWidth/2+textWidth("DD Lab er ")-textWidth("åbent")/2, windowHeight/2-tSize*2.5);
    textAlign(CENTER);
    fill(255);
    text(result + ' er på arbejde',windowWidth/2, windowHeight/2);
    text("Lukker kl " + events[0].getHour('end') + ":" + events[0].getMinute(), windowWidth/2, windowHeight/2+tSize*2.5);
    /*text("Næste åbningstid d. " + events[1].getDay('begin') +
     "/" +  events[1].getMonth('begin') +
      ", fra kl " + events[1].getHour('begin') + " til "
      + events[1].getHour('end')
      ,windowWidth/2, windowHeight/2+tSize*4);*/
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
