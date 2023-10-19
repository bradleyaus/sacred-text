import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';
import { Fragment } from 'react';

const IndexPage: NextPageWithLayout = () => {
  const recipesQuery = trpc.recipe.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  // prefetch all recipes for instant navigation
  // useEffect(() => {
  //   const allRecipes = recipesQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allRecipes) {
  //     void utils.recipe.byId.prefetch({ id });
  //   }
  // }, [recipesQuery.data, utils]);

  return (
    <>
      <div>
        <div className="flex flex-col items-start gap-y-2">
          <div className="flex flex-col"></div>
          <h2 className="text-3xl font-semibold">
            Latest Recipes
            {recipesQuery.status === 'loading' && '(loading)'}
          </h2>

          <button
            className="bg-gray-900 p-2 rounded-md font-semibold disabled:bg-gray-700 disabled:text-gray-400"
            onClick={() => recipesQuery.fetchPreviousPage()}
            disabled={
              !recipesQuery.hasPreviousPage ||
              recipesQuery.isFetchingPreviousPage
            }
          >
            {recipesQuery.isFetchingPreviousPage
              ? 'Loading more...'
              : recipesQuery.hasPreviousPage
              ? 'Load More'
              : 'Nothing more to load'}
          </button>

          {recipesQuery.data?.pages.map((page, index) => (
            <Fragment key={page.items[0]?.id ?? index}>
              {page.items.map((item) => (
                <article key={item.id}>
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                  <Link className="text-gray-400" href={`/recipe/${item.id}`}>
                    View more
                  </Link>
                </article>
              ))}
            </Fragment>
          ))}
        </div>

        <hr />
      </div>
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.recipe.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
