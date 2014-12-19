/*
 * Base class for Enemy and Player classes
 */
var Character = function(x, width, height, row) {
    if(row === 1) {
        this.y = ENEMY_TOP_ROW_Y;
    } else if (row === 2) {
        this.y = ENEMY_MIDDLE_ROW_Y;
    } else if (row === 3) {
        this.y = ENEMY_BOTTOM_ROW_Y;
    } else {
        this.y = PLAYER_START_Y;
    }

    this.x = x;
    this.width = width;
    this.height = height;
    this.row = row;
};


/*
 * Enemy class, constants, and functions
 */
var ENEMY_TOP_ROW_Y = 62;
var ENEMY_MIDDLE_ROW_Y = 145;
var ENEMY_BOTTOM_ROW_Y = 230;
var ENEMY_START_POSITION = -100; // Enemies move from -100 through 500
var ENEMY_RESET_POSITION = 500;
var ENEMY_WIDTH = 98;
var ENEMY_HEIGHT = 64;
// Enemies our player must avoid
var Enemy = function(x, row, speed) {
    Character.call(this, x, ENEMY_WIDTH, ENEMY_HEIGHT, row);
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
    if (this.x >= ENEMY_RESET_POSITION) {
        this.x = ENEMY_START_POSITION;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



/*
 * Player class, constants, and functions
 */
var PLAYER_START_X = 200;
var PLAYER_START_Y = 412;
var PLAYER_WIDTH = 66;
var PLAYER_HEIGHT = 74;
var PLAYER_START_ROW = 5;
var PLAYER_START_LIVES = 5;
var PLAYER_START_SCORE = 0;
var Player = function() {
    Character.call(this, PLAYER_START_X, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_START_ROW);

    this.sprite = 'images/char-boy.png';
    this.xOffset = 19;
    this.verticalSpeed = 85;
    this.horizontalSpeed = 40;
    this.lives = PLAYER_START_LIVES;
    this.score = PLAYER_START_SCORE;
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.y < -13) {
        // Player reached goal and scores a point!
        this.score++;
        this.resetPosition();
    } else if (this.y >= PLAYER_START_Y) {
        // Player cannot leave playing surface to bottom
        this.y = PLAYER_START_Y;
    }
    // Player cannot leave playing surface to left or right
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
        if (this.row != PLAYER_START_ROW) {this.row++;}
    } else {}
};

Player.prototype.resetPosition = function() {
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    this.row = PLAYER_START_ROW;
};

Player.prototype.resetStats = function() {
    this.score = PLAYER_START_SCORE;
    this.lives = PLAYER_START_LIVES;
}

Player.prototype.reset = function() {
    this.resetPosition();
    this.resetStats();
};


/*
 * Bonus item base class for Gems and Hearts
 */


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = generateEnemies(3, 6);

function generateEnemies(min, max) {
    var enemies = [];
    var numEnemies = randomInteger(min, max);
    console.log(numEnemies);
    for (var i = 0; i < numEnemies; i++) {
        var enemyStartX = randomInteger(ENEMY_START_POSITION, ENEMY_RESET_POSITION);
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
