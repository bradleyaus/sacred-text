/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';
import { updateRecipeValidationSchema, deleteRecipeValidationSchema, addRecipeValidationSchema } from '~/validation/recipe';
import { v4 as uuid } from 'uuid';
/**
 * Default selector for Recipe.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultRecipeSelect = Prisma.validator<Prisma.RecipeSelect>()({
  id: true,
  metadata: true,
  name: true,
  method: true,
  ingredients: {
    include: {
      ingredient: true,
    },
  },
  createdAt: true,
  updatedAt: true,
});

export const recipeRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.recipe.findMany({
        select: defaultRecipeSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const recipe = await prisma.recipe.findUnique({
        where: { id },
        select: defaultRecipeSelect,
      });
      if (!recipe) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No recipe with id '${id}'`,
        });
      }
      return recipe;
    }),
  add: publicProcedure
    .input(addRecipeValidationSchema)
    .mutation(async ({ input }) => {
      // const ingredients = await prisma.ingredient.create({
      //   data: input.ingredients
      // })

      const recipe = await prisma.recipe.create({
        data: {
          id: uuid(),
          name: input.name,
          ingredients: {
            create: input.ingredients.map((i) => ({
              ingredient: {
                connectOrCreate: {
                  where: { name_unit: {name: i.name, unit: i.unit} },
                  create: {
                    id: i.id,
                    name: i.name,
                    unit: i.unit,
                  },
                },
              },
              amount: i.amount,
            })),
          },
          method: {
            create: input.method
          }
          // select: defaultRecipeSelect,
        },
      });
      return recipe;
    }),
  update: publicProcedure
    .input(updateRecipeValidationSchema)
    .mutation(async ({ input }) => {
      const [, recipe] = await prisma.$transaction([
        prisma.recipe.deleteMany({ where: { id: input.id } }),
        prisma.recipe.create({
          data: {
            id: input.id,
            name: input.name,
            ingredients: {
              create: input.ingredients.map((i) => ({
                ingredient: {
                  connectOrCreate: {
                    where: { name_unit: {name: i.name, unit: i.unit} },
                    create: {
                      id: i.id,
                      name: i.name,
                      unit: i.unit,
                    },
                  },
                },
                amount: i.amount,
              })),
            },
            method: {
              create: input.method
            }
            // select: defaultRecipeSelect,
          },
        }),
      ]);

      return recipe;
    }),
    delete: publicProcedure
    .input(deleteRecipeValidationSchema)
    .mutation(async ({ input }) => {
      const recipe = await prisma.recipe.deleteMany({ where: { id: input.id } })
      return recipe;
    }),
});
