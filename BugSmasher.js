var canvas = document.getElementById("canvas");
var gameCtx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

var bug = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 80
};
var gameScore = 0;
var gameSpeed = 1000;
var gameIntervalId;
var gameIsClickable = true;

var bgImage = new Image();
bgImage.src = "leaf1.jpg";
var bugImage = new Image();
bugImage.src = "bug1r.png";

bgImage.onload = function () {
    gameCtx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    drawBug();
};

function drawBug() {
    gameCtx.clearRect(0, 0, canvas.width, canvas.height);
    gameCtx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    gameCtx.drawImage(bugImage, bug.x, bug.y, bug.size, bug.size);
}

function moveBug() {
    bug.x = Math.random() * (canvas.width - bug.size);
    bug.y = Math.random() * (canvas.height - bug.size);
    gameIsClickable = true;
    drawBug();
}

function updateGame() {
    gameScore++;
    document.getElementById("gameScore").textContent = gameScore;
    clearInterval(gameIntervalId);
    gameSpeed = Math.max(100, gameSpeed - 50);
    gameIntervalId = setInterval(moveBug, gameSpeed);
}

canvas.addEventListener("click", function (event) {
    if (!gameIsClickable) return;

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (x >= bug.x && x <= (bug.x + bug.size) && y >= bug.y && y <= (bug.y + bug.size)) {
        gameIsClickable = false;
        updateGame();
        moveBug();
    }
});

document.getElementById("resetScoreBtn").addEventListener("click", function () {
    gameScore = 0;
    document.getElementById("gameScore").textContent = gameScore;
    resetGameSpeed();
});

document.getElementById("resetSpeedBtn").addEventListener("click", resetGameSpeed);

function resetGameSpeed() {
    clearInterval(gameIntervalId);
    gameSpeed = 1000;
    gameIntervalId = setInterval(moveBug, gameSpeed);
}

gameIntervalId = setInterval(moveBug, gameSpeed);