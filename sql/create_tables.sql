CREATE TABLE IF NOT EXISTS rawdata (
    ip character varying(512) NOT NULL,
    user_agent character varying(2048),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
                             );

CREATE TABLE IF NOT EXISTS dedata (
    ip character varying(512) NOT NULL,
    geo character varying(512),
    connection_type character varying(512),
    vpn boolean,
    isp character varying(32),
    region character varying(512),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
                             );