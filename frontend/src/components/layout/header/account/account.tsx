import { useState } from 'react';
import { useAccount } from '@gear-js/react-hooks';
import { Button, buttonStyles } from '@gear-js/ui';
import { GasWallet } from 'components/common/gas-wallet';
import { SelectAccountPopup } from 'components/popups/select-account-popup';
import { AccountButton } from 'components/common/account-button';
import { useApp, useBattle } from 'app/context';
import { useBattleMessage } from 'app/hooks/use-battle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export const AccountComponent = () => {
  const { account, accounts } = useAccount();
  const { isAdmin, isPending, setIsPending } = useApp();
  const { battle, setRoundDamage } = useBattle();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleMessage = useBattleMessage();

  const onSuccess = () => {
    navigate('/');
    setIsPending(false);
  };
  const onError = () => setIsPending(false);
  const handler = () => {
    setIsPending(true);
    handleMessage({ StartNewGame: null }, { onSuccess, onError });
    setRoundDamage([]);
  };

  return (
    <div className="flex items-center gap-4">
      {battle?.state === 'GameIsOver' && isAdmin && (
        <Button text="Start New Game" color="primary" onClick={handler} disabled={isPending} />
      )}
      {battle?.state === 'Registration' && isAdmin && pathname !== '/battle' && (
        <Link to="/battle" className={clsx('btn transition-colors', buttonStyles.primary)}>
          Battle Page
        </Link>
      )}
      {account ? (
        <div className="flex gap-4">
          <GasWallet balance={account.balance} address={account.address} name={account.meta.name} onClick={openModal} />
          <div className="max-w-[260px]">
            <AccountButton address={account.address} name={account.meta.name} onClick={openModal} />
          </div>
        </div>
      ) : (
        <Button text="Connect account" onClick={openModal} color="lightGreen" />
      )}
      {isModalOpen && <SelectAccountPopup accounts={accounts} close={closeModal} />}
    </div>
  );
};
