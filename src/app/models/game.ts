export class GameRound {
    player1Card?: number = undefined
    player2Card?: number = undefined
}

export class Game {
    player1Cards: Array<number> = []
    player1Score: number = 0

    player2Cards: Array<number> = []
    player2Score: number = 0
}
