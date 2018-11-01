INSERT INTO users (id, name) VALUES
  (0, 'nlnet'),
  (1, 'michiel'),
  (2, 'chris'),
  (3, 'vincent'),
  (4, 'madeline'),
  (5, 'jimm'),
  (6, 'hugo'),
  (7, 'pierre'),
  (8, 'matti'),
  (9, 'martin');

-- ledger unit is euro cents, so amount 1000 is 10,00 EUR.
INSERT INTO ledger (user_id, direction, amount, status) VALUES
  (0, 'incoming', 1120000, 'accepted'),
  (1, 'incoming', 29125, 'accepted'),
  (2, 'incoming', 4000, 'accepted'),
  (3, 'incoming', 6000, 'accepted'),
  (4, 'incoming', 9000, 'accepted'),
  (5, 'incoming', 16000, 'accepted'),
  (6, 'incoming', 30909, 'accepted'),
  (7, 'outgoing', 6000, 'accepted'),
  (9, 'outgoing', 22000, 'accepted');

INSERT INTO ledger (user_id, direction, amount, status) VALUES
  (9, 'incoming', 22000, 'accepted'),
  (1, 'outgoing', 22000, 'accepted');

INSERT INTO ledger (user_id, direction, amount, status) VALUES
  (1, 'outgoing', 1800, 'accepted');

INSERT INTO ledger (user_id, direction, amount, status) VALUES
  (1, 'outgoing', 8715, 'accepted');

INSERT INTO ledger (user_id, direction, amount, status) VALUES
  (8, 'outgoing', 3500, 'accepted');
