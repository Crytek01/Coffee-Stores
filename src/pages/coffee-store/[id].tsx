import { useEffect, useState } from "react";
import { useCoffeeStores } from "@common/contexts/coffee-stores/coffee-stores.context";
import { useCoffeeStore } from "@common/hooks/use-coffee-store/use-coffee-store.hook";
import { ICoffeeStore } from "@common/lib/coffee-stores/coffee-stores.model";
import { fetchCoffeeStores } from "@common/lib/coffee-stores/coffee-stores.service";
import { isObjectEmpty } from "@common/utils/predicates";
import classNames from "classnames";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./coffee-stores.module.css";

export const getStaticProps: GetStaticProps = async (context) => {
  const coffeeStores = await fetchCoffeeStores();

  const idParam = context.params?.id?.toString() ?? "";

  const storeById =
    coffeeStores.find((store) => store.fsq_id === idParam) ?? {};

  return {
    props: {
      coffeeStore: storeById,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((store) => ({
    params: {
      id: store.fsq_id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface IPageProps {
  coffeeStore: ICoffeeStore;
}

const coffeeStoreInfoWrapperStyles = classNames("glass", styles.col2);

const CoffeeStore: NextPage<IPageProps> = (initialProps) => {
  const router = useRouter();

  const routerQueryId = router.query.id?.toString() ?? "";

  const { data: apiResponse } = useCoffeeStore(
    routerQueryId,
    initialProps.coffeeStore,
    {
      refreshInterval: 2000,
    }
  );

  const [coffeeStore, setCoffeeStore] = useState<ICoffeeStore>(
    initialProps.coffeeStore
  );

  const {
    state: { coffeeStores: contextCoffeeStores },
  } = useCoffeeStores();

  const [votingCount, setVotingCount] = useState<number>(
    initialProps.coffeeStore?.voting ?? 0
  );

  const handleUpVoteButton = async () => {
    try {
      const response = await fetch(`/api/coffee-stores/${routerQueryId}`, {
        method: "PUT",
      });

      if (!response.ok) {
        return;
      }

      setVotingCount((vote) => ++vote);
    } catch (error) {}
  };

  const handleCreateCoffeeStore = async (coffeeStore: ICoffeeStore) => {
    try {
      const response = await fetch("/api/coffee-stores/create", {
        method: "POST",
        body: JSON.stringify(coffeeStore),
      });

      if (!response.ok) {
        return;
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!apiResponse) {
      return;
    }

    const { data } = apiResponse;

    if (!data) {
      return;
    }

    setCoffeeStore(data);
    setVotingCount(data?.voting ?? 0);
  }, [apiResponse]);

  useEffect(() => {
    let isUnmounted: boolean = false;

    (async () => {
      if (isUnmounted) {
        return;
      }

      if (!isObjectEmpty(coffeeStore)) {
        //Static generated page, initial props comes from getStaticProps
        //In this case we will safe the coffee store in Airtable too

        return await handleCreateCoffeeStore(initialProps.coffeeStore);
      }

      if (!contextCoffeeStores?.length) {
        return;
      }

      const coffeeStoreFromContext = contextCoffeeStores.find(
        (store) => store.fsq_id === routerQueryId
      );

      if (!coffeeStoreFromContext) {
        return;
      }
      setCoffeeStore(coffeeStoreFromContext);
      handleCreateCoffeeStore(coffeeStoreFromContext);
    })();

    return () => {
      isUnmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    name = "",
    imgUrl = "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    location = { region: "", address: "" },
  } = coffeeStore ?? {};

  const { region, address } = location;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to home</Link>
          </div>

          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>

          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
            priority={true}
          />
        </div>

        <div className={coffeeStoreInfoWrapperStyles}>
          {location?.address ? (
            <div className={styles.iconWrapper}>
              <Image
                src="/icons/places.svg"
                width={24}
                height={24}
                alt="Icon"
              />

              <p className={styles.text}>{address}</p>
            </div>
          ) : null}

          {region ? (
            <div className={styles.iconWrapper}>
              <Image
                src="/icons/nearMe.svg"
                width={24}
                height={24}
                alt="Icon"
              />

              <p className={styles.text}>{region}</p>
            </div>
          ) : null}

          <div className={styles.iconWrapper}>
            <Image src="/icons/stars.svg" width={24} height={24} alt="Icon" />

            <p className={styles.text}>{votingCount}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
