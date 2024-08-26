import Phaser from 'phaser'

export type paddle = {
    size: {
        width: number,
        height: number
    },

    side: {
        LEFT: number,
        RIGHT: number
    },

    paddle_speed: number,

}

export type ball = {
    speed: number,
    max_speed: number
    
}

export type playerControls = {
    id: string,
    DOWN: number,
    UP: number,
}

export type menuControls = {
    main_menu: number
}

export type score = {
    p1: number,
    p2: number
}

export type key = Phaser.Input.Keyboard.KeyboardPlugin;