import * as Collapsible from '@radix-ui/react-collapsible';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { ChatsList } from '@app/chats/components/list';

import { useStorage } from '@libs/storage/provider';

import { ActiveAccount } from '@shared/accounts/active';
import { AlbyConnectButton } from '@shared/alby';
import { ComposerModal } from '@shared/composer';
import { Frame } from '@shared/frame';
import { BellIcon, NavArrowDownIcon, SpaceIcon } from '@shared/icons';

import { useActivities } from '@stores/activities';
import { useSidebar } from '@stores/sidebar';

import { compactNumber } from '@utils/number';

export function Navigation() {
  const { db } = useStorage();

  const [totalNewActivities] = useActivities((state) => [state.totalNewActivities]);
  const [chats, toggleChats] = useSidebar((state) => [state.chats, state.toggleChats]);

  return (
    <Frame className="relative flex h-full w-[232px] flex-col" lighter>
      {db.platform === 'darwin' ? (
        <div data-tauri-drag-region className="h-11 w-full shrink-0" />
      ) : null}
      <div className="scrollbar-hide flex h-full flex-1 flex-col gap-6 overflow-y-auto pb-32">
        <div className="flex flex-col pr-2">
          <ComposerModal />
          <NavLink
            to="/"
            preventScrollReset={true}
            className={({ isActive }) =>
              twMerge(
                'flex h-10 items-center gap-2.5 rounded-r-lg border-l-2 pl-4 pr-2',
                isActive
                  ? 'border-fuchsia-500 bg-white/5 text-white'
                  : 'border-transparent text-white/80'
              )
            }
          >
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded bg-white/10 backdrop-blur-xl">
              <SpaceIcon className="h-4 w-4 text-white" />
            </span>
            Space
          </NavLink>
          <NavLink
            to="/notifications"
            preventScrollReset={true}
            className={({ isActive }) =>
              twMerge(
                'flex h-10 items-center justify-between rounded-r-lg border-l-2 pl-4 pr-2',
                isActive
                  ? 'border-fuchsia-500 bg-white/5 text-white'
                  : 'border-transparent text-white/80'
              )
            }
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded bg-white/10 backdrop-blur-xl">
                <BellIcon className="h-4 w-4 text-white" />
              </span>
              Notifications
            </div>
            {totalNewActivities > 0 ? (
              <div className="inline-flex h-5 w-8 items-center justify-center rounded bg-fuchsia-500">
                <span className="text-xs font-medium text-white">
                  {compactNumber.format(totalNewActivities)}
                </span>
              </div>
            ) : null}
          </NavLink>
        </div>
        <Collapsible.Root open={chats} onOpenChange={toggleChats}>
          <div className="flex flex-col gap-1 pr-2">
            <Collapsible.Trigger asChild>
              <button className="flex items-center gap-1 pl-[20px] pr-4">
                <div
                  className={twMerge(
                    'inline-flex h-5 w-5 transform items-center justify-center transition-transform duration-150 ease-in-out',
                    chats ? '' : 'rotate-180'
                  )}
                >
                  <NavArrowDownIcon className="h-3 w-3 text-white/50" />
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/50">
                  Chats
                </h3>
              </button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <ChatsList />
            </Collapsible.Content>
          </div>
        </Collapsible.Root>
      </div>
      <div className="relative shrink-0">
        <div className="border-l-2 border-transparent pb-2 pl-4 pr-2">
          <AlbyConnectButton />
        </div>
        <ActiveAccount />
      </div>
    </Frame>
  );
}
