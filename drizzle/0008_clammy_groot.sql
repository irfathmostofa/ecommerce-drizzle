CREATE TABLE "channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"key_name" varchar(100) NOT NULL,
	"display_name" varchar(255) NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "channels_key_name_unique" UNIQUE("key_name")
);
