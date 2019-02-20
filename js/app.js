// Enemies our player must avoid

class Enemy {
    constructor(x, y, speed, delay) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.delay = delay;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }


    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        let yPosition = [60, 140, 220];
        let yNewPosition = [];
        let curentIndex = yPosition.length;
        if (this.x >= 0) {
            this.x += this.speed * dt;
            if (this.x > 505) {
                this.x = 0;
                for (let i = 0; i < yPosition.length; i++) {
                    const randomNumber = Math.floor(Math.random() * curentIndex);
                    yNewPosition.push(yPosition[randomNumber]);
                    yPosition[i] = yNewPosition[i];
                }
                yNewPosition = [];
                this.y = yPosition[0];
            }
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor([x = 202, y = 404] = []) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-horn-girl.png';
    }


    update(dt) {
const eatenAlive = document.querySelector('.eatenalive_counter');
        
        for (const enemy of allEnemies) {
            if (this.x < (enemy.x + 50) && (this.x + 50) > enemy.x && this.y < (enemy.y + 40) && (this.y + 40) > enemy.y) {
                this.y = 404;
                this.x = 202;
                eatenAliveNumbr++;
                eatenAlive.innerHTML = `${eatenAliveNumbr}`;
               }
            
        }


    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

    countingVictory() {
        const surviveCount = document.querySelector('.survived_counter');
        victoryNumber++;
        surviveCount.innerHTML = `${victoryNumber}`;
        this.x = 202;
        this.y = 404;
    }


    handleInput(direction) {

        switch (direction) {

            case 'left':
                if (this.x <= 0) {
                    this.x = 0;
                } else {
                    this.x -= 101;
                }
                break;
            case 'right':
                if (this.x >= 404) {
                    this.x = 404;
                } else {
                    this.x += 101;
                };
                break;
            case 'up':
                if (this.y <= 72) {
                    this.countingVictory();

                } else {
                    this.y -= 83;
                };
                break;
            case 'down':
                if (this.y >= 404) {
                    this.y = 404;
                } else {
                    this.y += 83;
                }
                break;
        }
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const speeds = [150, 200, 450];
let victoryNumber = 0;
let eatenAliveNumbr = 0;
let randomSpeedGenerator = function (array) {
    const randomNumber = Math.floor((Math.random() * array.length) + 1);
    return array[randomNumber - 1];
};



const player = new Player();
const enemy1 = new Enemy(0, 60, randomSpeedGenerator(speeds));
const enemy2 = new Enemy(101, 140, randomSpeedGenerator(speeds));
const enemy3 = new Enemy(101, 220, randomSpeedGenerator(speeds));
const enemy4 = new Enemy(0, 220, randomSpeedGenerator(speeds));
allEnemies.push(enemy1, enemy2, enemy3, enemy4);







// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    //    console.log(e);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    //    player.countingVictory();


});