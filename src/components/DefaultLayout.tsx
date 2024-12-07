import Head from 'next/head';
import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>SacredText</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full">
        <Header />
        <Sidebar />
        <div className="flex flex-col">
          <div className="py-8 ml-60 p-8 mt-32 bg-white rounded-md">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};
