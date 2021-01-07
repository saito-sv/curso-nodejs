CREATE TABLE user (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(), 
    name TEXT,
);