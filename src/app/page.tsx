"use client";

import { gql, useMutation } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_5_POSTS_QUERY = gql`
  query countries {
    countries {
      namesdfsdf
    }
  }
`;

export default function Home() {
  const { data, error } = useSuspenseQuery(GET_5_POSTS_QUERY, {
    context: { fetchOptions: { cache: "no-store" } },
    errorPolicy: "all",
  });

  return <main>{error ? <p>Error</p> : <p>{JSON.stringify(data)}</p>}</main>;
}
