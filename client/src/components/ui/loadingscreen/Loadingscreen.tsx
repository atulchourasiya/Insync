import { useDispatch } from "react-redux";
import Logo from "../Logo";
import { hideLoading } from "./LoadingSlice";

const Loadingscreen = () => {
  const dispatch = useDispatch();
  return (
      <Logo
        textSize='3rem'
        delayDuration={0.4}
        slidingAnimationDuration={0.5}
        isPlaySlideAnimation={true}
        onAnimationComplete={() => dispatch(hideLoading())}
      />
  );
};

export default Loadingscreen;
