import { Injectable } from '@angular/core';
import { Game, GameRound } from '../models/game'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  nbCardsTotal: number = 52
  game: Game = new Game()
  currentRound?: GameRound = undefined

  constructor() { }

  newGame() {
    this.game = new Game()
  }

  shuffleAndDealCards() {
      //cards list
      var list: Array<number> = [];
      for (var i: number = 1; i <= this.nbCardsTotal; i++) {
          list.push(i);
      }

      //Shuffle
      for (var i: number = list.length - 1; i >= 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = list[i];
          list[i] = list[j];
          list[j] = temp;
      }

      //Deal
      this.game.player1Cards = list.slice(0, this.nbCardsTotal / 2)
      this.game.player2Cards = list.slice(this.nbCardsTotal / 2, this.nbCardsTotal)
  }

  playOneRound(): GameRound {
      if(this.game.player1Cards.length == 0 || this.game.player2Cards.length == 0)
        throw new Error("No cards available");

      var round: GameRound = new GameRound()

      round.player1Card = this.game.player1Cards[0]
      round.player2Card = this.game.player2Cards[0]

      this.game.player1Cards = this.game.player1Cards.slice(1, this.game.player1Cards.length)
      this.game.player2Cards = this.game.player2Cards.slice(1, this.game.player2Cards.length)

      this.game.player1Score += round.player1Card
      this.game.player2Score += round.player2Card

      this.currentRound = round
      return round
  }

  isFinish(): boolean {
    return this.game.player1Cards.length == 0
  }
}
