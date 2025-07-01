"use client";

import { useTranslation } from "@/app/i18n/client";
import { errorSonner, successSonner } from "@/lib/toasts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IToggleProductsType {
  userId: string;
}

type ToggleProductsContext = {
  previousProductsData: unknown;
};

export const useToggleDealers = () => {
  // tan stack query
  const queryClient = useQueryClient();

  // langauge
  const { t } = useTranslation();
  const mutation = useMutation<
    void,
    Error,
    {
      body: IToggleProductsType;
    },
    ToggleProductsContext
  >({
    mutationFn: async ({ body }) => {
      //   call you api function here
      console.log("body", body);
    },
    onMutate: async ({ body }) => {
      // update your data here

      const { userId } = body;

      // Previous Products profile data
      const previousProductsData = queryClient.getQueryData([
        "products",
        userId,
        "all",
      ]);

      return {
        previousProductsData,
      };
    },
    onError: (error, { body }, context) => {
      // Rollback to previous data on error

      const { userId } = body;
      if (context?.previousProductsData) {
        queryClient.setQueryData(
          ["products", userId, "all"],
          context.previousProductsData
        );
      }

      errorSonner(error?.message);
    },
    onSettled: (data, error, variables, context) => {
      console.log("settled", data, error, variables, context);
      const { body } = variables;
      const { userId } = body;
      // Invalidate queries to refresh data after mutation
      queryClient.invalidateQueries({
        queryKey: ["products", userId, "all"],
      });
    },
    onSuccess: (data, variables, context) => {
      console.log("data", data, variables, context);

      successSonner(t("success.success"));
    },
  });

  return mutation;
};
