import { Link } from "react-router-dom";
import BtnAddCart from "../Cart/BtnAddCart/BtnAddCart.jsx";
import style from "./Product.module.css";
import { Image } from "cloudinary-react";

const Product = ({ data }) => {
  return (
    <li className={style.productItem}>
      <article className={style.productContainer}>
        <Link
          to={`/details/${data.id}`}
          className={style.image_container}
          title={data.name}
        >
          {data.public_id ? (
            <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={data.public_id}
              crop="scale"
              className={style.imageUploaded}
              alt={`${data.name}`}
            />
          ) : (
            <img
              src={data.image}
              className={style.image}
              alt={`${data.name}`}
            />
          )}
        </Link>
        <div className={style.description}>
          <h3 className={style.title}>$ {data.price}</h3>
          <p className={style.p}>{data.name}</p>
          <div className={style.btnAddCart}>
            <BtnAddCart data={data}/>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Product;
