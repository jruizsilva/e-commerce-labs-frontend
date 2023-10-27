import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../actions";
import { validatePriceRangeForm } from "../../helpers/form-validations";

import style from "./FilterPriceRange.module.css";

const initialValidationValues = { success: false, msg: "" };
const initialFormValues = { min: "", max: "" };

export default function FilterPriceRange() {
  const [params, setParams] = useSearchParams();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialFormValues);
  const [validation, setValidation] = useState(initialValidationValues);

  const updatePriceRange = (e) => {
    e.preventDefault();
    const type = e.target.name;
    if (type === "price_range") {
      const [min, max] = e.target.id.split(",");
      params.set("min_price", min);
      params.set("max_price", max);
    }
    if (type === "min_price") {
      params.delete("max_price");
      params.set("min_price", e.target.id);
    }
    if (type === "max_price") {
      params.delete("min_price");
      params.set("max_price", e.target.id);
    }

    setParams(params);
  };
  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const { min, max } = form;
    if (min === "" && max === "") setValidation(initialValidationValues);
    if (min !== "" || max !== "") {
      const { success, msg } = validatePriceRangeForm(form);
      setTimeout(() => {
        setValidation({ success, msg });
      }, 200);
    }
  }, [form]);

  useEffect(() => {
    if (params.toString().includes("reset=true")) {
      setForm(initialFormValues);
      setParams({});
    } else {
      dispatch(getAllProducts(window.location.search, user?.id));
    }
  }, [params]);

  const handleFilterButton = (e) => {
    e.preventDefault();
    const { min, max } = form;
    if (min === "") {
      params.delete("min_price", form.max);
      params.set("max_price", form.max);
    }
    if (max === "") {
      params.delete("max_price", form.max);
      params.set("min_price", form.min);
    }
    if (max !== "" && min !== "") {
      params.set("min_price", form.min);
      params.set("max_price", form.max);
    }
    setParams(params);
  };

  return (
    <div className={style.container}>
      <h4 className={style.title}>Price</h4>
      <ul>
        <li className={style.item}>
          <a
            className={style.link}
            onClick={updatePriceRange}
            name="max_price"
            id="10000"
          >
            Up to $10.000
          </a>
        </li>
        <li className={style.item}>
          <a
            className={style.link}
            onClick={updatePriceRange}
            name="price_range"
            id="10000,30000"
          >
            $10.000 - $30.000
          </a>
        </li>
        <li className={style.item}>
          <a
            className={style.link}
            onClick={updatePriceRange}
            name="min_price"
            id="30000"
          >
            More than $30.000
          </a>
        </li>
      </ul>
      <div className={style.inputContainer}>
        <input
          placeholder="Min" // si pongo minimum, sobrepasa el tamaño del input
          onChange={updateForm}
          name="min"
          value={form.min}
          pattern="^[0-9]+$"
          style={{ maxWidth: "100%" }}
          autoComplete="off"
          className={style.input}
        />
        <input
          placeholder="Max" // si pongo maximum, sobrepasa el tamaño del input
          onChange={updateForm}
          name="max"
          value={form.max}
          pattern="^[0-9]+$"
          style={{ maxWidth: "100%" }}
          autoComplete="off"
          className={style.input}
        />
        {validation.success ? (
          <button className={style.button} onClick={handleFilterButton}>
            <span
              className="material-symbols-rounded"
              style={{ color: "white", fontSize: "24px" }}
            >
              keyboard_arrow_right
            </span>
          </button>
        ) : (
          <button
            className={style.button}
            onClick={handleFilterButton}
            disabled
          >
            <span
              className="material-symbols-rounded"
              style={{ color: "white", fontSize: "24px" }}
            >
              keyboard_arrow_right
            </span>
          </button>
        )}
        {validation.msg && <p className={style.error}>{validation.msg}</p>}
      </div>
    </div>
  );
}
