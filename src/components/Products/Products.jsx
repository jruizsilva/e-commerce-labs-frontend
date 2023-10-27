import style from "./Products.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCategories } from "../../actions";
import Product from "../Product/Product.jsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Spinner/Spinner";
import SectionHorizontal from "../SectionHorizontal/SectionHorizontal";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const { allProducts, loadingProducts, user } = useSelector((state) => state);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  useEffect(() => {
    dispatch(getAllProducts(window.location.search, user?.id));
    dispatch(getCategories());
  }, [dispatch, user]);

  return (
    <div className={style.container}>
      <SectionHorizontal />
      {loadingProducts ? (
        <Spinner />
      ) : allProducts && allProducts.length > 0 ? (
        <>
          <ul className={style.ul}>
            {allProducts[0] &&
              currentProducts.map((val) => {
                return <Product key={val.id} data={val} />;
              })}
          </ul>
          <Pagination
            allProducts={allProducts.length}
            pagination={pagination}
            currentPage={currentPage}
          />
        </>
      ) : (
        <p className={style.p}>No results found</p>
      )}
    </div>
  );
};

export default Products;
