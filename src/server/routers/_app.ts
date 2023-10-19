/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { recipeRouter } from './recipe';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  recipe: recipeRouter,
});

export type AppRouter = typeof appRouter;
