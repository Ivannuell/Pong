import sharedConfig from '../imports/sharedConfig'
import sharedTypes from '../imports/sharedtype'
import player from './player'

export default class player_person extends Phaser.Physics.Arcade.Image implements player {
    config: sharedConfig;
    key: sharedTypes.key;

    constructor(
        public scene: Phaser.Scene,
        x: number,
        y: number,
        img: string,
        public player: sharedTypes.playerControls) {
        super(scene, x, y, img,)

        this.config = sharedConfig.getInstance();
        this.key = scene.input.keyboard!;

    }


    controls() {
        if (this.key.addKey(this.player.UP).isDown) {
            this.setVelocityY(-this.config.paddle.paddle_speed);
            if (this.body!.y <= 0) {
                this.setVelocityY(0);
            }
        } else if (this.key.addKey(this.player.DOWN).isDown) {
            this.setVelocityY(this.config.paddle.paddle_speed);
            if (this.body!.y >= this.config.gameconf.height - 200) {
                this.setVelocityY(0);
            }
        } else {
            this.setVelocityY(0);
        }
    }

    createPaddle() {
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setDisplaySize(this.config.paddle.size.width, this.config.paddle.size.height);
        this.setImmovable(true);
    }
}