import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import supabaseClient from '../utils/supabaseClient';

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await supabaseClient.from('lesson').select('id');

  if (error) {
    throw new Error('Something went wrong while fetching lesson Ids', {
      cause: error as unknown as Error
    });
  }

  const paths = data.map(({ id }) => ({
    params: {
      id: id.toString()
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<any, Params> = async (context) => {
  const { id } = context.params!;
  const { data: lesson, error } = await supabaseClient
    .from('lesson')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Something went wrong while fetching the lesson', {
      cause: error as unknown as Error
    });
  }

  return {
    props: {
      lesson
    }
  };
};

const LocationDetails: NextPage = ({ lesson }) => {
  return (
    <div>
      <Head>
        <title>Let&apos;s Learn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="w-full max-w-3xl px-8 py-16 mx-auto">
          <h1 className="mb-6 text-3xl">{lesson.title}</h1>
          <p>{lesson.description}</p>
        </div>
      </main>
    </div>
  );
};

export default LocationDetails;
