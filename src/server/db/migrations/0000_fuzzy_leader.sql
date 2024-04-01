CREATE TABLE IF NOT EXISTS "wall_entires" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"user_email" text NOT NULL,
	"user_pic" text NOT NULL,
	"user_message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
