import React, { useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setData((preVal) => {
      return { ...preVal, [name]: value };
    });
  }
  function submit(e) {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = data;
    api
      .post("", { oldPassword, newPassword, confirmPassword })
      .then((res) => {
        if (res) {
          toast.success(
            "Congratulations, you have successfully changed your password."
          );
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ??
            error?.message ??
            "OOPs something went wrong."
        );
      });
  }
  return (
    <div>
      <div className="forgetDiv mx-auto " style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-11">
            <h2>Reset Password</h2>
            <form
              className="d-flex justify-content-center flex-column"
              onSubmit={submit}
            >
              <div class="form-group row my-2">
                <label for="inputPassword" class="col-sm-3 col-form-label text-lg-center">
                  Old Password
                </label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Old Password"
                    name="oldPassword"
                    value={data.oldPassword}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="form-group row my-2">
                <label for="inputPassword" className="col-sm-3 col-form-label text-lg-center">
                  New Password
                </label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="New Password"
                    name="newPassword"
                    value={data.newPassword}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="form-group row my-2">
                <label for="inputPassword" className="col-sm-3 col-form-label text-lg-center">
                  Confirm Password
                </label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary my-4 mx-auto"
                style={{ width: "30%",cursor:"pointer" }}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
