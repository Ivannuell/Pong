import { Scene } from 'phaser';
import sharedConfig from '../imports/sharedConfig';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;
    config: sharedConfig

    constructor ()
    {
        super('GameOver');
        this.config = sharedConfig.getInstance();
    }

    create ()
    {
        this.add.text(this.config.gameconf.center.width, this.config.gameconf.center.height, 'Game Over', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5,0.5);


        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
