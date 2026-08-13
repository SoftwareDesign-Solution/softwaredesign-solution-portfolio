
ALTER TABLE angebotsanfrage
    ADD confirmation_token          UUID NOT NULL DEFAULT gen_random_uuid(),
    ADD confirmation_expires_at     TIMESTAMPTZ,
    ADD confirmed_at                TIMESTAMPTZ;