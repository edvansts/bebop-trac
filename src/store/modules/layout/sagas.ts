import { all } from "redux-saga/effects";

// import { ActionTypes } from "./types";

// type ActionCheckProductStock = ReturnType<typeof AddProductToCartRequest>;

// interface IGetProductStock {
//   id: number;
//   quantity: number;
// }

// function* checkProductStock(action: ActionCheckProductStock) {
//   const { product } = action.payload;

//   const qtdProduct: number = yield select((state: IState) => {
//     return (
//       state.cart.items.find((item) => item.product.id === product.id)
//         ?.quantity ?? 0
//     );
//   });

//   const availableProducts: AxiosResponse<IGetProductStock> = yield call(
//     api.get,
//     `stock/${product.id}`
//   );

//   if (availableProducts.data.quantity < qtdProduct + 1) {
//     yield put(AddProductToCartFailure(product.id));
//     return;
//   }

//   yield put(AddProductToCartSuccess(product));
// }

export default all([
  // takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
