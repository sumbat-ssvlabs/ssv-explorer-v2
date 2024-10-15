import type { Pagination } from "@/src/lib/types/api";

export const createDefaultPagination = (
  options: Partial<Pagination> = {},
): Pagination => ({
  page: 1,
  pages: 1,
  per_page: 10,
  total: 0,
  ...options,
});
