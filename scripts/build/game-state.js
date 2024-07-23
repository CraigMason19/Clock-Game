export var GameMode;
(function (GameMode) {
    GameMode[GameMode["Strict"] = 0] = "Strict";
    GameMode[GameMode["Loose"] = 1] = "Loose";
})(GameMode || (GameMode = {}));
export class GameState {
    constructor(mode = GameMode.Loose) {
        this.isFinished = false;
        this.numGuesses = 0;
        this.mode = mode;
    }
    reset() {
        this.isFinished = false;
        this.numGuesses = 0;
        this.mode = this.mode;
    }
}
