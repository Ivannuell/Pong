import Phaser from 'phaser'
import player from './player';
import sharedConfig from '../imports/sharedConfig';


export default class player_comp extends Phaser.Physics.Arcade.Image implements player {
    config: sharedConfig;
    y_follow: number
    constructor(
        public scene: Phaser.Scene,
        public x: number,
        public y: number,
        public img: string,
        public ball: Phaser.Physics.Arcade.Image) {
        super(scene, x, y, img);
        this.config = sharedConfig.getInstance();

    }

    createPaddle() {
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setDisplaySize(this.config.paddle.size.width, this.config.paddle.size.height);
        this.setImmovable(true);
    }

    followBall() {
        this.y_follow = this.ball.body!.y - this.body!.height / 2.5;

        if (this.y_follow >= this.body!.y) {
            if(this.body!.y / 2 <= 0) this.setVelocityY(0)
                this.setVelocityY(500)
                this.setAccelerationY(2000)
                if(this.body?.velocity.y! > 700){
                    this.setAccelerationY(0)
                }
            // this.setVelocityY(200)
            // this.setAccelerationY(2000);
            // this.setMaxVelocity(0, 500)
            
            // this.setVelocityY(100)
        } else if (this.y_follow <= this.body!.y) {
            if(this.body!.y / 2 >= this.config.gameconf.height + 100) this.setVelocity(0)
                this.setVelocityY(-500)
                this.setAccelerationY(-2000)
                if(this.body?.velocity.y! <= -700){
                    this.setAccelerationY(0)
                }
            // this.setVelocityY(-200)
            // this.setAccelerationY(-2000);
            // this.setMaxVelocity(0, -500);
        }


        const debug_line = this.scene.add.graphics()

        debug_line.lineStyle(2, 0xff0000)
        debug_line.beginPath()
        debug_line.moveTo(this.ball.body!.x, 0);
        debug_line.lineTo(this.ball.body!.x, this.ball.body!.y);
        debug_line.strokePath()
    }





}