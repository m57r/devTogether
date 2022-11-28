BEGIN; 

DROP TABLE IF EXISTS 
"user", "language", "role", "message", "technology", "category", "project", "kanban", "list", "card", "tag", "recommendation", 
"category_has_technology", "master", "follow", "speak", "assigned", "favorite", "take_stand", "work_on", "use", "card_has_tag"; 

/* Table user */
CREATE TABLE IF NOT EXISTS "user"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL, 
    "email" TEXT NOT NULL,  
    "password" TEXT NOT NULL, 
    "avatar" TEXT NULL, 
    "active" BOOLEAN NOT NULL DEFAULT 'true', 
    "speciality" TEXT NOT NULL, 
    "linkedin_link" TEXT NULL, 
    "github_link" TEXT NULL, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ
); 

/* Table language */
CREATE TABLE IF NOT EXISTS "language"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ
); 

/* Table role */
CREATE TABLE IF NOT EXISTS "role"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ
); 

/* Table technology */
CREATE TABLE IF NOT EXISTS "technology"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL, 
    "color" TEXT NOT NULL, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ
); 

/* Table category */
CREATE TABLE IF NOT EXISTS "category"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ
); 

/* Table project */ 
CREATE TABLE IF NOT EXISTS "project"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL, 
    "description" TEXT NOT NULL, 
    "team_description" TEXT NOT NULL, 
    "repo_github" TEXT NOT NULL, 
    "recruiting" BOOLEAN NOT NULL DEFAULT 'true', 
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ
); 

/* Table message : create after project because message has "project" foreign key inside */
CREATE TABLE IF NOT EXISTS "message"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    "user_id" INT NOT NULL REFERENCES "user"("id"), 
    "project_id" INT NOT NULL REFERENCES "project"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ
); 

/* Table kanban */
CREATE TABLE IF NOT EXISTS "kanban"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    "project_id" INT NOT NULL REFERENCES "project"("id")  ON DELETE CASCADE,  --when we delete project, we delete the kanban project
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ
); 

/* Table list */
CREATE TABLE IF NOT EXISTS "list" (
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "kanban_id" INT NOT NULL REFERENCES "kanban"("id") ON DELETE CASCADE, --when we delete kanban, we delete all the associated list
	"name" TEXT NOT NULL UNIQUE,
	"position" INT NOT NULL DEFAULT 0,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMPTZ
);

/* Table card */
CREATE TABLE IF NOT EXISTS "card" (
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"content" TEXT NOT NULL UNIQUE,
	"position" INT NOT NULL DEFAULT 0,
	"color" TEXT NOT NULL DEFAULT '#FFFFFF',
	"list_id" INT NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMPTZ
);

/* Table tag */
CREATE TABLE IF NOT EXISTS "tag" (
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE,
	"color" TEXT NOT NULL DEFAULT '#FFFFFF',
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMPTZ
);

/* ASSOCIATIONS TABLE */

/* Table recommendation */
CREATE TABLE IF NOT EXISTS "recommendation"(
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "recommended_user_id" REFERENCES "user"("id") ON DELETE CASCADE, 
    "content" TEXT NOT NULL ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    "updated_at" TIMESTAMPTZ,
    PRIMARY KEY ("user_id", "recommended_user_id") -- On associe les deux champs id en tant que clé primaire
);

/* Table category_has_technology */
CREATE TABLE IF NOT EXISTS "category_has_technology"(
   "technology_id" INT NOT NULL REFERENCES "technology"("id") ON DELETE CASCADE, 
    "category_id" INT NOT NULL REFERENCES "category"("id") ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("technology_id", "category_id")
);

/* Table master */
CREATE TABLE IF NOT EXISTS "master"(
   "technology_id" INT NOT NULL REFERENCES "technology"("id") ON DELETE CASCADE, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("technology_id", "user_id")
);

/* Table follow */
CREATE TABLE IF NOT EXISTS "follow"(
    "follower_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("follower_id", "user_id")
);

/* Table speak */
CREATE TABLE IF NOT EXISTS "speak"(
    "language_id" INT NOT NULL REFERENCES "language"("id") ON DELETE CASCADE, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("language_id", "user_id")
);

/* Table assigned */
CREATE TABLE IF NOT EXISTS "assigned"(
    "card_id" INT NOT NULL REFERENCES "card"("id") ON DELETE CASCADE, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("card_id", "user_id")
);

/* Table favorite */
CREATE TABLE IF NOT EXISTS "favorite"(
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("project_id", "user_id")
);

/* Table take_stand */
CREATE TABLE IF NOT EXISTS "take_stand"(
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "status" TEXT NOT NULL DEFAULT "waiting" ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("project_id", "user_id")
);

/* Table work_on */
CREATE TABLE IF NOT EXISTS "work_on"(
    "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "role_id" INT NOT NULL REFERENCES "role"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("project_id", "user_id", "role_id")
);

/* Table use */
CREATE TABLE IF NOT EXISTS "use"(
    "technology_id" INT NOT NULL REFERENCES "technology"("id") ON DELETE CASCADE, 
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("project_id", "user_id")
);

/* Card has tag */
CREATE TABLE IF NOT EXISTS "card_has_tag"(
    "card_id" INT NOT NULL REFERENCES "card"("id") ON DELETE CASCADE, 
    "tag_id" INT NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    PRIMARY KEY ("card_id", "tag_id")
);

COMMIT; 

