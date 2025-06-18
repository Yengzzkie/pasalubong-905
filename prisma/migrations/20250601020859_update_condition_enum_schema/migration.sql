/*
  Warnings:

  - The values [REFURBISHED,DAMAGED,FOR_REUSE] on the enum `Condition` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Condition_new" AS ENUM ('NEW', 'USED_LIKE_NEW', 'USED_VERY_GOOD', 'USED_GOOD', 'USED_ACCEPTABLE', 'FOR_PARTS', 'FOR_REPAIR', 'FOR_SCRAP', 'FOR_RECYCLING');
ALTER TABLE "Post" ALTER COLUMN "condition" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "condition" TYPE "Condition_new" USING ("condition"::text::"Condition_new");
ALTER TYPE "Condition" RENAME TO "Condition_old";
ALTER TYPE "Condition_new" RENAME TO "Condition";
DROP TYPE "Condition_old";
ALTER TABLE "Post" ALTER COLUMN "condition" SET DEFAULT 'USED_GOOD';
COMMIT;
