/**
 * @file turnstile-widget.tsx
 * @description Wrapper um das Cloudflare-Turnstile-Widget (Spam-/Bot-Schutz).
 * @module components/forms/shared/turnstile-widget
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { Turnstile, type TurnstileRef } from 'nextjs-turnstile';
import { forwardRef } from 'react';

/** Props für {@link TurnstileWidget}. */
interface TurnstileWidgetProps {
  /** Wird mit dem erzeugten Token aufgerufen, sobald die Challenge erfolgreich gelöst wurde. */
  onSuccess: (token: string) => void;
  /** Wird aufgerufen, wenn das zuvor erzeugte Token abgelaufen ist (Formular muss neu geprüft werden). */
  onExpire?: () => void;
}

/**
 * Wrapper um das Cloudflare-Turnstile-Widget (Spam-/Bot-Schutz). Der `ref` erlaubt
 * dem umgebenden Formular, das Widget nach dem Absenden zurückzusetzen.
 *
 * @param props - Siehe {@link TurnstileWidgetProps}
 * @param ref - Ref auf das Turnstile-Widget, zum Zurücksetzen nach dem Absenden
 * @returns Das Turnstile-Widget
 */
const TurnstileWidget = forwardRef<TurnstileRef, TurnstileWidgetProps>(
  ({ onSuccess, onExpire }, ref) => {
  return (
    <Turnstile
        ref={ref}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={onSuccess}
        onExpire={onExpire}
        onError={() => console.error('Turnstile-Fehler beim Laden')}
        theme="light"
      />
  );
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';

export default TurnstileWidget;