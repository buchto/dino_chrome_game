const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 250;

context.globalCompositeOperation = 'destination-over';

const dinoImg = new Image();
dinoImg.src = "images/dino.png";

setInterval(() => {
  dinoImg.src = "images/dino.png";
}, 100);

let dino = {
  x: 30,
  y: 105,
  w: 50,
  h: 55,
};

const cactus1Img = new Image();
cactus1Img.src = "images/cactus.png";

let cactus1 = {
  x: getRandomInt(400, 500),
  y: 167,
  w: 30,
  h: 55,
};

const cactus2Img = new Image();
cactus2Img.src = "images/cactus.png"; 

let cactus2 = {
  x: getRandomInt(600, 700),
  y: 167,
  w: 50,
  h: 55,
};

let cactusSpeed = 4;

// render random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function game() {
  update();
  render();
  requestAnimationFrame(game);
}
requestAnimationFrame(game);

function moveCactuses() {
  cactus1.x -= cactusSpeed;
  cactus2.x -= cactusSpeed;

  if ((cactus2.x - cactus1.x <= 200) && cactus2.x > cactus1.x) {
    cactus2.x += 200;
  } else if ((cactus1.x - cactus2.x <= 200) && cactus1.x > cactus2.x) {
    cactus1.x += 200; 
  }

  if (cactus1.x <= -20) {
    cactus1.x = getRandomInt(600, 1000);
  } else if (cactus2.x <= -20) {
    cactus2.x = getRandomInt(600, 1400);
  }
}

//dino jump
let isJumping = false;

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32 && dino.y === 165) {
    isJumping = true;
  }
});

function dinoJump() {
  if (isJumping === true) {
    dino.y -= 13;

    setTimeout(() => {
      isJumping = false;
    }, 200);
  }

  if (dino.y != 165) {
    dinoImg.src = "images/dino.png";
  }
}

function dinoMove() {
  dino.y += 4;
  if (dino.y >= 165) dino.y = 165;

  dinoJump();
}

//colision
function gameOver() {
  if (
    cactus1.x <= dino.x + dino.w - 25 &&
    cactus1.y <= dino.y + dino.h - 25
  ) {
    location.reload();
  }
}

function update() {
  moveCactuses();
  dinoMove();
  gameOver();
  checkScore();
}

//score
let score = 0;
let scoreSpeed = 0;

setInterval(() => {
  score++;
}, 200);

setInterval(() => {
  scoreSpeed++;
}, 200);

function checkScore() {
  if (scoreSpeed >= 100) {
    cactusSpeed++;
    scoreSpeed = 0;
  }
}

//cactus draw
function renderCactuses() {
  context.drawImage(cactus1Img, cactus1.x, cactus1.y, cactus1.w, cactus1.h);
  context.drawImage(cactus2Img, cactus2.x, cactus2.y, cactus2.w, cactus2.h);
}

function renderDino() {
  context.drawImage(dinoImg, dino.x, dino.y, dino.w, dino.h);
}

function renderScore() {
  context.font = "25px Times New Roman"; 
  context.fillStyle = "#656565";
  context.fillText(score, 550, 40);
}

//game render
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  renderDino();
  renderCactuses();
  renderScore();
  context.closePath();
}
