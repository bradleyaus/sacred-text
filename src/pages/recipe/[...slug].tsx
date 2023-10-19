import { MetadataTypes } from '@prisma/client';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from '~/pages/_app';
import { RouterOutput, trpc } from '~/utils/trpc';
import { FaEdit, FaMinus, FaPlus } from 'react-icons/fa';
import RecipeUpdate from './update';

export type RecipeByIdOutput = RouterOutput['recipe']['byId'];

function RecipeItem(props: { recipe: RecipeByIdOutput; onEdit: () => void }) {
  const { recipe } = props;

  const [multiplier, setMultiplier] = useState(1);
  const [autoConvert, setAutoConvert] = useState(false);

  return (
    <div className="flex flex-col justify-center px-8 ">
      {/* <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link> */}
      <button className="btn" onClick={props.onEdit}>
        <FaEdit />
      </button>
      <div className="join m-2">
        <p className="join-item">Multiplier {multiplier.toFixed(2)}</p>
        <button
          className="btn join-item ml-2"
          onClick={() => {
            setMultiplier(multiplier + 0.1);
          }}
        >
          <FaPlus />
        </button>
        <button
          className="btn join-item ml-2"
          onClick={() => {
            setMultiplier(multiplier - 0.1);
          }}
        >
          <FaMinus />
        </button>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Convert to grams</span>
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={(val) => setAutoConvert(!autoConvert)}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>

      <h1 className="text-6xl text-center font-bold p-10">{recipe.name}</h1>

      <em className="text-gray-400">
        Created {recipe.createdAt.toLocaleDateString('en-us')}
      </em>

      {/* <p className="py-4 break-all">{recipe.name}</p> */}

      {/* <h2 className="text-2xl font-semibold py-2">Raw data:</h2> */}
      {/* <pre className="bg-gray-900 p-4 rounded-xl overflow-x-scroll">
        {JSON.stringify(recipe, null, 4)}
      </pre> */}
      <div className="flex flex-col font-mono">
        <div className="items-center">
          <div className="border-t-2 border-black grid gap-x-6 p-2 grid-cols-4 justify-start justify-items-center">
            <div>
              <p>
                Servings:{' '}
                {
                  recipe.metadata.find((r) => r.type === MetadataTypes.SERVINGS)
                    ?.value
                }
              </p>
            </div>
            <div>
              <p>
                Prep time:{' '}
                {
                  recipe.metadata.find(
                    (r) => r.type === MetadataTypes.TIME_PREPARATION,
                  )?.value
                }
              </p>
            </div>
            <div>
              <p>
                Cooking time:{' '}
                {
                  recipe.metadata.find(
                    (r) => r.type === MetadataTypes.TIME_COOKING,
                  )?.value
                }
              </p>
            </div>
            <div>
              <p>
                Oven:{' '}
                {
                  recipe.metadata.find(
                    (r) => r.type === MetadataTypes.TEMPERATURE_OVEN,
                  )?.value
                }
              </p>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-black p-5 mb-auto">
          <div className="grid grid-cols-3 gap-24 overflow-y-auto">
            <div className="space-y-6">
              <h1 className="text-2xl">INGREDIENTS</h1>
              <ul className="list-disc">
                {recipe.ingredients.map((ingredient) => {
                  const amount =
                    autoConvert && !!ingredient.ingredient.gramsConversion
                      ? (
                          Number(ingredient.amount) *
                          multiplier *
                          ingredient.ingredient.gramsConversion
                        ).toFixed(2)
                      : (Number(ingredient.amount) * multiplier).toFixed(2);

                  return (
                    <li
                      className="grid gap-x-10 grid-cols-7"
                      key={ingredient.id}
                    >
                      <div className="col-span-2">
                        {amount}
                      </div>
                      <div className="col-span-1">
                        {autoConvert && !!ingredient.ingredient.gramsConversion
                          ? 'g'
                          : ingredient.ingredient.unit}
                      </div>
                      <div className="col-span-4">
                        {ingredient.ingredient.name}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 ml-10">
              <h1 className="text-2xl">METHOD</h1>
              <ul className="list-decimal pl-6">
                {recipe.method.map((m) => (
                  <li key={m.id}>{m.text}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="border-t-2 border-black p-5 content-start" >
			<div className="space-y-6">
				<h1 className="text-2xl">NOTES</h1>
				<ul className="list-disc">
					{#each recipe.notes as note}
						<li>
							{note.text}
						</li>
					{/each}
				</ul>
			</div> */}
        </div>
      </div>
    </div>
  );
}

const RecipeViewPage: NextPageWithLayout = () => {
  const slug = useRouter().query.slug as string[];
  const id = slug[0]!;

  const [editMode, setEditMode] = useState<boolean>(false);

  const recipeQuery = trpc.recipe.byId.useQuery({ id });

  if (recipeQuery.error) {
    return (
      <NextError
        title={recipeQuery.error.message}
        statusCode={recipeQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (recipeQuery.status !== 'success') {
    return (
      <div className="flex flex-col justify-center h-full px-8 ">
        <div className="w-full bg-zinc-900/70 rounded-md h-10 animate-pulse mb-2"></div>
        <div className="w-2/6 bg-zinc-900/70 rounded-md h-5 animate-pulse mb-8"></div>

        <div className="w-full bg-zinc-900/70 rounded-md h-40 animate-pulse"></div>
      </div>
    );
  }
  const { data } = recipeQuery;
  if (!editMode) {
    return <RecipeItem recipe={data} onEdit={() => setEditMode(true)} />;
  } else {
    return <RecipeUpdate recipe={data} onComplete={() => setEditMode(false)} />;
  }
};

export default RecipeViewPage;
