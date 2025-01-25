import { apiRequestController } from "@/utils/apiRequestController";
import { apiEndPoint } from "@/utils/apiEndPoint";

import GoogleButton from "react-google-button";

const GoogleBtn = () => {
  return (
    <GoogleButton
      type='dark'
      onClick={() => apiRequestController(apiEndPoint.googleLogin)}
    />
  );
};

export default GoogleBtn;
