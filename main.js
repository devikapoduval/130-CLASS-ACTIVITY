song = ""
leftwristX = ""
leftwristY = ""
rightwristX = ""
rightwristY = ""
scoreLeftWrist = ""
function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 475);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide()
    video.size(600, 475)
    poseNet = ml5.poseNet(video, modelloaded)
    poseNet.on('pose', gotPoses)
}

function modelloaded() {
    console.log("Posenet is Intialized")
}


function draw() {
    image(video, 0, 0, 600, 475)
    fill("#B76B79")
    stroke("#B76B79")
    circle(leftwristX, leftwristY, 40)
    InNumberLeftWristY = Number(leftwristY)
    remove_decimals = floor(InNumberLeftWristY)
    volume = remove_decimals / 475
    document.getElementById("volume").innerHTML = "Volume =  " + volume
    song.setVolume(volume)

    fill("#3EB489")
    stroke("#3EB489")
    circle(rightwristX, rightwristY, 40)

    if (rightwristY > 0 && rightwristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed=0.5x"
        song.rate(0.5)
    }

    else if (rightwristY > 100 && rightwristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed=1x"
        song.rate(1)
    }

    else if (rightwristY > 200 && rightwristY <= 300) {
        document.getElementById("speed").innerHTML = "Speed=1.5x"
        song.rate(1.5)
    }

    else if (rightwristY > 300 && rightwristY <= 400) {
        document.getElementById("speed").innerHTML = "Speed=2x"
        song.rate(2)
    }

    else if (rightwristY > 400 && rightwristY <= 500) {
        document.getElementById("speed").innerHTML = "Speed=2.5x"
        song.rate(2.5)
    }
}


function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        scoreLeftWrist = result[0].pose.keypoints[9].score
        console.log("Score Left Wrist= " + scoreLeftWrist)
        leftwristY = result[0].pose.leftWrist.y
        leftwristX = result[0].pose.leftWrist.x
        rightwristY = result[0].pose.rightWrist.y
        rightwristX = result[0].pose.rightWrist.x
        console.log("leftWristX= " + leftwristX)
        console.log("leftWristY= " + leftwristY)
        console.log("rightWristX= " + rightwristX)
        console.log("rightWristY= " + rightwristY)
    }
}