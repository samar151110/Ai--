song_1 = "";
song_2 = "";
left_wrist_y = 0;
left_wrist_x = 0;
right_wrist_x = 0;
right_wrist_y = 0;
score_of_right = 0;
score_of_left = 0;
song1_status = "";
song2_status = "";


function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, model);
    posenet.on("pose", gotPoses);
}

function model() {
    console.log("model is loaded");
}

function gotPoses(results) {

    console.log(results);
    if (results > 0) {
        left_wrist_x = results[0].pose.leftwrist.x;
        left_wrist_y = results[0].pose.leftwrist.x;
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        score1 = results[0].pose.keypoints[9].score;
        console.log(score1);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("blue");

    if (score_of_right > 0.2) {
        circle(right_wrist_x, right_wrist_y, 20);
        song_2.stop();

        if (song2_status == false) {
            song_1.play();
            document.getElementById("song_name").innerHTML = "Song name : Playing harry potter theme";
        }
    }

    if (score_of_left > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        song_1.stop();
    
        if (song1_status == false) {
            song_2.play();
            document.getElementById("song_name").innerHTML = "Song name : Playing peter pan theme";
        }
        
    }
}


