import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GamesService } from '../../../server-api/v1/api/games.service'
import { PlayersService } from '../../../server-api/v1/api/players.service'
import { Score } from '../../../server-api/v1/model/score'
import { Game, GameRound } from '../../../models/game'
import { PlayerPayload } from '../../../server-api/v1/model/playerPayload'
import { Player } from '../../../server-api/v1/model/player'
import { GameService } from '../../../services/game.service'
import { CommonModule } from "@angular/common";
import { TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule, TranslateModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, 
    MatFormFieldModule, MatInputModule, FormsModule 
  ],
})
export class GameComponent {
  step: string = 'playerForm'

  player1Name?: string = undefined
  player1Id?: number = undefined
  player2Name?: string = undefined
  player2Id?: number = undefined
  formPlayerId: number = 1
  formPlayerName: string = ''

  constructor(
    private gamesService: GamesService,
    private playersService: PlayersService,
    public gameService: GameService,
    private translate: TranslateService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.step = 'playerForm'
    this.formPlayerId = 1
    this.formPlayerName = ''
  }

  playRoundCB() {
    this.gameService.playOneRound()

    if(this.gameService.isFinish()) {
      var scorePlayer1: Score = { playerId: this.player1Id, score: this.gameService.game.player1Score }
      var scorePlayer2: Score = { playerId: this.player2Id, score: this.gameService.game.player2Score }

      this.gamesService.gamesPost([scorePlayer1, scorePlayer2]).subscribe((response) => {
        this.snackBar.open(this.translate.instant('Saved game'), this.translate.instant('Close'), { duration: 3000 });
      });
    }
  }

  newGameCB() {
    this.gameService.newGame()
    this.gameService.shuffleAndDealCards()
  }

  playerSaveCB() {
    if(this.formPlayerId == 1) {
      this.player1Name = this.formPlayerName
      this.formPlayerId = 2
      this.formPlayerName = ''

      var player: PlayerPayload = {'name': this.player1Name}
      this.playersService.playersPost(player).subscribe((player: Player) => {
        this.player1Id = player.id
      });
    } else if(this.formPlayerId == 2) {
      this.player2Name = this.formPlayerName

      var player: PlayerPayload = {'name': this.player2Name}
      this.playersService.playersPost(player).subscribe((player: Player) => {
        this.player2Id = player.id
      });

      this.step = 'game'
      this.newGameCB()
    }
  }

  playerNameWon() {
    return this.gameService.game.player1Score > this.gameService.game.player2Score ? this.player1Name: this.player2Name
  }
}
