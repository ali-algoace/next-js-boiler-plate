"use client";

import { getProducts } from "@/services/productsAction";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

const Products = ({ userId }: { userId: string }) => {
  // get Products
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", userId, "all"],
      queryFn: ({ pageParam = 1 }) =>
        getProducts({
          userId: "",
          page: pageParam,
          rows: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const totalFetchedItems = allPages.flatMap((page) => page.data).length;

        const totalItems = lastPage?.pagination?.totalItems;

        if (typeof totalItems !== "number" || totalItems === 0) {
          return undefined; // stop pagination if nothing there
        }

        return totalFetchedItems < totalItems ? allPages.length + 1 : undefined;
      },
    });

  // handle user Products state
  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  // For infinite scrolling Ref
  const observerRef = useRef<IntersectionObserver | null>(null);

  // For infinite scrolling
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <div className="w-full px-5 pt-5 lg:pr-8">
      <p className="font-medium text-lg text-start text-gray">All products</p>
      {allProducts?.length === 0 ? (
        <div className="h-10 mt-4 flex justify-center items-center">
          <p className="text-gray-500">No products</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-4 auto-rows-fr">
          {allProducts.map((item, index) => (
            <div key={index} className="h-full flex">
              <div className="border shadow-md rounded-2xl p-4 flex flex-col justify-between w-full">
                <p>{item?.title}</p>
                <p>{item?.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={lastElementRef}>{isFetchingNextPage && <div>Loading</div>}</div>
    </div>
  );
};

export default Products;
