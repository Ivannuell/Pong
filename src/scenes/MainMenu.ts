import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.text(
            this.game.config.width as number / 2, 
            this.game.config.height as number / 2, 
            "Pong Ping", 
            {
                fontSize: 80, 
                color: "#000", 
                backgroundColor: "#20c20e"} 
            ).setOrigin(0.5,0.5)

        const start_text = this.add.text(
            this.game.config.width as number / 2, 
            this.game.config.height as number / 2 + 60, 
            "Press to Start",
            {
                fontSize: 30,
                color: "#20c20e"
            }
        ).setOrigin(0.5,0.5)

        start_text.setInteractive()
        start_text.on('pointerdown', () => {
            this.scene.start('Game');
        })

        start_text.on('pointerover', () => {
            start_text.setTintFill(0x20c20e,0x20c20e,0xffffff,0xffffff)
        })

        start_text.on('pointerout', () => {
            start_text.setTintFill(0x20c20e,0x20c20e,0x20c20e,0x20c20e)
        })

    }
}
