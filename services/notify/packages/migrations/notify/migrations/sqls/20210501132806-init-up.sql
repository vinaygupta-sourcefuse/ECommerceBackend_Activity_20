CREATE SCHEMA main;

SET search_path TO main,public;
GRANT ALL ON SCHEMA main TO public;

CREATE  TABLE main.notification_users ( 
	deleted              boolean DEFAULT false,
	deleted_on           timestamptz,
	deleted_by           uuid,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL,
	notification_id      uuid  NOT NULL,
	user_id              uuid  NOT NULL,
	is_read              boolean DEFAULT false,
	action_meta          text,
	is_draft			 boolean DEFAULT false,
	CONSTRAINT notification_users_pkey PRIMARY KEY ( id )
 );

CREATE  TABLE main.notifications ( 
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL,
	subject              varchar(100),
	body                 varchar(1000)  NOT NULL,
	receiver             json  NOT NULL,
	"type"               integer  NOT NULL,
	sent                 timestamptz,
	"options"            text,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
	is_draft			 boolean DEFAULT false,
	is_critical		 boolean DEFAULT false,
	group_key		   varchar(100),
	CONSTRAINT notifications_pkey PRIMARY KEY ( id )
 ) ;
