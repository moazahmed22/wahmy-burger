import React, { useState } from "react";
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from "@/actions/auth.action";
import toast from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
const ForgetPassowrdComp = ({
  lightbox,
  setLightbox,
}: {
  lightbox: boolean;
  setLightbox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // forgot password
  // states
  // condtional forms
  const [forgotPasswordForm, setForgotPasswordForm] = useState(true);
  const [resetPasswordForm, setResetPasswordForm] = useState(false);
  const [newPasswordForm, setNewPasswordForm] = useState(false);
  // forgotPasswordEmail for forgotPasswordForm controlled input
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  // forgot form error for all 3 forms
  const [forgotFormError, setForgotFormError] = useState(null);
  const [OTP, setOTP] = useState("");
  // new password state
  const [newPassword, setNewPassword] = useState("");

  // reset main password form
  const resetMainPasswordForm = () => {
    setLightbox(false);
    setForgotPasswordForm(true);
    setResetPasswordForm(false);
    setNewPasswordForm(false);
    setForgotFormError(null);
    setOTP("");
  };
  // handel forgot password form
  const handleFrogotPassword = async (email: string) => {
    const response = await forgotPassword(email);
    setOTP("");
    if (response?.data.length === 0) {
      setForgotFormError(response?.message);
    } else {
      toast.success(response?.message);
      setForgotFormError(null);
      setForgotPasswordForm(false);
      setResetPasswordForm(true);
    }
  };
  // handle reset password form
  const handleVerifyResetCode = async (resetCode: string) => {
    const response = await verifyResetCode(resetCode);
    if (response?.statusMessage?.toLowerCase() === "success") {
      setForgotFormError(null);
      toast.success(response?.statusMessage);
      setForgotPasswordForm(false);
      setResetPasswordForm(false);
      setNewPasswordForm(true);
    } else {
      setForgotFormError(response?.message);
    }
  };
  // handle new password form
  const handleNewPassword = async (email: string, newPassword: string) => {
    const response = await resetPassword(email, newPassword);
    if (response?.statusMessage?.toLowerCase() === "ok") {
      toast.success("password reset successfuly");
      setTimeout(() => {
        resetMainPasswordForm();
      }, 2000);
    } else {
      setForgotFormError(response?.message);
    }
  };

  return (
    <>
      {lightbox && (
        <div
          onClick={() => {
            resetMainPasswordForm();
          }}
          className="lightbox fixed w-full h-full left-0 bottom-0 z-40 bg-foreground/50"
        >
          {/* forgot password form */}
          {forgotPasswordForm && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="contentbox bg-background rounded-md p-5 w-md absolute top-1/2 left-1/2 translate-[-50%]"
            >
              <h3 className="font-bold text-2xl text-center mb-2">
                Forgot password?
              </h3>
              <p className="text-sm text-foreground/70 text-center font-medium mb-5">
                No worries, we&apos;ll send you reset instructions
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="flex flex-col gap-5"
              >
                <div className="input-field flex flex-col gap-2">
                  <label
                    htmlFor="forgotPasswordEmail"
                    className="capitalize font-medium"
                  >
                    email
                  </label>
                  <input
                    id="forgotPasswordEmail"
                    value={forgotPasswordEmail}
                    onChange={(e) => {
                      setForgotPasswordEmail(e.target.value);
                    }}
                    placeholder="Email"
                    className="w-full border-2 p-2 rounded-md border-slate-600/50 focus:border-primary focus:outline-0 font-medium"
                  />
                  {forgotFormError && (
                    <p className={"text-red-500 font-medium"}>
                      {forgotFormError}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleFrogotPassword(forgotPasswordEmail);
                  }}
                  className="bg-primary text-background font-medium px-3 py-2 rounded-md cursor-pointer"
                >
                  Reset password
                </button>
              </form>
            </div>
          )}
          {/* reset password form */}
          {resetPasswordForm && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="contentbox bg-background rounded-md p-5 w-md absolute top-1/2 left-1/2 translate-[-50%]"
            >
              <h3 className="font-bold text-2xl text-center mb-2">
                Enter verification code
              </h3>
              <p className="text-sm text-foreground/70 font-medium mb-5">
                we&apos;ve sent a (OTP) code to your email
              </p>
              <div className="space-y-2 flex flex-col items-center">
                <InputOTP
                  maxLength={6}
                  value={OTP}
                  onChange={(value) => setOTP(value)}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm">
                  {OTP === "" && <p>Enter your one-time password.</p>}
                  {forgotFormError && (
                    <p className={"text-red-500 font-medium"}>
                      {forgotFormError}
                    </p>
                  )}
                </div>
                <div className="action-container self-stretch grid grid-cols-1 md:grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      handleVerifyResetCode(OTP);
                    }}
                    className={`bg-primary text-background font-medium px-3 py-2 rounded-md ${
                      OTP.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={OTP.length === 0}
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => {
                      resetMainPasswordForm();
                    }}
                    className={`bg-background text-primary border-2 hover:border-primary cursor-pointer font-medium px-3 py-2 rounded-md`}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* new password form */}
          {newPasswordForm && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="contentbox bg-background rounded-md p-5 w-md absolute top-1/2 left-1/2 translate-[-50%]"
            >
              <h3 className="font-bold text-2xl text-center mb-2">
                Reset password
              </h3>
              <p className="text-sm text-foreground/70 font-medium mb-5">
                please enter your email and your new password
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="flex flex-col gap-5"
              >
                <div className="input-field flex flex-col gap-2">
                  <label htmlFor="userEmail" className="capitalize font-medium">
                    email
                  </label>
                  <input
                    id="userEmail"
                    value={forgotPasswordEmail}
                    onChange={(e) => {
                      setForgotPasswordEmail(e.target.value);
                    }}
                    placeholder="Email"
                    className="w-full border-2 p-2 rounded-md border-slate-600/50 focus:border-primary focus:outline-0 font-medium"
                  />
                  <label
                    htmlFor="newPassword"
                    className="capitalize font-medium"
                  >
                    new password
                  </label>
                  <input
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    placeholder="new password"
                    className="w-full border-2 p-2 rounded-md border-slate-600/50 focus:border-primary focus:outline-0 font-medium"
                  />
                  {forgotFormError && (
                    <p className={"text-red-500 font-medium"}>
                      {forgotFormError}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleNewPassword(forgotPasswordEmail, newPassword);
                  }}
                  className="bg-primary text-background font-medium px-3 py-2 rounded-md cursor-pointer"
                >
                  Reset password
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ForgetPassowrdComp;
