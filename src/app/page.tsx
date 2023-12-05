"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_5_POSTS_TITLES_QUERY = gql`
  query get5PostsTitleOnly {
    posts(options: { paginate: { limit: 5, page: 1 } }) {
      data {
        id
        title
      }
    }
  }
`;

export default function Home() {
  const { data } = useSuspenseQuery(GET_5_POSTS_TITLES_QUERY, {
    context: {
      fetchOptions: {
        next: {
          revalidate: 86400,
        },
      },
    },
  });

  return <div>{JSON.stringify(data)}</div>;
}
