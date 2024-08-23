import { Scene } from 'phaser';
import GameConfig from '../main.ts'
import { paddle_size } from '../imports/types.ts';

export class Game extends Scene {

    private player_1: Phaser.Physics.Arcade.Image;
    private player_2: Phaser.Physics.Arcade.Image;
    private score: {p1: number, p2: number};
    
    ball_1: Phaser.Physics.Arcade.Image;
    score_text_p1: Phaser.GameObjects.Text;
    score_text_p2: Phaser.GameObjects.Text;

    
    game_width: number = GameConfig.config.width as number;
    game_height: number = GameConfig.config.height as number;

    w_key: Phaser.Input.Keyboard.Key;
    s_key: Phaser.Input.Keyboard.Key;
    up_key: Phaser.Input.Keyboard.Key;
    down_key: Phaser.Input.Keyboard.Key; 
    esc_key: Phaser.Input.Keyboard.Key;

    paddle: paddle_size;
    

    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('player_1', '/assets/box.png')
        this.load.image('player_2', '/assets/box.png')
        this.load.image('ball', '/assets/Ball.png')

    }

    create() {
        this.paddle = {height: 2, width: 0.4}

        this.score = {p1: 0, p2: 0}
        this.physics.world.setBoundsCollision(true, true, true, true);

        this.player_1 = this.physics.add.image(100, 350, 'player_1');
        this.player_1.setScale(this.paddle.width, this.paddle.height);
        this.player_1.setImmovable(true)
        
        this.player_2 = this.physics.add.image(this.game_width-100, 350, 'player_1');
        this.player_2.setScale(this.paddle.width, this.paddle.height);
        this.player_2.setImmovable(true)

        this.ball_1 = this.physics.add.image(this.game_width / 2, this.game_height / 2, 'ball')
        this.ball_1.setScale(0.1);
        this.ball_1.setBounce(1.1);
        this.ball_1.setVelocity(400);
        this.ball_1.setMaxVelocity(650);
        this.ball_1.setCollideWorldBounds(true)
        this.ball_1.setTintFill(0xffffff)
        this.physics.add.collider(this.ball_1, [this.player_1, this.player_2])

        this.w_key = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)!;
        this.s_key = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)!;
        this.up_key = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.UP)!;
        this.down_key = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)!;
        this.esc_key = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)!;

        const graphics = this.add.graphics();
        const graphics_2 = this.add.graphics();

        graphics.lineStyle(4, 0x20c20e);

        graphics.beginPath();
        graphics.moveTo(this.game_width / 2, 0); 
        graphics.lineTo(this.game_width / 2, this.game_height); 
        graphics.strokePath();

        graphics_2.lineStyle(4, 0x20c20e);

        graphics_2.strokeCircle(this.game_width / 2, this.game_height / 2, 180); 
        

        this.score_text_p1 = this.add.text(this.game_width / 2 - 90, this.game_height / 2, '0' );
        this.score_text_p2 = this.add.text(this.game_width / 2 + 90, this.game_height / 2, '0' );

        this.score_text_p1.setFill('#20c20e');
        this.score_text_p1.setFontSize('20px');

        this.score_text_p2.setFill('#20c20e');
        this.score_text_p2.setFontSize('20px');
    }

    update() {
        this.gameLogic();
        

        if (this.w_key.isDown) {
            this.player_1.setVelocityY(-400);
            if (this.player_1.body!.y <= 0) {
                this.player_1.setVelocityY(0);
            }
        } else if (this.s_key.isDown) {
            this.player_1.setVelocityY(400);
            if (this.player_1.body!.y >= this.game_height - 200) {
                this.player_1.setVelocityY(0);
            }
        } else {
            this.player_1.setVelocityY(0);
        }

        if (this.up_key.isDown) {
            this.player_2.setVelocityY(-400);
            if (this.player_2.body!.y <= 0) {
                this.player_2.setVelocityY(0);
            }
        } else if (this.down_key.isDown) {
            this.player_2.setVelocityY(400);
            if (this.player_2.body!.y >= this.game_height - 200) {
                this.player_2.setVelocityY(0);
            }
        } else {
            this.player_2.setVelocityY(0);
        }

        if (this.esc_key.isDown) {
            this.scene.start('MainMenu');
        }

    }

     gameLogic(): void {
        type coord = {
            x: number,
            y: number
        }


        const ball_coord: coord = {
            x: this.ball_1.x,
            y: this.ball_1.y
        }


        if(ball_coord.x <= 20) {
            this.score.p2 += 1;
            this.score_text_p2.text = this.score.p2.toString()
            this.ball_1.setPosition(this.game_width / 2, this.game_height / 2);
            this.ball_1.setVelocity(400)
        } else if (ball_coord.x >= this.game_width - 20){
            this.score.p1 += 1;
            this.ball_1.setPosition(this.game_width / 2, this.game_height / 2);
            this.ball_1.setVelocity(-400)
            this.score_text_p1.text = this.score.p1.toString()
        }
     }
}
