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
        let yPosition = [60, 140, 220, 316, 390, 485]; // different y positions that can be used
        let yNewPosition = [];
        let curentIndex = yPosition.length;
        if (this.x >= 0) {
            this.x += this.speed * dt;
            if (this.x > 707) {
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
    constructor([x = 303, y = 575] = []) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-cat-girl.png';
    }



    update(dt) {
        const lives = document.querySelector('.lives');
        // collision algoritm and implementation of the "Lives counter"
        for (const enemy of allEnemies) {
            if (this.x < (enemy.x + 50) && (this.x + 50) > enemy.x && this.y < (enemy.y + 40) && (this.y + 40) > enemy.y) {
                this.y = 575;
                this.x = 303;
                if (livesNumber > 0) {
                    livesNumber--;
                }

                if (livesNumber === 0) {
                    this.restartGame();
                    // livesNumber=3;
                    // sets the speed of the enemy to 0
                    for (const enemy of allEnemies) {
                        enemy.speed = 0;
                    }
                }
                lives.innerHTML = `${livesNumber}`;
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
    setPlayerToInitialPosition = ()=>{
        this.x = 303;
        this.y = 575;
    }
    //This function restarts DISPLAYING the Selection Hero Page again *****************
    restartGame = () => {
        const gameOver = document.getElementById('game-over');
        gameOver.classList.add('reveal');
        const restartGame = document.querySelector('.restart-game');
        const canvasContainer = document.querySelector('.canvasContainer');
        const score = document.getElementById('score');
        const heroSelectBox = document.querySelector('.hero_select_box');
        const lives = document.querySelector('.lives');
        const scoreCount = document.querySelector('.score_counter');
        restartGame.addEventListener('click', () => {
            canvasContainer.classList.add('hidden');
            score.classList.add('not-visible');
            score.classList.remove('visible');
            gameOver.classList.remove('reveal');
            heroSelectBox.classList.remove('hidden');
            // resets the speed of the enemy to the default value level "Easy"
            for (const enemy of allEnemies) {
                enemy.speed = randomSpeedGenerator(speeds);
            }
            // resets the "Lives Counter" to equal 3
            livesNumber = 3;
            lives.innerHTML = livesNumber;
            // resets the "Score Counter" to equal 0
            this.resetCountingVictory();
            scoreCount.innerHTML = 0;
            this.setPlayerToInitialPosition();

        });
    }


    //This deals with counting the Hero wins *****************
    countingVictory() {
        const scoreCount = document.querySelector('.score_counter');
        if (livesNumber > 0) {
            victoryNumber += 100;
        }
        scoreCount.innerHTML = `${victoryNumber}`;
        this.x = 303;
        this.y = 575;
    }

    resetCountingVictory = () => {
        victoryNumber = 0;
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
                if (this.x >= 606) {
                    this.x = 606;
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
    handleInputForMobile() {
        const controller = document.getElementById('controller');
        const clickUp = document.querySelector('.fa-arrow-alt-circle-up');
        const clickDown = document.querySelector('.fa-arrow-alt-circle-down');
        const clickLeft = document.querySelector('.fa-arrow-alt-circle-left');
        const clickRight = document.querySelector('.fa-arrow-alt-circle-right');
        const width = window.innerWidth;
        if (width <= 800) {
            controller.classList.remove('hidden');
            clickUp.addEventListener('click', () => {
                if (this.y <= 78) {
                    this.countingVictory();
                } else {
                    this.y -= 83;
                }
            });

            clickDown.addEventListener('click', () => {
                if (this.y >= 575) {
                    this.y = 575;
                } else {
                    this.y += 83;
                }
            });

            clickLeft.addEventListener('click', () => {
                if (this.x <= 0) {
                    this.x = 0;
                } else {
                    this.x -= 101;
                }
            });

            clickRight.addEventListener('click', () => {
                if (this.x >= 606) {
                    this.x = 606;
                } else {
                    this.x += 101;
                }
            });

        }

    }

}
//==============End of Player Class======================



//This function selects different Heros *****************
const selectHero = () => {
    const imageHero = document.querySelector('.image-hero');
    const selectLeft = document.querySelector('.fa-caret-left');
    const selectRight = document.querySelector('.fa-caret-right');
    const selector = document.getElementById('selector');
    const heroSelectBox = document.querySelector('.hero_select_box');
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
            imageHero.innerHTML = `<img src="${heroes[j - 1]}">`;
            j--;
        }
        selectedHero = heroes[j];
    });


    selectRight.addEventListener('click', (ev2) => {
        if (j <= 3) {
            imageHero.innerHTML = `<img src="${heroes[j + 1]}">`;
            j++;
        }
        selectedHero = heroes[j];
    });

    selector.addEventListener('click', (ev) => {
        heroSelectBox.classList.add('hidden');
        score.classList.remove('not-visible');
        score.classList.add('visible');
        canvasContainer.classList.remove('hidden');
        player.changeHero(selectedHero);
        player.render();
    });

}

// A function that generates random speeds 
let randomSpeedGenerator = (array) => { 
    console.log(array);
    const randomNumber = Math.floor((Math.random() * array.length) + 1);
    return array[randomNumber - 1];
};

// A function that changes the difficulty of the game
const difficultyLevel = () => {
    const easy = document.querySelector('.easy');
    const hard = document.querySelector('.hard');
    const impossible = document.querySelector('.impossible');

    easy.addEventListener('click', (event) => {
        for (const enemy of allEnemies) {
            const speedEasy = [50, 80, 150];
            enemy.speed = randomSpeedGenerator(speedEasy);
        }

    });
    hard.addEventListener('click', (event) => {
        for (const enemy of allEnemies) {
            const speedHard = [100, 150, 250];
            enemy.speed = randomSpeedGenerator(speedHard);
        }
    });
    impossible.addEventListener('click', (event) => {
        for (const enemy of allEnemies) {
            const speedImpossible = [200, 350, 450];
            enemy.speed = randomSpeedGenerator(speedImpossible);
        }
    });
}



// GLOBAL VARIABLES
const allEnemies = [];
let speeds = [50, 80, 150];
let victoryNumber = 0;
let livesNumber = 3;

//Instantiate Objects.
const player = new Player();
const enemy1 = new Enemy(0, 60, randomSpeedGenerator(speeds));
const enemy2 = new Enemy(0, 140, randomSpeedGenerator(speeds));
const enemy3 = new Enemy(0, 220, randomSpeedGenerator(speeds));
const enemy4 = new Enemy(0, 485, randomSpeedGenerator(speeds));
const enemy5 = new Enemy(0, 390, randomSpeedGenerator(speeds));
const enemy6 = new Enemy(0, 316, randomSpeedGenerator(speeds));
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);

selectHero();
difficultyLevel();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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

player.handleInputForMobile();
