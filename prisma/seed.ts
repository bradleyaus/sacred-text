/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const firstRecipeId = '5c03994c-fc16-47e0-bd02-d218a370a078';

  // const ingredient1 = await prisma.ingredient.upsert({
  //   where: {
  //     id: '3904e645-6546-4165-8b31-427e49d0a2fa',
  //   },
  //   create: {
  //     name: 'butter',
  //     unit: 'g',
  //   },
  //   update: {},
  // });

  // await prisma.recipe.upsert({
  //   where: {
  //     id: firstRecipeId,
  //   },
  //   create: {
  //     id: firstRecipeId,
  //     name: 'Chocolate cookies',
  //     metadata: {
  //       createMany: {
  //         data: [
  //           {
  //             type: 'TEMPERATURE_OVEN',
  //             value: '163°',
  //           },
  //         ],
  //       },
  //     },
  //     ingredients: {
  //       createMany: {
  //         data: [
  //           {
  //             ingredientId: ingredient1.id,
  //             amount: "100"
  //           },
  //         ],
  //       },
  //     },
  //     method: {
  //       createMany: {
  //         data: {
  //           text: "mix dry ingredients, set aside"
  //         }
  //       }
  //     }
  //   },
  //   update: {},
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
