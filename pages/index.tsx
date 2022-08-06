import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Let&apos;s Learn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold">Welcome to Let&apos;s Learn</h1>
      </main>
    </div>
  );
};

export default Home;
