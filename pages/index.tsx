import type { GetStaticProps, NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../context/userContext';
import supabaseClient from '../utils/supabaseClient';

export const getStaticProps: GetStaticProps<{ lessons: any[] }> = async () => {
  const { data: lessons, error } = await supabaseClient
    .from('lesson')
    .select('*');
  if (error) {
    throw new Error('Something went wrong while fetching lessons', {
      cause: error as unknown as Error
    });
  }
  return {
    props: {
      lessons
    }
  };
};

const Home: NextPage<{ lessons: any[] }> = ({ lessons }) => {
  const { user } = useUser();

  console.log('user', user);

  return (
    <div>
      <Head>
        <title>Let&apos;s Learn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full max-w-3xl px-2 mx-auto my-16">
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/${lesson.id}`}>
            <a className="flex h-40 p-8 mb-4 text-xl font-bold rounded shadow">
              {lesson.title}
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Home;
