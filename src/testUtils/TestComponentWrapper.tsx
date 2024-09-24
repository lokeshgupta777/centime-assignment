import { Provider } from "react-redux";
import { store } from "../app/store";
import "../config/i18next";

const TestComponentWrapper = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};

export default TestComponentWrapper;
