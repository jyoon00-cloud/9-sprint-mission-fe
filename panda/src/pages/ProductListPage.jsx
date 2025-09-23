import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getProducts, getBestProducts } from "../api/api";
import ProductCard from "../components/productcard";
import Pagination from "../components/pagination";
import styles from "./ProductListPage.module.css";
import { useWindowSize } from "../hooks/useWindowSize";

// 페이지 상품 배열
const getPageSize = (width) => {
  if (width < 768) return 2 * 2;
  if (width < 1200) return 3 * 2;
  return 5 * 2;
};

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { width } = useWindowSize();
  const pageSize = useMemo(() => getPageSize(width), [width]);
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleLoad = async (options) => {
    setLoading(true);
    setError(null);
    try {
      const { list = [], totalCount = 0 } =
        (await getProducts({ ...options, orderBy: options.orderBy })) || {};
      setProducts(list);
      setTotalCount(totalCount);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadBest = async () => {
    try {
      const { list = [] } = (await getBestProducts()) || {};
      setBestProducts(list.slice(0, 4));
    } catch (error) {
      console.error("베스트 상품 로딩 실패:", error);
      setError(error);
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    handleLoad({ page: 1, orderBy, keyword, pageSize });
  };

  const handleOrderByChange = (e) => {
    const nextOrderBy = e.target.value;
    setOrderBy(nextOrderBy);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    handleLoad({ page, orderBy, keyword, pageSize });
  }, [page, orderBy, keyword, pageSize]);

  useEffect(() => {
    handleLoadBest();
  }, []);

  // 에러 발생 시
  if (error) {
    return <p>데이터를 불러오는 데 실패했습니다: {error.message}</p>;
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>베스트 상품</h2>
        <div className={`${styles.productList} ${styles.bestList}`}>
          {bestProducts.map((product) => (
            <ProductCard key={product.id} product={product} isBest={true} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.controls}>
          <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
          <div className={styles.rightControls}>
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              <input
                name="keyword"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="검색할 상품을 입력해주세요."
                className={styles.searchInput}
              />
            </form>

            <Link to="/registration" className={styles.addButton}>
              상품 등록하기
            </Link>
            <select
              value={orderBy}
              onChange={handleOrderByChange}
              className={styles.orderBySelect}
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <div className={`${styles.productList} ${styles.fullList}`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}

export default ProductListPage;
