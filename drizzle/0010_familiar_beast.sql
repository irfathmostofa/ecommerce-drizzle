CREATE TABLE "variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"sku" varchar(128),
	"barcode" varchar(128),
	"price" numeric(12, 2) DEFAULT '0' NOT NULL,
	"msrp" numeric(12, 2),
	"compare_at_price" numeric(12, 2),
	"dimensions" jsonb,
	"attributes" jsonb DEFAULT '{}'::jsonb,
	"position" integer DEFAULT 0,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;