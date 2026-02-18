-- DROP in dependency order (children first)
DROP TABLE IF EXISTS invitations CASCADE;
DROP TABLE IF EXISTS payment_ledger CASCADE;
DROP TABLE IF EXISTS guests CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS weddings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- CREATE in parent-to-child order
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (email = lower(email))
);

CREATE TABLE weddings (
  id BIGSERIAL PRIMARY KEY,
  owner_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  wedding_date DATE,
  venue_name TEXT,
  timezone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  wedding_id BIGINT NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  event_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(wedding_id, name)
);

CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  wedding_id BIGINT NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (email IS NULL OR email = lower(email))
);

CREATE UNIQUE INDEX guests_wedding_email_unique ON guests(wedding_id, email) WHERE email IS NOT NULL;

CREATE TABLE invitations (
  id BIGSERIAL PRIMARY KEY,
  guest_id BIGINT NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  household_count INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  mailed_at TIMESTAMPTZ,
  locked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (household_count >= 1),
  CHECK (status IN ('DRAFT', 'APPROVED', 'QUEUED', 'MAILED')),
  UNIQUE(guest_id, event_id)
);

CREATE TABLE payment_ledger (
  id BIGSERIAL PRIMARY KEY,
  wedding_id BIGINT NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
  entry_type TEXT NOT NULL,
  amount_cents INT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (entry_type IN ('DEPOSIT', 'CHARGE', 'REFUND', 'ADJUSTMENT')),
  CHECK (amount_cents <> 0)
);
