import axios from "axios";

// forgot password action
const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      { email }
    );
    return { data: response?.data, message: response?.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        message: error.response?.data.message || "data couldnt be fetched",
      };
    }
  }
};

//  verify reset code action
const verifyResetCode = async (resetCode: string) => {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      { resetCode }
    );
    return { statusMessage: response?.data.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        message: error.response?.data.message || "data couldnt be fetched",
      };
    }
  }
};

// reset password action
const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      { email, newPassword }
    );

    return {
      token: response?.data.token,
      statusMessage: response?.statusText,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);

      return {
        data: [],
        message: error.response?.data.message || "data couldnt be fetched",
      };
    }
  }
};
export { forgotPassword, verifyResetCode, resetPassword };
