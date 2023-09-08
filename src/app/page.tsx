"use client";

import { gql, useMutation } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_5_POSTS_QUERY = gql`
  query get5Posts {
    posts(options: { paginate: { limit: 5, page: 1 } }) {
      data {
        id
        title
      }
    }
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation createPost {
    createPost(input: { title: "Example", body: "Hello World" }) {
      id
      title
      body
    }
  }
`;

export default function Home() {
  const { data } = useSuspenseQuery(GET_5_POSTS_QUERY, {
    context: { fetchOptions: { cache: "no-store" } },
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [{ query: GET_5_POSTS_QUERY }],
  });

  return (
    <main>
      <button onClick={() => createPost()}>Mutate</button>
      <p>{JSON.stringify(data)}</p>
    </main>
  );
}
