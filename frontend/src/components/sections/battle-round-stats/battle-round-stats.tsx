import clsx from 'clsx';
import { BattleRoundStatsAvatar } from 'components/sections/battle-round-stats-avatar';
import { Icon } from 'components/ui/icon';
import { useBattle } from 'app/context';

export const BattleRoundStats = () => {
  const { rivals, currentPlayer, battle, currentPairIdx } = useBattle();
  return (
    <div className="flex gap-10 justify-between items-center">
      {battle && (
        <>
          <BattleRoundStatsAvatar tamagotchi={rivals[0]} />
          {battle.state === 'GameIsOn' && (
            <div className="relative shrink-0">
              <BattleTurnArrows isReverse={rivals[1].tmgId === currentPlayer} />
              {battle && battle.pairs[currentPairIdx].rounds >= 0 && (
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                  Round: {battle.pairs[currentPairIdx].rounds + 1}
                </span>
              )}
            </div>
          )}
          <BattleRoundStatsAvatar tamagotchi={rivals[1]} isReverse />
        </>
      )}
    </div>
  );
};

const BattleTurnArrows = ({ isReverse }: { isReverse: boolean }) => (
  <div className={clsx('relative flex', isReverse && 'rotate-180')}>
    <Icon
      name="battle-next-step"
      className="w-8 xxl:w-10 aspect-[1/2] text-white animate-battle-turn-1 transition-opacity"
    />
    <Icon
      name="battle-next-step"
      className="w-8 xxl:w-10 aspect-[1/2] text-white animate-battle-turn-2 transition-opacity"
    />
    <Icon
      name="battle-next-step"
      className="w-8 xxl:w-10 aspect-[1/2] text-white animate-battle-turn-3 transition-opacity"
    />
  </div>
);
