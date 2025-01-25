import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import SvgLogo from "../ui/SvgLogo";
import { Video } from 'lucide-react';
const Navbar = () => {
  return (
    <div className='flex items-center justify-between gap-2 p-2 w-full bg-[hsl(var(--sidebar-background))]'>
      <div className='flex justify-center items-center gap-2'>
        <SvgLogo className='h-10 w-10' />
        <Input placeholder='Untitled Document' />
      </div>
      <div>
        <Input placeholder='Search' />
      </div>
      <div className="flex gap-3 items-center ">
        <Video size={30}  />
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
