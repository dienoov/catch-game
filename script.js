const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pressed = {
    left: false,
    right: false,
};

canvas.height = 700;
canvas.width = 500;

const basket = {
    x: (canvas.width - 100) / 2,
    y: canvas.height - 100,
    height: 100,
    width: 100,
    draw: function () {
        // ctx.beginPath();
        ctx.drawImage(document.getElementById("basket"), this.x, this.y, this.height, this.width);
        // ctx.rect(this.x, this.y, this.width, this.height);
        // ctx.fill();
        // ctx.closePath();
    },
};

const scoreBoard = {
    x: 10,
    y: 25,
    score: 0,
    draw: function () {
        ctx.font = "24px Hack";
        ctx.fillStyle = "white";
        ctx.fillText(this.score, this.x, this.y);
    },
};

function Stuff(image, score) {
    this.x = Math.floor(Math.random() * 475) + 1;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.score = score;
    this.draw = function () {
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
        // ctx.beginPath();
        // ctx.fillStyle = fillStyle;
        // ctx.rect(this.x, this.y, this.width, this.height);
        // ctx.fill();
        // ctx.closePath();
    };
};

const stuff = [
    new Stuff(document.getElementById("burger"), 5),
    new Stuff(document.getElementById("cookies"), 2),
    new Stuff(document.getElementById("waste"), -2),
];

let fallingStuff = stuff[Math.floor(Math.random() * 3)];
;

document.addEventListener("keydown", ev => {
    pressed.left = (ev.key == "Left" || ev.key == "ArrowLeft");
    pressed.right = (ev.key == "Right" || ev.key == "ArrowRight");
});

document.addEventListener("keyup", ev => {
    pressed.left = false;
    pressed.right = false;
});

const moveBasket = () => {
    if (pressed.left && basket.x > 0)
        basket.x -= 5;
    else if (pressed.right && basket.x + basket.width < canvas.width)
        basket.x += 5;
};

let speed = 5;

const increaseSpeed = () => {
    speed = Math.floor(scoreBoard.score / 10) + 5;
};

const resetStuff = () => {
    fallingStuff = stuff[Math.floor(Math.random() * 3)];
    fallingStuff.x = Math.floor(Math.random() * 475) + 1;
    fallingStuff.y = 0;
    increaseSpeed();
};

const generateStuff = () => {
    if (fallingStuff.y > basket.y && fallingStuff.x >= basket.x && fallingStuff.x + fallingStuff.width <= basket.x + basket.width) {
        scoreBoard.score += fallingStuff.score;
        resetStuff();
    } else if (fallingStuff.y > canvas.height) {
        scoreBoard.score -= fallingStuff.score;
        resetStuff();
    }
};

setTimeout(() => {
    alert(`Your Score : ${scoreBoard.score}`);
    const highscore = localStorage.getItem("highscore") ?? 0;
    console.log(highscore)
    console.log(scoreBoard.score)
    if (highscore < scoreBoard.score) {
        localStorage.setItem("highscore", scoreBoard.score);
    }
    location.reload();
}, 60000)

const play = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    generateStuff();

    fallingStuff.draw();
    fallingStuff.y += speed;

    basket.draw();

    scoreBoard.draw();

    moveBasket();

    requestAnimationFrame(play);
};

const highscore = document.getElementById("highscore");
highscore.innerHTML = `High Score : ${localStorage.getItem("highscore")}`;

play();