export enum GameMode {
    Strict,
    Loose,
}

export class GameState {
    isFinished: boolean;
    numGuesses: number;
    mode: GameMode;

    constructor(mode: GameMode = GameMode.Loose) {
        this.isFinished = false;
        this.numGuesses = 0;
        this.mode = mode
    }

    reset(): void {
        this.isFinished = false;
        this.numGuesses = 0;
        this.mode = this.mode;
    }

    toggleGameMode(): void {
        this.mode = (this.mode === GameMode.Loose) ? GameMode.Strict : GameMode.Loose;
    }
}