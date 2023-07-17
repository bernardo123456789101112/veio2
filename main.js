leftX=0
leftY=0;
rightX=0;
rightY=0;
som="";
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
   som = loadSound("music.mp3")
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    }
    function modelLoaded(){
        console.log('PoseNet is Initialized');
}
function draw(){
image(video, 0, 0, 600, 500);
fill("#FF0000");
stroke("#FF0000");
if(scoreLeftWrist>0.2){
    circle(leftX,leftY,20);
InNumberleftwristY= Number(leftY);
romove_decimals = floor(InNumberleftwristY);
volume = romove_decimals/500;
document.getElementById("volume").innerHTML = "Volume = "+volume;
som.setVolume(volume);
if(scoreRightWrist>0.2){
    circle(rightX,rightY,20);
    if(rightY>0 && rightY <=100){
        document.getElementById("speed").innerHTML="Velocidade = 0,5x";
        som.rate(0.5);
    }
    else if(rightY>100 && rightY <=200){
        document.getElementById("speed").innerHTML="Velocidade = 1x";
        som.rate(1);
    }
    else if(rightY>200 && rightY <=300){
        document.getElementById("speed").innerHTML="Velocidade = 1.5x";
        som.rate(1.5);
    }
    else if(rightY>300 && rightY <=400){
        document.getElementById("speed").innerHTML="Velocidade = 2x";
        som.rate(2);
    }
    else if(rightY>400){
        document.getElementById("speed").innerHTML="Velocidade = 2.5x";
        som.rate(2.5);
    }
}

}

}
function play(){
    som.play();
    som.setVolume(1);
    som.rate(1);
    
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreRightWrist= results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist ="+ scoreLeftWrist+"scoreRightWrist = " + scoreRightWrist);

    leftX=results[0].pose.leftWrist.x;
    leftY=results[0].pose.leftWrist.y;
    console.log("leftX ="+leftX+"leftY ="+ leftY);

    rightX=results[0].pose.rightWrist.x;
    rightY=results[0].pose.rightWrist.y;
    console.log("rightX ="+rightX+"rightY ="+ rightY);
}
else{
    console.log('Não tem niguem na frente da camera!!!!!');
}
}