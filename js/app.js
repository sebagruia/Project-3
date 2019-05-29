// Enemies our player must avoid

class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        //        this.sprite = 'images/enemy-bug.png';
        this.sprite = ['images/enemy-bug.png'];

    }


    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        let yPosition = [60, 140, 220]; // different y positions that can be used
        let yNewPosition = [];
        let curentIndex = yPosition.length;
        if (this.x >= 0) {
            this.x += this.speed * dt;
            if (this.x > 505) {
                this.x = 0;
                // generating random y position for the enemy
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
    constructor([x = 202, y = 575] = []) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-cat-girl.png';
    }


    update(dt) {
        const eatenAlive = document.querySelector('.eatenalive_counter');
        // collision algoritm and implementation of the "eatenAlive" counter
        for (const enemy of allEnemies) {
            if (this.x < (enemy.x + 50) && (this.x + 50) > enemy.x && this.y < (enemy.y + 40) && (this.y + 40) > enemy.y) {
                this.y = 575;
                this.x = 202;
                eatenAliveNumbr++;
                eatenAlive.innerHTML = `${eatenAliveNumbr}`;
            }

        }
    }

    // Draw the player on the screen, required method for game
    render(hero) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // A function for changing the hero character
    changeHero(hero) {
        this.sprite = hero;
    }


    //This deals with counting the Hero wins *****************
    countingVictory() {
        const surviveCount = document.querySelector('.survived_counter');
        victoryNumber++;
        surviveCount.innerHTML = `${victoryNumber}`;
        this.x = 202;
        this.y = 575;
    }

    //This deals with the movement of the Hero *****************
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
                if (this.y <= 78) {
                    this.countingVictory();
                } else {
                    this.y -= 83;
                };
                break;
            case 'down':
                if (this.y >= 575) {
                    this.y = 575;
                } else {
                    this.y += 83;
                }
                break;
        }
    }

    //This deals with the movement of the Hero on MOBILE *****************
    handleInputForMobile(){
        const controller = document.getElementById('controller');
        const clickUp = document.querySelector('.fa-arrow-alt-circle-up');
        const clickDown = document.querySelector('.fa-arrow-alt-circle-down');
        const clickLeft = document.querySelector('.fa-arrow-alt-circle-left');
        const clickRight = document.querySelector('.fa-arrow-alt-circle-right');
        const width = window.innerWidth;
        if(width<800){
            controller.classList.remove('hidden');
            clickUp.addEventListener('click', (e1)=>{
                if (this.y <= 78) {
                    this.countingVictory();
                } else {
                    this.y -= 83;
                }
            });

            clickDown.addEventListener('click', (ev2)=>{
                if (this.y >= 575) {
                    this.y = 575;
                } else {
                    this.y += 83;
                }
            });

            clickLeft.addEventListener('click',(ev3)=>{
                if (this.x <= 0) {
                    this.x = 0;
                } else {
                    this.x -= 101;
                }
            });

            clickRight.addEventListener('click', (ev4)=>{
                if (this.x >= 404) {
                    this.x = 404;
                } else {
                    this.x += 101;
                }
            });

        }

    }

}

//This function selects different Heros *****************
function selectHero() {
    const imageHero = document.querySelector('.image-hero');
    const selectLeft = document.querySelector('.fa-caret-left');
    const selectRight = document.querySelector('.fa-caret-right');
    const selector = document.querySelector('.image-hero');
    const heroSelectBox = document.querySelector('.hero_select_box');
    const selectH4Text = document.getElementById('selector');
    const canvas = document.getElementsByTagName('canvas');
    const canvasContainer = document.createElement('div');
    document.body.appendChild(canvasContainer);
    canvasContainer.appendChild(canvas[0]);
    const controller = document.getElementById('controller');
    canvasContainer.appendChild(controller);
    controller.classList.add('hidden');
    canvasContainer.classList.add('hidden', 'canvasContainer');
    const score = document.getElementById('score');
    let selectedHero = 'images/char-cat-girl.png';
    const heroes = ['images/char-boy.png',
        'images/char-horn-girl.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    let j = 2;

    selectLeft.addEventListener('click', (ev1) => {
        if (j > 0) {
            imageHero.innerHTML = `<img src="${heroes[j-1]}">`;
            j--;
        }
        selectedHero = heroes[j];
    });


    selectRight.addEventListener('click', (ev2) => {
        if (j <= 3) {
            imageHero.innerHTML = `<img src="${heroes[j+1]}">`;
            j++;
        }
        selectedHero = heroes[j];
    });

    selector.addEventListener('click', (ev) => {
        heroSelectBox.classList.add('hidden');
        selectH4Text.classList.add('hidden');
        score.classList.add('visible');
        canvasContainer.classList.remove('hidden');
        player.changeHero(selectedHero);
        player.render();
    });

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
// const speeds = [150, 200, 450]; // different values for speed, that enemies can use
const speeds = [0, 0, 0]; // different values for speed, that enemies can use
let victoryNumber = 0;
let eatenAliveNumbr = 0;
let randomSpeedGenerator = (array) => { // a function that generates random speeds 
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
selectHero();
player.handleInputForMobile();
document.addEventListener('keyup', (e) => {
    //    console.log(e);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});