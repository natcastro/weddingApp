-- Seed data for dinocamp (insert order: parents before children)

-- 2 users
INSERT INTO users (email, password_hash, first_name, last_name, phone, created_at) VALUES
  ('jane.smith@example.com', '$2a$10$placeholder_hash_1', 'Jane', 'Smith', '555-101-0001', now()),
  ('john.doe@example.com', '$2a$10$placeholder_hash_2', 'John', 'Doe', '555-102-0002', now());

-- 1 wedding (owned by user 1)
INSERT INTO weddings (owner_user_id, title, wedding_date, venue_name, timezone, created_at) VALUES
  (1, 'Smith & Doe Wedding', '2025-08-15', 'Mountain View Gardens', 'America/Denver', now());

-- 3 events (unique names per wedding)
INSERT INTO events (wedding_id, name, event_date, created_at) VALUES
  (1, 'Save the Date', '2025-06-01', now()),
  (1, 'Ceremony', '2025-08-15', now()),
  (1, 'Reception', '2025-08-15', now());

-- 8 guests
INSERT INTO guests (wedding_id, first_name, last_name, email, phone, address_line1, address_line2, city, state, postal_code, created_at) VALUES
  (1, 'Emily', 'Johnson', 'emily.johnson@example.com', '555-201-0001', '123 Oak St', NULL, 'Denver', 'CO', '80202', now()),
  (1, 'Michael', 'Williams', 'michael.w@example.com', '555-202-0002', '456 Pine Ave', 'Apt 2B', 'Boulder', 'CO', '80301', now()),
  (1, 'Sarah', 'Brown', NULL, '555-203-0003', '789 Elm Rd', NULL, 'Fort Collins', 'CO', '80521', now()),
  (1, 'David', 'Davis', 'david.davis@example.com', NULL, NULL, NULL, NULL, NULL, NULL, now()),
  (1, 'Jessica', 'Miller', 'jessica.m@example.com', '555-205-0005', '321 Maple Dr', NULL, 'Denver', 'CO', '80210', now()),
  (1, 'Robert', 'Wilson', NULL, '555-206-0006', '654 Cedar Ln', NULL, 'Aurora', 'CO', '80012', now()),
  (1, 'Amanda', 'Taylor', 'amanda.taylor@example.com', '555-207-0007', '987 Birch St', 'Suite 100', 'Lakewood', 'CO', '80226', now()),
  (1, 'Christopher', 'Anderson', 'chris.anderson@example.com', '555-208-0008', NULL, NULL, NULL, NULL, NULL, now());

-- invitations (many-to-many: guests <-> events; mix of statuses; at least 1 MAILED with mailed_at + locked_at)
INSERT INTO invitations (guest_id, event_id, household_count, status, mailed_at, locked_at, created_at) VALUES
  (1, 1, 2, 'MAILED', '2025-05-01 10:00:00-06', '2025-05-01 10:00:00-06', now()),
  (1, 2, 2, 'APPROVED', NULL, NULL, now()),
  (1, 3, 2, 'APPROVED', NULL, NULL, now()),
  (2, 1, 1, 'MAILED', '2025-05-02 14:30:00-06', '2025-05-02 14:30:00-06', now()),
  (2, 2, 1, 'QUEUED', NULL, NULL, now()),
  (2, 3, 1, 'QUEUED', NULL, NULL, now()),
  (3, 1, 3, 'DRAFT', NULL, NULL, now()),
  (3, 2, 3, 'DRAFT', NULL, NULL, now()),
  (3, 3, 3, 'DRAFT', NULL, NULL, now()),
  (4, 1, 1, 'APPROVED', NULL, NULL, now()),
  (4, 2, 1, 'DRAFT', NULL, NULL, now()),
  (5, 1, 2, 'MAILED', '2025-05-03 09:00:00-06', '2025-05-03 09:00:00-06', now()),
  (5, 2, 2, 'APPROVED', NULL, NULL, now()),
  (6, 1, 1, 'DRAFT', NULL, NULL, now()),
  (7, 1, 4, 'APPROVED', NULL, NULL, now()),
  (7, 2, 4, 'DRAFT', NULL, NULL, now()),
  (8, 1, 1, 'QUEUED', NULL, NULL, now());

-- 3 payment_ledger entries (deposit, charge, adjustment/refund)
INSERT INTO payment_ledger (wedding_id, entry_type, amount_cents, note, created_at) VALUES
  (1, 'DEPOSIT', 50000, 'Initial deposit for venue', now()),
  (1, 'CHARGE', -25000, 'Invitation printing', now()),
  (1, 'REFUND', 5000, 'Catering adjustment', now());
