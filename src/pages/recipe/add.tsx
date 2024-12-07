import { SubmitButton, useZodForm } from '~/components/Form';
import { RecipeForm } from '~/components/RecipeForm';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';
import { addRecipeValidationSchema } from '~/validation/recipe';

function RecipeCreate() {
  const utils = trpc.useContext().recipe;

  const mutation = trpc.recipe.add.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  const form = useZodForm({
    mode: 'onBlur',
    schema: addRecipeValidationSchema,
    defaultValues: {
      name: '',
      ingredients: [],
    },
  });

  return (
    <>
      <RecipeForm
        onSubmit={async (values) => {
          await mutation.mutateAsync(values);
          form.reset();
        }}
        form={form}
      />
      <SubmitButton
        form={form} // If you place the submit button outside of the form, you need to specify the form to submit
        className="btn mt-5"
      >
        Add Recipe
      </SubmitButton>
    </>
  );
}

const RecipeCreatePage: NextPageWithLayout = () => {
  return <RecipeCreate />;
};

export default RecipeCreatePage;
