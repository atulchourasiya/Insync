import AppRoutes from "./AppRoutes";
import Loadingscreen from "./components/ui/loadingscreen/Loadingscreen";
import { RootState } from "../src/app/store";
import { useSelector } from "react-redux";

const App = () => {
  const loading = useSelector((state: RootState) => state.loading).isLoading;

  return (
    <div className='w-screen h-screen overflow-hidden position-relative'>
      {loading ? <Loadingscreen /> : <AppRoutes />}
    </div>
  );
};

export default App;
