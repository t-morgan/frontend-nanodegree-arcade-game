var Character = function(x, width, height, row) {
    if(row === 1) {
        this.y = enemyTopRowY;
    } else if (row === 2) {
        this.y = enemyMiddleRowY;
    } else if (row === 3) {
        this.y = enemyBottomRowY;
    } else {
        this.y = playerStartY;
    }

    this.x = x;
    this.width = width;
    this.height = height;
    this.row = row;
};

var enemyTopRowY = 62;
var enemyMiddleRowY = 145;
var enemyBottomRowY = 230;
var enemyStartPosition = -100; // Enemies move from -100 through 500
var enemyResetPosition = 500;
var enemyWidth = 98;
var enemyHeight = 64;
// Enemies our player must avoid
var Enemy = function(x, row, speed) {
    Character.call(this, x, enemyWidth, enemyHeight, row);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xOffset = 4;
    this.speed = speed;
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

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
var playerWidth = 66;
var playerHeight = 74;
var playerStartRow = 5;
var playerStartLives = 5;
var playerStartScore = 0;
var Player = function() {
    Character.call(this, playerStartX, playerWidth, playerHeight, playerStartRow);

    this.sprite = 'images/char-boy.png';
    this.xOffset = 19;
    this.verticalSpeed = 85;
    this.horizontalSpeed = 40;
    this.lives = playerStartLives;
    this.score = playerStartScore;
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.y < -13) {
        this.score++;
        updateScore(this.score);
        this.resetPlayer();
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
        this.row--;
    } else if (direction === 'right') {
        this.x += this.horizontalSpeed;
    } else if (direction === 'down') {
        this.y += this.verticalSpeed;
        if (this.row != playerStartRow) {this.row++;}
    } else {}
};

Player.prototype.resetPlayer = function() {
    player.x = playerStartX;
    player.y = playerStartY;
    player.row = playerStartRow;
};

function updateScore(score) {
    document.getElementById("score").innerHTML = score;
}

function updateLives(lives) {
    document.getElementById("lives").innerHTML = lives;
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
        var enemyStartX = randomInteger(enemyStartPosition, enemyResetPosition);
        var enemyRow = randomInteger(1, 4);
        var enemySpeed = randomInteger(10, 61);
        console.log(enemyRow);
        enemies.push(new Enemy(enemyStartX, enemyRow, enemySpeed));
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
