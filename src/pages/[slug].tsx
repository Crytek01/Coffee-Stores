import Head from "next/head";
import { useRouter } from "next/router";

const AnyRoute = () => {
  const router = useRouter();

  const query = router.query?.slug;
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      Hi there from dynamic route: {query}
    </div>
  );
};

export default AnyRoute;
