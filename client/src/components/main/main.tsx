import { useEffect } from "react";
import QuillEditor from "../editor/QuillEditor";
import AppSidebar from "../ui/AppSidebar";
import AppWrapper from "@/AppWrapper";
import { fetchUser } from "../authentication/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
const AppWithNavbar = AppWrapper(QuillEditor);
const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div className='flex'>
      <AppSidebar />
      <AppWithNavbar />
    </div>
  );
};

export default Main;
