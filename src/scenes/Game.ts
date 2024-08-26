import { Scene } from 'phaser';
import sharedConfig from '../imports/sharedConfig';
import player_person from '../components/player_Person';
import player_computer from '../components/player_comp';

export class Game extends Scene {

    private player_1: player_person;
    private player_2: player_person;
    private player_comp: player_computer;
    private ball: Phaser.Physics.Arcade.Image;

    private board: {
        centerLine: Phaser.GameObjects.Graphics,
        centerCircle: Phaser.GameObjects.Graphics,
        scoreTextP1: Phaser.GameObjects.Text,
        scoreTextP2: Phaser.GameObjects.Text
    };

    config: sharedConfig;

    constructor() {
        super('Game');
        this.config = sharedConfig.getInstance();
    }
    
    preload() {
        this.load.image('player', '/assets/box.png')
        this.load.image('ball', '/assets/Ball.png')
    }
    create() {
        console.log(this.config.gameconf.pvp);
        
        this.board = this.createBoardGraphics();
        // const ball: Phaser.Physics.Arcade.Image = this.createBall()
        this.createBall();
        
        if(this.config.gameconf.pvp){   
            this.player_1 = new player_person(this, this.config.paddle.side.LEFT, this.config.gameconf.center.height, 'player', this.config.controls_p1);
            this.player_1.createPaddle();
            
            this.player_2 = new player_person(this, this.config.paddle.side.RIGHT, this.config.gameconf.center.height, 'player', this.config.controls_p2);
            this.player_2.createPaddle();
            this.physics.add.collider(this.ball, [this.player_1, this.player_2])

        } else if (!this.config.gameconf.pvp) {
            this.player_1 = new player_person(this, this.config.paddle.side.LEFT, this.config.gameconf.center.height, 'player', this.config.controls_p1);
            this.player_1.createPaddle();

            this.player_comp = new player_computer(this, this.config.paddle.side.RIGHT, this.config.gameconf.center.height, 'player', this.ball);
            this.player_comp.createPaddle();

            this.physics.add.collider(this.ball, [this.player_1, this.player_comp])
        }
        
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.countdown();
    }
    
    update() {
        this.gameLogic();
        
        this.player_1.controls();
        if (this.config.gameconf.pvp) this.player_2.controls();
        else this.player_comp.followBall();
        this.config.openMenu(this);
        
    }

    countdown() {
        this.physics.pause()
        let completed = 0;
        let executed = false;
        const countdownText = ['Get', 'Pong', 'Ping', 'Go!'];

        const countdownDisplay = this.add.text(this.config.gameconf.center.width, this.config.gameconf.center.height, '', {
            fontSize: '128px',
            color: '#ffffff',
            strokeThickness: 10
        }).setOrigin(0.5).setAlpha(0);

        for (let i = 0; i < countdownText.length; i++) {
            this.time.delayedCall(i * 500, () => {
                countdownDisplay.setText(countdownText[i]).setAlpha(1).setScale(0.8);
                this.tweens.add({
                    targets: countdownDisplay,
                    scale: 1,
                    alpha: 0,
                    duration: 300,
                    ease: 'Bounce.easeOut',
                    onComplete: () => {
                        completed += 1;
                        console.log(i);

                        if (completed === countdownText.length && !executed) {
                            this.time.delayedCall(0, () => {
                                executed = true;
                                this.physics.resume();
                            })
                        }
                    }
                });
            });
        }
    }

    /**
     * Executes the game logic to update the score and restart the game when one player reaches 5 points.
     *
     * @return {void} This function does not return anything.
     */
    gameLogic(): void {
        if(this.config.score.p1 === 5 || this.config.score.p2 === 5) {
            this.config.score = {p1: 0, p2: 0};
            this.scene.start('GameOver');
        }


        if (this.ball.x <= 20) {
            this.config.score.p2 += 1;
            this.ball.setPosition(this.config.gameconf.center.width, this.config.gameconf.center.height);
            this.ball.setVelocity(this.config.ball.speed)
            this.addScore(this.board, 2)
        } else if (this.ball.x >= this.config.gameconf.width - 20) {
            this.config.score.p1 += 1;
            this.ball.setPosition(this.config.gameconf.center.width, this.config.gameconf.center.height);
            this.ball.setVelocity(-this.config.ball.speed)
            this.addScore(this.board, 1)
        }
    }

    createBall(): Phaser.Physics.Arcade.Image {
        this.ball = this.physics.add.image(this.config.gameconf.center.width, this.config.gameconf.center.height, 'ball')
        this.ball.setScale(0.1);
        this.ball.setBounce(1.1);
        this.ball.setVelocity(this.config.ball.speed);
        this.ball.setMaxVelocity(this.config.ball.max_speed);
        this.ball.setCollideWorldBounds(true)
        this.ball.setTintFill(0xffffff)
        this.physics.add.collider(this.ball, [this.player_1, this.player_2, this.player_comp])

        return this.ball
    }

    createBoardGraphics(): {
        centerLine: Phaser.GameObjects.Graphics,
        centerCircle: Phaser.GameObjects.Graphics,
        scoreTextP1: Phaser.GameObjects.Text,
        scoreTextP2: Phaser.GameObjects.Text
    } {

        const { width, height } = this.config.gameconf.center;
        const centerLine = this.add.graphics();
        const centerCircle = this.add.graphics();
        const scoreTextP1 = this.add.text(width - 90, height, '0');
        const scoreTextP2 = this.add.text(width + 90, height, '0');

        centerLine.lineStyle(4, 0x20c20e);

        centerLine.beginPath();
        centerLine.moveTo(this.config.gameconf.center.width, 0);
        centerLine.lineTo(this.config.gameconf.center.width, this.config.gameconf.height);
        centerLine.strokePath();

        centerCircle.lineStyle(4, 0x20c20e);
        centerCircle.strokeCircle(this.config.gameconf.center.width, this.config.gameconf.center.height, 180);

        scoreTextP1.setFill('#20c20e');
        scoreTextP1.setFontSize('20px');

        scoreTextP2.setFill('#20c20e');
        scoreTextP2.setFontSize('20px');

        return { centerLine, centerCircle, scoreTextP1, scoreTextP2 }
    }


    addScore(board: {
        centerLine: Phaser.GameObjects.Graphics,
        centerCircle: Phaser.GameObjects.Graphics,
        scoreTextP1: Phaser.GameObjects.Text,
        scoreTextP2: Phaser.GameObjects.Text
    },
        player: number) {
        if (player === 1) {
            board.scoreTextP1.text = this.config.score.p1.toString()
        } else if (player === 2) {
            board.scoreTextP2.text = this.config.score.p2.toString()
        }
    }
}
