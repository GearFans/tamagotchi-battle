import { HexString } from '@polkadot/util/types';

export type T1 = {
  name: string;
  dateOfBirth: number;
};

type T2 = {
  entertained: number;
  entertainedBlock: number;
  fed: number;
  fedBlock: number;
  owner: string;
  rested: number;
  restedBlock: number;
};

type T3 = {
  allowedAccount: string | null;
};

type T4 = {
  energy: number;
  power: number;
};

type TCustom = {
  isDead: boolean;
};

export type TamagotchiState = T1 & T2 & T3 & T4 & TCustom;

export type AppStore = {
  programId: HexString;
};

export type NotificationResponseTypes = 'WantToSleep' | 'PlayWithMe' | 'FeedMe';

export type NotificationType = Partial<Record<NotificationResponseTypes, number>>;
