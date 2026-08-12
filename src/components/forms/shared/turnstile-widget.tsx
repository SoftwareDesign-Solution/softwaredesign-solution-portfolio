import { forwardRef } from 'react';
import { Turnstile, type TurnstileRef } from 'nextjs-turnstile';

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onExpire?: () => void;
}

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