"use server";

import ENDPOINTS from "@/constants/endpoints";
import { API } from "@/lib/fetch";
import { catchError } from "@/lib/utils";
import i18next from "i18next";

// get products using this fucntion
export async function getProducts(data: {
  userId: string;
  page: number;
  rows: number;
}) {
  try {
    const { userId, page, rows } = data;
    console.log("data", userId, page, rows);
    const [success, response] = await API({
      method: "GET",
      endpoint: ENDPOINTS.products.getProducts,
      isToken: false,
    });

    console.log("response:>>", response, success);
    console.log("success:>>", success);
    // if you want convet the data into json
    // const responseData = await response!.json();
    if (success) {
      return response;
    } else {
      return {
        success: false,
        message: response.message,
        statusCode: response.statusCode || response!.status,
      };
    }
  } catch (e) {
    const errorMessage = catchError(e);
    console.log("errorMessage", errorMessage, e);
    return {
      success: false,
      message: errorMessage || i18next.t("errors.someThingWentWrongTryAgain"),
      statusCode: 500,
    };
  }
}
