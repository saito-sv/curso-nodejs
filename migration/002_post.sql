--+goose Up
CREATE TABLE post (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(), 
    title TEXT,
);

--+goose Down

DROP TABLE post;