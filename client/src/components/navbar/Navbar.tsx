import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { SidebarTrigger } from "../ui/sidebar";
import SvgLogo from "../ui/SvgLogo";
import { Video, Download } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Navbar = () => {
  const icon_size = 24;
  const { picture, name } = useSelector((state: RootState) => state.user);
  return (
    <div className='flex items-center justify-between gap-2 p-2 w-full bg-[hsl(var(--sidebar-background))]'>
      <div className='flex justify-center items-center gap-2'>
        <SidebarTrigger />
        <Separator orientation='vertical' decorative={true} className="w-[1px] h-8 bg-[hsl(var(--border))]" />
        <SvgLogo className='h-10 w-10' />
        <Input placeholder='Untitled Document' />
      </div>
      <div>
        <Input placeholder='Search' />
      </div>
      <div className='flex gap-5 items-center '>
        <Video size={icon_size} />
        <Download size={icon_size} />
        <Avatar>
          <AvatarImage src={picture} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
