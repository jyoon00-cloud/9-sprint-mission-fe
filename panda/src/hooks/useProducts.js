import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../api/api";

export function useProducts({ page, sort, query, pageSize }) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { results, totalCount } = await getProducts({
        page,
        sort,
        query,
        pageSize,
      });
      setProducts(results);
      setTotalCount(totalCount);
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, sort, query, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, totalPages, loading, error };
}
