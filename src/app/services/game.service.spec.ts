import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { Game, GameRound } from '../models/game'

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shuffle And Deal Cards : numbers of cards', () => {
    service.shuffleAndDealCards()
    expect(service.game.player1Cards.length).toEqual(service.nbCardsTotal / 2)
    expect(service.game.player2Cards.length).toEqual(service.nbCardsTotal / 2)
  })

  it('shuffle And Deal Cards : unique cards', () => {
    service.shuffleAndDealCards()
    for(var card1 of service.game.player1Cards) {
      for(var card2 of service.game.player2Cards) {
        expect(card1).not.toEqual(card2)
      }
    }
  })

  it('One round : return first cards, unique cards', () => {
    service.shuffleAndDealCards()
    var player1Card: number = service.game.player1Cards[0]
    var player2Card: number = service.game.player2Cards[0]

    var round: GameRound = service.playOneRound()
    expect(round.player1Card).toEqual(player1Card)
    expect(round.player2Card).toEqual(player2Card)
  })

  it('One round : numbers of cards', () => {
    service.shuffleAndDealCards()
    var round: GameRound = service.playOneRound()
    expect(service.game.player1Cards.length).toEqual(service.nbCardsTotal / 2 - 1)
    expect(service.game.player2Cards.length).toEqual(service.nbCardsTotal / 2 - 1)
  })
});
