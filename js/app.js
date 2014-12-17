
var enemyTopRow = 62;
var enemyMiddleRow = 145;
var enemyBottomRow = 230;
var enemyStartPosition = -100;
var enemyResetPosition = 500;
// Enemies our player must avoid
var Enemy = function(speed, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = enemyStartPosition; // Enemies move from -100 through 500

    if(row === 1) {
        this.y = enemyTopRow;
    } else if (row === 2) {
        this.y = enemyMiddleRow;
    } else {
        this.y = enemyBottomRow;
    }
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x >= enemyResetPosition) {
        this.x = enemyStartPosition;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var playerStartX = 200;
var playerStartY = 412;
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = playerStartX;
    this.y = playerStartY;
    this.verticalSpeed = 85;
    this.horizontalSpeed = 40;
    this.score = 0;
};

Player.prototype.update = function() {
    if (this.y < -13) {
        this.score++;
        this.resetPosition();
        updateScore(this.score);
    } else if (this.y >= playerStartY) {
        this.y = playerStartY;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 400) {
        this.x = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        this.x -= this.horizontalSpeed;
    } else if (direction === 'up') {
        this.y -= this.verticalSpeed;
    } else if (direction === 'right') {
        this.x += this.horizontalSpeed;
    } else if (direction === 'down') {
        this.y += this.verticalSpeed;
    } else {}
    console.log("X: " + this.x);
    console.log("Y: " + this.y);
};

Player.prototype.resetPosition = function() {
    player.x = playerStartX;
    player.y = playerStartY;
};

function updateScore(score) {
    var scoreSpan = document.getElementById("score");
    scoreSpan.innerHTML = score;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = generateEnemies(3, 6);

function generateEnemies(min, max) {
    var enemies = [];
    var numEnemies = randomInteger(min, max);
    console.log(numEnemies);
    for (var i = 0; i < numEnemies; i++) {
        var enemySpeed = randomInteger(10, 61);
        var enemyRow = randomInteger(1, 4);
        console.log(enemyRow);
        enemies.push(new Enemy(enemySpeed, enemyRow));
    }
    return enemies;
}

// Return a random integer between min and max (exclusive)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var player = new Player();

// Prevent browser window scrolling when using arrow keys
window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
