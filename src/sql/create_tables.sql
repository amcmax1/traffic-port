CREATE TABLE IF NOT EXISTS rawdata (
    ip character varying(512) NOT NULL,
    user_agent character varying(2048),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
                             );

CREATE TABLE IF NOT EXISTS dedata (
    ip character varying(512),
    geo character varying(512),
    connection_type character varying(512),
    vpn boolean,
    isp character varying(32),
    region character varying(512),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
                             );

ALTER TABLE dedata
ADD CONSTRAINT dedata_ip_key PRIMARY KEY (ip);

INSERT INTO rawdata (ip, user_agent, created_at)
    VALUES ('0.0.0.0', 'Good', DEFAULT);

CREATE OR REPLACE FUNCTION function_copy() RETURNS TRIGGER AS
$BODY$
BEGIN
    INSERT INTO
        dedata(ip)
        VALUES(new.ip)
        ON CONFLICT ON CONSTRAINT dedata_ip_key DO NOTHING;
        RETURN NULL;
END;
$BODY$
language plpgsql;

CREATE or REPLACE FUNCTION notify_new_ip()
    RETURNS trigger
     LANGUAGE 'plpgsql'
as $BODY$
declare
begin
    if (tg_op = 'INSERT') then

        perform pg_notify('new_ip_added',
        json_build_object(
             'ip', NEW.ip
           )::text);
    end if;

    return null;
end
$BODY$;

CREATE TRIGGER after_insert_item
    AFTER INSERT ON dedata
    FOR EACH ROW
    EXECUTE PROCEDURE notify_new_ip();

CREATE TRIGGER trig_copy
     AFTER INSERT ON rawdata
     FOR EACH ROW
     EXECUTE PROCEDURE function_copy();