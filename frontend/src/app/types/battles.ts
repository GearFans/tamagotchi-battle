import { HexString } from '@polkadot/util/types';

export type TamagotchiColor = 'Green' | 'Red' | 'Blue' | 'Purple' | 'Orange' | 'Yellow';
export type PlayerColor = TamagotchiColor;

export type BattlePlayerType = {
  attributes: number[];
  color: TamagotchiColor;
  defence: number;
  health: number;
  power: number;
  owner: HexString;
  tmgId: HexString;
  name: string;
  dateOfBirth: number;
};

export type BattleCurrentStateVariants = 'Registration' | 'GameIsOn' | 'WaitNextRound' | 'GameIsOver';
export type BattleRoundMoveVariants = 'Defence' | 'Attack' | 'Skipped';

export type RoundDamageType = [number, number, number, BattleRoundMoveVariants, BattleRoundMoveVariants];

export type BattleStatePair = {
  gameIsOver: boolean;
  moveDeadline: number;
  moves: [];
  ownerIds: HexString[];
  rounds: number;
  tmgIds: HexString[];
  winner: HexString;
};

export type BattleStatePlayer = {
  color: PlayerColor;
  dateOfBirth: number;
  defence: number;
  health: number;
  name: string;
  owner: HexString;
  power: number;
  tmgId: HexString;
  victories: number;
};

export type BattleStateResponse = {
  admins: HexString[];
  completedGames: number;
  currentWinner: HexString;
  pairs: Record<string, BattleStatePair>;
  players: Record<HexString, BattleStatePlayer>;
  playersIds: HexString[];
  currentPlayers: HexString[];
  state: BattleCurrentStateVariants;
};
