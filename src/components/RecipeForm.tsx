import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import { Form, UseZodForm } from './Form';
import { useFieldArray } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { z } from 'zod';
import { updateRecipeValidationSchema } from '~/validation/recipe';

export function RecipeForm(props: {
  form: UseZodForm<z.infer<typeof updateRecipeValidationSchema>>;
  onSubmit: (
    values: z.infer<typeof updateRecipeValidationSchema>,
  ) => Promise<void>;
}) {
  const form = props.form;

  const ingredientsArray = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const methodArray = useFieldArray({
    control: form.control,
    name: 'method',
  });

  return (
    <>
      <Form form={form} handleSubmit={props.onSubmit} className="form-inline">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </label>
          <input
            {...form.register('name')}
            className={clsx(
              'input input-bordered w-full max-w-xs',
              form.formState.errors.name?.message && 'input-error',
            )}
          />

          <label className="label">
            {form.formState.errors.name?.message && (
              <span className="label-text-alt text-red-700">
                {form.formState.errors.name?.message}
              </span>
            )}
          </label>

          <h1 className="text-2xl pb-2">Ingredients</h1>
          {ingredientsArray.fields.map((field, index) => {
            const inputs = ['name', 'unit', 'amount'] as const;

            return (
              <div
                key={field.id}
                className="w-max"
              >
                <div className="join">
                  {inputs.map((name) => {
                    return (
                      <div
                        className={clsx(
                          'tooltip tooltip-error',
                          form.formState.errors.ingredients?.[index]?.[name]
                            ?.message && 'tooltip-open ',
                        )}
                        data-tip={
                          form.formState.errors.ingredients?.[index]?.[name]
                            ?.message
                        }
                      >
                        <input
                          className={clsx(
                            'join-item input input-bordered',
                            form.formState.errors.ingredients?.[index]?.[name]
                              ?.message && 'input-error',
                          )}
                          placeholder={name}
                          {...form.register(`ingredients.${index}.${name}`)}
                        />
                      </div>
                    );
                  })}
                  
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      ingredientsArray.remove(index);
                    }}
                  >
                    {' '}
                    <FaTrash size="18"></FaTrash>
                  </button>
                </div>

              </div>
            );
          })}
          <button
            className="btn btn-accent"
            onClick={(e) => {
              e.preventDefault();
              ingredientsArray.append({ id: uuid() });
            }}
          >
            Add Ingredient
          </button>
          <h1 className="text-2xl pb-2">Method</h1>
          {methodArray.fields.map((field, index) => {
            const fieldError =
              form.formState.errors.method?.[index]?.text?.message;

            return (
              <div key={field.id}>
                <div className="join p-1">
                  <input
                    className={clsx(
                      'join-item input input-bordered ml-1 ',
                      form.formState.errors.method?.[index]?.text?.message &&
                        'input-error',
                    )}
                    placeholder="Text"
                    {...form.register(`method.${index}.text`)}
                  />
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      methodArray.remove(index);
                    }}
                  >
                    {' '}
                    <FaTrash size="18"></FaTrash>
                  </button>
                </div>

                <label className="label">
                  {fieldError && (
                    <span className="label-text-alt text-red-700">
                      {fieldError}
                    </span>
                  )}
                </label>
              </div>
            );
          })}

          <button
            className="btn btn-accent"
            onClick={(e) => {
              e.preventDefault();
              methodArray.append({ id: uuid() });
            }}
          >
            Add Method
          </button>
        </div>
      </Form>
    </>
  );
}
