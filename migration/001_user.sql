-- +goose Up
-- +goose StatementBegin
CREATE OR REPLACE FUNCTION update_modified_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.modified = now();
        RETURN NEW;
    END;
    $$ language 'plpgsql';
-- +goose StatementEnd

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE monroy_user (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    middle_name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL UNIQUE,
    email_verified BOOLEAN NOT NULL DEFAULT 'false',
    password TEXT NOT NULL,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created TIMESTAMP WITH TIME ZONE DEFAULT  CURRENT_TIMESTAMP
);

CREATE TRIGGER update_user_modified BEFORE UPDATE ON monroy_user FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- +goose Down
DROP TRIGGER IF EXISTS update_user_modified ON monroy_user;
DROP TABLE monroy_user;
