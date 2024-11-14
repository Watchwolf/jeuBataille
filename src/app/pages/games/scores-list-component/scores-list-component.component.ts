import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GamesService } from '../../../server-api/v1/api/games.service'
import { Game } from '../../../server-api/v1/model/game';
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayersService } from '../../../server-api/v1/api/players.service'
import { Player } from '../../../server-api/v1/model/player'

@Component({
  selector: 'app-scores-list-component',
  templateUrl: './scores-list-component.component.html',
  styleUrls: ['./scores-list-component.component.scss'],
  standalone: true,
  imports: [TranslateModule, MatIconModule, RouterModule, CommonModule, MatProgressSpinnerModule],
})
export class ScoresListComponentComponent {
  @Input() nbGamesToDisplay: number = 20
  players: Array<Player> = []
  games?: Array<Game> = undefined

  constructor(
    private gamesService: GamesService,
    private playersService: PlayersService,) {
  }

  ngOnInit() {
    this.refreshScoresList()
  }

  refreshScoresList() {
    this.games = undefined
    this.playersService.playersGet().subscribe((players: Array<Player>) => {
      this.players = players

      this.gamesService.gamesGet().subscribe((games: Array<Game>) => {
        this.games = games.slice(0, this.nbGamesToDisplay);
      });
    });
  }

  getPlayerName(playerId?: number) {
    if(!playerId)
      return ''

    for(var player of this.players) {
      if(player.id == playerId)
        return player.name
    }
    return ''
  }

}
