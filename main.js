song="";

LeftwristX=0;
LeftwristY=0;
RightwristX=0;
RightwristY=0;
ScoreLeftWrist=0;
ScoreRightWrist=0;
LeftWristChanged=0;

function setup(){
    canvas=createCanvas(1000, 800);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelloaded);
    poseNet.on('pose', getposes);

}

function modelloaded(){
    console.log("Model is Loaded");

}

function getposes(results){
if (results.length >0){
    console.log(results);

    LeftwristX=results[0].pose.leftWrist.x;
    LeftwristY=results[0].pose.leftWrist.y;
    RightwristX=results[0].pose.rightWrist.x;
    RightwristY=results[0].pose.rightWrist.y;
    ScoreLeftWrist=results[0].pose.keypoints[9].score;
    ScoreRightWrist=results[0].pose.keypoints[10].score;
}

}



function draw(){
    image(video,0,0, 1000, 800);

   fill("aquamarine");
   stroke("aquamarine");

   if(ScoreLeftWrist>0.2){
   circle(LeftwristX+200, LeftwristY+150, 30);
   LeftWristChanged=Number(LeftwristY);
   LWWholeNumber=floor(LeftWristChanged);
   volume = (LWWholeNumber/800).toFixed(3);
   actual_volume= (1-volume).toFixed(3);

   document.getElementById("VolumeLabel").innerHTML="Volume = "+actual_volume;
   song.setVolume(actual_volume);

}


if(ScoreRightWrist>0.2){
    circle(RightwristX+50,RightwristY+100, 30);
    if(RightwristY>0 && RightwristY<=160){
document.getElementById("SpeedLabel").innerHTML="Speed = 0.5"
song.rate(0.5);
    }
    else if(RightwristY>160 && RightwristY<=320){
        document.getElementById("SpeedLabel").innerHTML="Speed = 1"
        song.rate(1);
            }
            else if(RightwristY>320 && RightwristY<=480){
                document.getElementById("SpeedLabel").innerHTML="Speed = 1.5"
                song.rate(1.5);
                    }
                    else if(RightwristY>480 && RightwristY<=640){
                        document.getElementById("SpeedLabel").innerHTML="Speed = 3"
                        song.rate(3);
                            }
                            else if(RightwristY>640 && RightwristY<=800){
                                document.getElementById("SpeedLabel").innerHTML="Speed = 2.5"
                                song.rate(2.5);
                                    }
    
 }
}

function preload(){
song=loadSound("Stay.mp3");

}

function PlaySound(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function StopSound(){
    song.stop();
}