import Navbar from "./components/navbar/navbar";
import { ComponentType } from "react";

const AppWrapper = function (Component: ComponentType) {
  return function () {
    return (
      <div className="flex flex-col h-dvh w-dvw">
        <Navbar />
        <Component />
      </div>
    );
  };
}

export default AppWrapper;
