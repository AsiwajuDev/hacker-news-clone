import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const isProd = process.env.NODE_ENV === "production";
const midddlewareList = [];

midddlewareList.push(thunk);

if (!isProd) {
  midddlewareList.push(createLogger());
}

const middleware = compose(applyMiddleware(...midddlewareList));

export default middleware;
