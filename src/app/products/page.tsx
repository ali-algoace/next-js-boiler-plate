import Products from "@/components/Products/Products";
import { getQueryClient } from "@/hooks/get-query-client";
import { getProducts } from "@/services/productsAction";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

type PageData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  total?: number;
  totalItems?: number;
};

export type Page = Record<string, PageData>;

const ProductsPage = async () => {
  // userId
  const userId = "";

  // tankstack query
  const queryClient = getQueryClient();

  // get products
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products", userId, "all"],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({
        userId: "",
        page: pageParam,
        rows: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Page, allPages: Page[]) => {
      const totalFetchedItems = allPages.flatMap((page) => page.data).length;

      const totalItems = lastPage?.pagination?.totalItems;

      if (typeof totalItems !== "number" || totalItems === 0) {
        return undefined; // stop pagination if nothing there
      }

      return totalFetchedItems < totalItems ? allPages.length + 1 : undefined;
    },
  });
  return (
    <Suspense fallback={<div>Loading</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Products userId={userId} />
      </HydrationBoundary>
    </Suspense>
  );
};

export default ProductsPage;
