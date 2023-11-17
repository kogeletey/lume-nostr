import { NDKEvent } from '@nostr-dev-kit/ndk';
import { twMerge } from 'tailwind-merge';

import { useDecryptMessage } from '@app/chats/hooks/useDecryptMessage';

export function ChatMessage({ message, self }: { message: NDKEvent; self: boolean }) {
  const decryptedContent = useDecryptMessage(message);

  return (
    <div
      className={twMerge(
        'my-2 w-max max-w-[400px] rounded-t-xl px-3 py-3',
        self
          ? 'ml-auto rounded-l-xl bg-blue-500 text-white'
          : 'rounded-r-xl bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
      )}
    >
      {!decryptedContent ? (
        <p>Decrypting...</p>
      ) : (
        <div>
          <p className="select-text whitespace-pre-line">{decryptedContent}</p>
        </div>
      )}
    </div>
  );
}
