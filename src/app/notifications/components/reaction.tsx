import { NDKEvent } from '@nostr-dev-kit/ndk';
import { Link } from 'react-router-dom';

import { NotiUser } from '@app/notifications/components/user';

import { formatCreatedAt } from '@utils/createdAt';

export function NotiReaction({ event }: { event: NDKEvent }) {
  const createdAt = formatCreatedAt(event.created_at);
  const rootId = event.tags.find((el) => el[0])?.[1];

  return (
    <Link to={`/notes/text/${rootId}`} className="h-min w-full px-3">
      <div className="group flex items-center justify-between rounded-xl px-3 py-3 hover:bg-white/10">
        <div className="flex items-center gap-2">
          <NotiUser pubkey={event.pubkey} />
          <p className="leading-none text-white/50">
            reacted {event.content} · {createdAt}
          </p>
        </div>
        <span className="hidden text-sm font-semibold text-fuchsia-500 group-hover:block">
          View
        </span>
      </div>
    </Link>
  );
}
