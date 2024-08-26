import sharedTypes from "../imports/sharedtype"

export default interface player  {

    createPaddle(img: string, side: number, playerID?: sharedTypes.playerControls): void
}