import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import Main from "./components/main/Main";


const AppRoutes = () => {

  return (
    <HashRouter>
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/' Component={Main} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
