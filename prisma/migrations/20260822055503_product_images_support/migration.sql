/*
  Warnings:

  - You are about to drop the column `banner_image` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `banner_public_id` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "banner_image",
DROP COLUMN "banner_public_id";

-- CreateTable
CREATE TABLE "project_images" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
