CREATE TABLE "admin_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"username" varchar(255),
	"type" varchar(255),
	"hashPassword" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "hashPassword" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(225) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";