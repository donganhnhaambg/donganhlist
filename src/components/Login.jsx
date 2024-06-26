import { TEInput, TERipple } from "tw-elements-react";
import DrawImage from "../assets/images/draw2.webp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getInforUser, setInforUser } from "../untils/functions";
import PopupForgotPassword from "./PopupForgotPassword";
const Login = () => {
  const navigate = useNavigate();
  const [messageCallback, setMessageCallback] = useState();
  const [infor, setInfor] = useState({
    username: "",
    password: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleOnChange = (event) => {
    setInfor({ ...infor, [event.target.name]: event.target.value });
  };
  const user = getInforUser();
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [navigate, user]);
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email: infor.username,
        password: infor.password,
      });
      if (response.data.msg) {
        setMessageCallback("Password is not correct");
      } else {
        setInforUser(response.data);
        navigate("/");
      }
    } catch (error) {
      if (error) {
        setMessageCallback(error.response.data.errors[0].msg);
      }
    }
  };
  const handleRedirectRegister = () => {
    navigate("/register");
  };
  const responseFacebook = (response) => {
    console.log(response);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <section className="mx-auto max-w-7xl p-7 min-h-screen flex items-center">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img src={DrawImage} className="w-full" alt="img" />
          </div>
          {isPopupOpen && <PopupForgotPassword onClose={closePopup} />}
          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form method="POST" onSubmit={handleSubmitLogin}>
              {/* <!-- Separator between social media sign in and email/password sign in --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <h2 className="mx-4 mb-0 text-center text-3xl font-semibold dark:text-white">
                  Login
                </h2>
              </div>

              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                label="Email address"
                name="username"
                size="lg"
                className="mb-6"
                onChange={handleOnChange}
                required
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                name="password"
                label="Password"
                className="mb-6"
                onChange={handleOnChange}
                required
                size="lg"
              ></TEInput>

              <div className="mb-3 flex items-center justify-between">
                {/* <!-- Remember me checkbox --> */}
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    name="remember"
                    id="remember"
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="remember"
                  >
                    Remember me
                  </label>
                </div>

                {/* <!--Forgot password link--> */}
                <span style={{cursor: 'pointer'}} onClick={handleOpenPopup}>Forgot password?</span>
              </div>
              {messageCallback && (
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#ff0000",
                    fontWeight: "700",
                    marginBottom: "20px",
                  }}
                >
                  {messageCallback}
                </p>
              )}
              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple className="block w-full" rippleColor="light">
                  <button
                    type="submit"
                    className="w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Login
                  </button>
                </TERipple>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <button
                    onClick={handleRedirectRegister}
                    className="text-danger ml-2 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
