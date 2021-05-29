import { combineReducers } from "redux";
import appointmentReducer from "./appointment.reducer";
import authReducer from "./auth.reducer";
import cardReducer from "./card.reducer";
import cartReducer from "./cart.reducer";
import decksReducer from "./decks.reducer";
import newsReducer from "./news.reducer";
import orderReducer from "./order.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  appointment: appointmentReducer,
  auth: authReducer,
  card: cardReducer,
  cart: cartReducer,
  decks: decksReducer,
  news: newsReducer,
  order: orderReducer,
  route: routeReducer,
  user: userReducer,
});
