-- DropForeignKey
ALTER TABLE "IngredientInstance" DROP CONSTRAINT "IngredientInstance_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientInstance" DROP CONSTRAINT "IngredientInstance_recipieId_fkey";

-- AddForeignKey
ALTER TABLE "IngredientInstance" ADD CONSTRAINT "IngredientInstance_recipieId_fkey" FOREIGN KEY ("recipieId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientInstance" ADD CONSTRAINT "IngredientInstance_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
