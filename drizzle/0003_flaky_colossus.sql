ALTER TABLE "admin_user" ADD COLUMN "password" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_by" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_by" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "admin_user" DROP COLUMN "hashPassword";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "hashPassword";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "createdby";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updateby";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updateat";