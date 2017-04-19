var openData;
var openNext = [];
var min;

function setup() {
  loadJSON('https://script.googleusercontent.com/macros/echo?user_content_key=ZOk4S3iYBmLoCSVEYTVn6jZX3Fz-Y0oDKxVEMBBz0hsaTlJgxjhypDtgykm4fEIynfmyFfA0uyg2c44x2MHVCTuVgThqk23hm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDRtrHJ_B07pTY_RGQB9NgIlvQFo4AEb7AWNFWyMdXAla4PE5KW5lkb1btx4KUrnXmlgLNiGRXNx&lib=MLZpv_I1oO55YzaOvgVD5WaTNt6qxM66-', getData);
  createCanvas(screen.width,screen.height);
  textSize(32);
  textAlign(CENTER);
}

function update(){
  loadJSON('https://script.googleusercontent.com/macros/echo?user_content_key=ZOk4S3iYBmLoCSVEYTVn6jZX3Fz-Y0oDKxVEMBBz0hsaTlJgxjhypDtgykm4fEIynfmyFfA0uyg2c44x2MHVCTuVgThqk23hm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDRtrHJ_B07pTY_RGQB9NgIlvQFo4AEb7AWNFWyMdXAla4PE5KW5lkb1btx4KUrnXmlgLNiGRXNx&lib=MLZpv_I1oO55YzaOvgVD5WaTNt6qxM66-', getData);
}

function getData(data) {
  openData = data;
}

function draw() {
  if(openData){
    background(255);
    var result = handleData();
    switch (result) {
      case 'Niels':
        text('Niels open!',screen.width/2, screen.height/2);
        break;
      case 'Ann':
        text('Ann open!',screen.width/2, screen.height/2);
        break;
      case 'Nikolaj':
        text('Nikolaj open!',screen.width/2, screen.height/2);
        break;
      case 'Closed':
        text('Closed',screen.width/2, screen.height/2);
        for(var i = 0; i<3; i++){
          print("Lab'et åbner næste gang: " + openData.items[openNext[i]].start.dateTime);
          print("ansatte på arbejde er "+ openData.items[openNext[i]].summary);
        }
        break;
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
