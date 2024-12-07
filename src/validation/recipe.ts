import { z } from 'zod';

export const addRecipeValidationSchema = z.object({
  name: z.string().min(2),
  ingredients: z
    .object({
      id: z.string(),
      name: z.string().min(1),
      unit: z.string().min(1),
      amount: z.string().min(1),
    })
    .array(),
  method: z
    .object({
      id: z.string(),
      text: z.string().min(1),
    })
    .array(),
});

export const updateRecipeValidationSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  ingredients: z
    .object({
      id: z.string(),
      name: z.string().min(1),
      unit: z.string().min(1),
      amount: z.string().min(1),
    })
    .array(),
  method: z
    .object({
      id: z.string(),
      text: z.string().min(1),
    })
    .array(),
});

export const deleteRecipeValidationSchema = z.object({
  id: z.string(),
});
