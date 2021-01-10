-- +goose Up
-- +goose StatementBegin
/* Add modified update function */
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
-- +goose StatementEnd
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user(
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    password TEXT NOT NULL,
    firstname TEXT NOT NULL,
    middlename TEXT NOT NULL DEFAULT '',
    email_verified  BOOLEAN DEFAULT 'false',
    lastname TEXT NOT NULL,
    deleted TIMESTAMP  WITH TIME ZONE DEFAULT NULL,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_user_modified BEFORE UPDATE ON user FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
-- +goose Down
DROP TRIGGER IF EXISTS update_user_modified ON user;
DROP TABLE user;