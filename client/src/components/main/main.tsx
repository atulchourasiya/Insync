import { SidebarTrigger } from "../ui/sidebar";
import QuillEditor from "../editor/QuillEditor";
import AppSidebar from "../ui/AppSidebar";
import AppWrapper from "@/AppWrapper";

const Main = () => {
  return (
    <div className='flex'>
      <AppSidebar />
      <SidebarTrigger />
      <QuillEditor />
    </div>
  );
};

export default AppWrapper(Main);
