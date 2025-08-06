import GetService from "@/services/server/GetService";
import { createTRPCRouter, privateProcedure } from "../../init";

export const filterRouter = createTRPCRouter({
  getCategories: privateProcedure.query(async () => {
    const categories = await GetService.getCategories();

    return {
      categories,
    };
  }),
});
