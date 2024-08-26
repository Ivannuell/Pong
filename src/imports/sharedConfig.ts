import sharedTypes from "./sharedtype.ts"
import gameConf from "../main.ts"
import Phaser from 'phaser'

export default class sharedConfig {
    private static instance: sharedConfig;

    private constructor() { };
    
    public static getInstance(): sharedConfig {
        if (!sharedConfig.instance) {
            sharedConfig.instance = new sharedConfig();
        }
        
        return sharedConfig.instance;
    }
    // Config -->
    
    public key: sharedTypes.key

    public gameconf = {
        width: gameConf.config.width as number,
        height: gameConf.config.height as number,
        center: {
            width: gameConf.config.width as number / 2,
            height: gameConf.config.height as number / 2
        },
        pvp: false,
    }

    public paddle: sharedTypes.paddle = {
        size: {
            width: 40,
            height: 200
        },

        side: {
            LEFT: 100,
            RIGHT: this.gameconf.width - 100
        },
        
        paddle_speed: 500
    }
    
    public ball: sharedTypes.ball = {
        speed: 500,
        max_speed: 900    
    }

    public score: sharedTypes.score = {
        p1: 0,
        p2: 0
    }

    public controls: sharedTypes.menuControls = {
        main_menu: Phaser.Input.Keyboard.KeyCodes.ESC
    }

    public controls_p1: sharedTypes.playerControls = {
        id: 'player 1',
        UP: Phaser.Input.Keyboard.KeyCodes.W,
        DOWN: Phaser.Input.Keyboard.KeyCodes.S,
    }

    public controls_p2: sharedTypes.playerControls = {
        id: 'player 2',
        UP: Phaser.Input.Keyboard.KeyCodes.UP,
        DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
    }

    openMenu(scene: Phaser.Scene) {
        this.key = scene.input.keyboard!;
        if(this.key.addKey(this.controls.main_menu).isDown){
            scene.scene.start('MainMenu');
        }
    }
}