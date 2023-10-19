import { useRouter } from 'next/navigation';
import { SubmitButton, useZodForm } from '~/components/Form';
import { RecipeForm } from '~/components/RecipeForm';
import { trpc } from '~/utils/trpc';
import { updateRecipeValidationSchema } from '~/validation/recipe';
import { RecipeByIdOutput } from './[...slug]';

function RecipeUpdate(props: {
  recipe: RecipeByIdOutput;
  onComplete: () => void;
}) {
  const router = useRouter()
  const utils = trpc.useContext().recipe;
  const data = props.recipe;
  const updateMutation = trpc.recipe.update.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
      await utils.byId.invalidate({ id: data.id });
    },
  });

  const deleteMutation = trpc.recipe.delete.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
      await utils.byId.invalidate({ id: data.id });
    },
  });

  const form = useZodForm({
    mode: 'onBlur',
    schema: updateRecipeValidationSchema,
    defaultValues: {
      ...data,
      ingredients: data.ingredients.map((r) => ({
        ...r.ingredient,
        amount: r.amount,
      })),
    },
  });

  return (
    <>
      <RecipeForm
        onSubmit={async (values) => {
          await updateMutation.mutateAsync({ ...values, id: data.id });
          props.onComplete();
        }}
        form={form}
      />
      <SubmitButton
        form={form} // If you place the submit button outside of the form, you need to specify the form to submit
        className="btn btn-primary mt-5"
      >
        Update Recipe
      </SubmitButton>
      <button
        className="btn btn-secondary ml-2"
        onClick={async () => {
          await deleteMutation.mutateAsync({ id: data.id });
          router.push("/")
        }}
      >
        Delete
      </button>
    </>
  );
}

export default RecipeUpdate;
