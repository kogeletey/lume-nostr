/* eslint-disable @typescript-eslint/no-explicit-any */
import { Account } from '@components/accountBar/account';

import { currentUser } from '@stores/currentUser';

import LumeIcon from '@assets/icons/Lume';
import MiniPlusIcon from '@assets/icons/MiniPlus';

import { useStore } from '@nanostores/react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Database from 'tauri-plugin-sql-api';

export default function AccountBar() {
  const [users, setUsers] = useState([]);
  const $currentUser: any = useStore(currentUser);

  const getAccounts = useCallback(async () => {
    const db = await Database.load('sqlite:lume.db');
    const result: any = await db.select('SELECT * FROM accounts');

    setUsers(result);
  }, []);

  useEffect(() => {
    getAccounts().catch(console.error);
  }, [getAccounts]);

  return (
    <div className="flex h-full flex-col items-center justify-between px-2 pt-12 pb-4">
      <div className="flex flex-col gap-3">
        {users.map((user, index) => (
          <Account key={index} user={user} current={$currentUser.pubkey} />
        ))}
        <Link
          href="/onboarding"
          className="group relative flex h-11 w-11 shrink cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-zinc-600 hover:border-zinc-400">
          <MiniPlusIcon className="h-6 w-6 text-zinc-400 group-hover:text-zinc-200" />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <LumeIcon className="h-8 w-auto text-zinc-700" />
      </div>
    </div>
  );
}
