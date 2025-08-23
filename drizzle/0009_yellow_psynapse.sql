CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku" varchar(128),
	"title" varchar(1024) NOT NULL,
	"description" text,
	"vendor" varchar(255),
	"brand" varchar(255),
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"attributes" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "products_sku_unique" UNIQUE("sku")
);
