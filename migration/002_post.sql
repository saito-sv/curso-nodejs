-- +goose Up
CREATE TABLE post (
 id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(), 
 title TEXT NOT NULL,
 body TEXT NOT NULL,
 user_id UUID REFERENCES monroy_user(id) NOT NULL,
 modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 created TIMESTAMP WITH TIME ZONE DEFAULT  CURRENT_TIMESTAMP
);

CREATE TRIGGER update_post_modified BEFORE UPDATE ON post FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE INDEX post_user_id_fk ON post(user_id);

-- +goose Down
DROP TRIGGER IF EXISTS update_post_modified ON post;
DROP INDEX post_user_id_fk;
DROP TABLE post;