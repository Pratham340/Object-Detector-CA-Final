video = "";
status = "";
object=[];
function setup() {
    canvas = createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("cocossd Loaded");
    status=true;
}

function preload() {
    img = loadImage("dog_cat.jpg");
}

function draw() {
    image(video, 0, 0, 400, 400);
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for (i=0; i < object.length; i++) {
            document.getElementById("no_of_objects").innerHTML="No.of Objects Detected Are: "+object.length;
            document.getElementById("status").innerHTML="Status: Object Detected";
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x , object[i].y , object[i].width , object[i].height);
        }
    }
}
function gotResult(error,results) {
if(results){
    console.log(results);
    object=results;
}
else{
    console.log(error);
}
}