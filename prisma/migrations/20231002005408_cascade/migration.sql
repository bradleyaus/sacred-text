-- DropForeignKey
ALTER TABLE "Metadata" DROP CONSTRAINT "Metadata_recipieId_fkey";

-- DropForeignKey
ALTER TABLE "Method" DROP CONSTRAINT "Method_recipieId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_recipieId_fkey";

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_recipieId_fkey" FOREIGN KEY ("recipieId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Method" ADD CONSTRAINT "Method_recipieId_fkey" FOREIGN KEY ("recipieId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_recipieId_fkey" FOREIGN KEY ("recipieId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
