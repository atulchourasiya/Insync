import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "../ui/Logo";
import { Separator } from "../ui/separator";
import SlideInAnimation from "../ui/SlideInAnimation";
import GoogleBtn from "./GoogleBtn";

const Login = () => {
  return (
    <SlideInAnimation>
      <Logo textSize='3rem' />
      <div className='flex gap-4 flex-col justify-center mx-auto md:w-2/4 w-3/4 h-dvh 2xl:w-1/4'>
        <div className='flex items-center flex-col justify-center '>
          <h1 className='text-3xl md:text-4xl font-bold roboto'>
            Welcome to Insync
          </h1>
          <h2 className=' text-sm roboto font-normal '>
            Where Collaboration Meets Creativity in Real Time!
          </h2>
        </div>
        <div className='h-12  w-full gap-4 flex'>
          <Input
            className='h-full text-base focus-visible:shadow-[0_0_8px_rgba(255,255,255,0.5)] transition focus-visible:outline-none focus-visible:ring-0'
            type='email'
            title='Enter the URL of collaborative session to join'
            placeholder='Enter the URL of collaborative session to join'
          />
          <Button title='Join' variant='outline' className='h-full'>
            Join
          </Button>
        </div>
        <Separator />
        <div title='Google Login' className='sm:h-12 h-3  mx-auto'>
          <GoogleBtn />
        </div>
      </div>
    </SlideInAnimation>
  );
};

export default Login;
