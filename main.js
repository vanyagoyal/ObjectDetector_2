status = "";
img = "";
objects = [];

function preload(){
    img = loadImage("clock.jpg");
}

function setup(){
    canvas = createCanvas(400 , 400);
    canvas.parent("clock_div");
    obj_detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status :- Detecting Objects";
}

function draw(){
    image(img , 0 , 0 , 400 , 400);
    if (status != ""){
        obj_detector.detect(img , gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status :- Objects Detected";
            document.getElementById("number").innerHTML = "Number Of Objects Detected :- " + objects.length;
            fill("#ff0000");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%" , objects[i].x + 15 , objects[i].y);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("COCO SSD MODEL LOADED!!");
    status = true;
}

function gotResult(error , result){
    if (error) {
        console.error(error);
    }
    console.log(result);
    objects = result;
}