import {
  GET_ALL_PRODUCTS,
  GET_USER,
  GET_NAME_PRODUCT,
  SORT_BY_VALUE,
  GET_CATEGORIES,
  LOADING_PRODUCTS,
  LOADING_USER,
  UPDATE_GOOGLE_AUTH_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  SET_REGISTER_ERROR_MESSAGE,
  SET_REGISTER_SUCCESS_MESSAGE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  ADD_QUESTION,
  GET_QUESTIONS_WITH_ANSWERS,
  ADD_TO_CART,
  ADD_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  ADD_ORDER,
  UPDATE_CART_SUCCESS_MESSAGE,
  UPDATE_CART_ERROR_MESSAGE,
  GET_USER_PUBLICATIONS,
  SET_PRODUCT_TO_EDIT,
  SET_EDIT_INITIAL_VALUES,
  RESET_MESSAGES,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  RESTORE_PASSWORD_SUCCESS_MESSAGE,
  RESTORE_PASSWORD_ERROR_MESSAGE,
  MERCADO_PAGO,
  MY_PURCHASES,
  UPDATE_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS_BY_PRODUCT,
  FETCH_ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_ERROR,
  GET_PRODUCT_REVIEWS,
  GET_MY_SALES,
  SET_SALE_TO_EDIT,
  SET_SALE_INITIAL_VALUE,
  UPDATE_SALE_REQUEST,
  UPDATE_SALE_SUCCESS,
  UPDATE_SALE_ERROR,
  GET_ORDER_DETAIL,
  GET_ALL_USERS,
  GET_SALES_PAYABLE
} from "../actions/types";

const initialState = {
  allProducts: [],
  allProductsCopy: [],
  categories: [],
  user: null,
  searchUser: true,
  loadingProducts: false,
  questionsWithAnswers: [],
  notifications: [],
  googleAuthErrorMessage: "",
  registerErrorMessage: "",
  registerSuccessMessage: "",
  loginErrorMessage: "",
  order: {},
  cart: {},
  cartSuccessMessage: "",
  cartErrorMessage: "",
  loadingProductCreation: false,
  successCreationMessage: "",
  errorCreationMessage: "",
  userPublications: [],
  productToEdit: null,
  editInitialValues: null,
  loadingUpdateProduct: false,
  successEditMessage: "",
  errorEditMessage: "",
  restorePasswordSuccessMessage: "",
  restorePasswordErrorMessage: "",
  mercadopago: null,
  myPurchases: [],
  addReviewLoading: false,
  addReviewSuccessMessage: "",
  addReviewErrorMessage: "",
  productReviews: [],
  mySales: [],
  saleToEdit: null,
  editSaleInitialValue: null,
  successSaleEdit: "",
  errorSaleEdit: "",
  orderDetail: {},
  allUsers: [],
  salesPayable: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_PRODUCTS:
      let products = state.allProductsCopy.length
        ? state.allProductsCopy
        : actions.payload;
      return {
        ...state,
        allProducts: actions.payload,
        allProductsCopy: products,
      };
    case GET_USER:
      return {
        ...state,
        user: actions.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
      };
    case GET_QUESTIONS_WITH_ANSWERS:
      return {
        ...state,
        questionsWithAnswers: actions.payload,
      };
    case ADD_QUESTION:
      return {
        ...state,
      };
    case ADD_NOTIFICATIONS:
      return {
        ...state,
      };
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
      };
    case UPDATE_NOTIFICATIONS_BY_PRODUCT:
      return {
        ...state,
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: actions.payload,
      };
    case SORT_BY_VALUE:
      const info = state.allProducts;
      const sortedArr =
        actions.payload === "AZ"
          ? info.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : actions.payload === "ZA"
          ? info.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            })
          : actions.payload === "HIGH"
          ? info.sort(function (a, b) {
              if (Number(a.price) > Number(b.price)) return -1;
              if (Number(b.price) > Number(a.price)) return 1;
              return 0;
            })
          : info.sort(function (a, b) {
              if (Number(a.price) > Number(b.price)) return 1;
              if (Number(b.price) > Number(a.price)) return -1;
              return 0;
            });
      return {
        ...state,
        allProducts: sortedArr,
      };
    case GET_NAME_PRODUCT:
      return {
        ...state,
        allProducts: actions.payload,
      };
    case LOADING_PRODUCTS:
      return {
        ...state,
        loadingProducts: actions.payload,
      };
    case UPDATE_GOOGLE_AUTH_ERROR_MESSAGE:
      return {
        ...state,
        googleAuthErrorMessage: actions.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: actions.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        searchUser: actions.payload,
      };
    case LOGIN_ERROR_MESSAGE:
      return { ...state, loginErrorMessage: actions.payload };

    case RESTORE_PASSWORD_SUCCESS_MESSAGE:
      return { ...state, restorePasswordSuccessMessage: actions.payload };
    case RESTORE_PASSWORD_ERROR_MESSAGE:
      return { ...state, restorePasswordErrorMessage: actions.payload };

    case SET_REGISTER_ERROR_MESSAGE:
      return { ...state, registerErrorMessage: actions.payload };

    case SET_REGISTER_SUCCESS_MESSAGE:
      return { ...state, registerSuccessMessage: actions.payload };

    case CREATE_PRODUCT_REQUEST:
      return { ...state, loadingProductCreation: true };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingProductCreation: false,
        successCreationMessage: actions.payload,
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        loadingProductCreation: false,
        errorCreationMessage: actions.payload,
      };
    case RESET_MESSAGES: {
      return {
        ...state,
        successCreationMessage: "",
        errorCreationMessage: "",
        successEditMessage: "",
        errorEditMessage: "",
        googleAuthErrorMessage: "",
        registerErrorMessage: "",
        registerSuccessMessage: "",
        loginErrorMessage: "",
        cartSuccessMessage: "",
        cartErrorMessage: "",
        restorePasswordErrorMessage: "",
        restorePasswordSuccessMessage: "",
        addReviewSuccessMessage: "",
        addReviewErrorMessage: "",
        successSaleEdit: "",
        errorSaleEdit: "",
      };
    }
    case ADD_TO_CART:
      return { ...state, cart: actions.payload };
    case "ADD_PRODUCT_STORAGE":
      let productCart = actions.payload;
      if (state.cart.productcarts && state.cart.productcarts[0]) {
        let findPr = state.cart.productcarts.find(
          (val) => val.productId === productCart.productId
        );
        if (findPr) {
          // alert("Already on cart");
          return {
            ...state,
            // cartErrorMessage: "Already on cart",
          };
        } else {
            let totalValue = state.cart.productcarts
              .map((val) => val.totalValue)
              .reduce((a, b) => a + b, 0);
            totalValue += productCart.totalValue;
            return {
              ...state,
              cart: {
                totalValue,
                productcarts: [...state.cart.productcarts, productCart],
              },
              // cartSuccessMessage: "Added to cart."
            };
          }
        } else {
          let cart = {
            totalValue: productCart.totalValue,
            productcarts: [productCart],
          };
          return { ...state, cart };
        }
      break;
    case "UPDATE_PRODUCT_STORAGE":
      const { idProduct, price, cant } = actions.payload;
      let pcs = state.cart.productcarts;
      let totalValue;
      state.cart.productcarts.forEach((val, i) => {
        if (val.productId === idProduct) {
          pcs[i].quantity = pcs[i].quantity + cant;
          pcs[i].totalValue = pcs[i].totalValue + price * cant;
        }
      });
      totalValue = state.cart.productcarts
        .map((val) => val.totalValue)
        .reduce((a, b) => a + b, 0);
      return {
        ...state,
        cart: { ...state.cart, totalValue, productcarts: pcs },
      };

    case "DELETE_PRODUCT_STORAGE":
      let productcarts = state.cart.productcarts.filter(
        (val) => val.productId !== actions.payload
      );
      let totalVal = productcarts
        .map((val) => val.totalValue)
        .reduce((a, b) => a + b, 0);
      return {
        ...state,
        cart: { ...state.cart, totalValue: totalVal, productcarts },
      };
    case UPDATE_CART_SUCCESS_MESSAGE:
      return { ...state, cartSuccessMessage: actions.payload };

    case UPDATE_CART_ERROR_MESSAGE:
      return { ...state, cartErrorMessage: actions.payload };

    case GET_USER_PUBLICATIONS:
      return { ...state, userPublications: actions.payload };
    case SET_PRODUCT_TO_EDIT:
      return { ...state, productToEdit: actions.payload };
    case SET_EDIT_INITIAL_VALUES:
      return { ...state, editInitialValues: actions.payload };
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loadingUpdateProduct: true };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingUpdateProduct: false,
        successEditMessage: actions.payload,
      };
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        loadingUpdateProduct: false,
        errorEditMessage: actions.payload,
      };

    case MERCADO_PAGO:
      return {
        ...state,
        mercadopago: actions.payload,
      };
    case MY_PURCHASES:
      return {
        ...state,
        myPurchases: actions.payload,
      };
    case FETCH_ADD_REVIEW: {
      return {
        ...state,
        addReviewLoading: true,
      };
    }
    case ADD_REVIEW_SUCCESS: {
      return {
        ...state,
        addReviewSuccessMessage: actions.payload,
      };
    }
    case ADD_REVIEW_ERROR: {
      return {
        ...state,
        addReviewErrorMessage: actions.payload,
      };
    }
    case GET_PRODUCT_REVIEWS: {
      return {
        ...state,
        productReviews: actions.payload,
      };
    }
    case GET_MY_SALES: {
      return {
        ...state,
        mySales: actions.payload,
      };
    }
    case SET_SALE_TO_EDIT: {
      return {
        ...state,
        saleToEdit: actions.payload,
      };
    }
    case SET_SALE_INITIAL_VALUE: {
      return {
        ...state,
        editSaleInitialValue: actions.payload,
      };
    }
    case UPDATE_SALE_REQUEST: {
      return {
        ...state,
        loadingUpdateSale: true,
      };
    }
    case UPDATE_SALE_SUCCESS: {
      return {
        ...state,
        loadingUpdateSale: false,
        successSaleEdit: actions.payload,
      };
    }
    case UPDATE_SALE_ERROR: {
      return {
        ...state,
        loadingUpdateSale: false,
        errorSaleEdit: actions.payload,
      };
    }
    case GET_ORDER_DETAIL: 
    return {
      ...state, 
      orderDetail: actions.payload
    }
    case GET_ALL_USERS: 
    return {
      ...state, 
      allUsers: actions.payload
    }
    case GET_SALES_PAYABLE: 
    return {
      ...state, 
      salesPayable: actions.payload
    }
    default:
      return state;
  }
}
