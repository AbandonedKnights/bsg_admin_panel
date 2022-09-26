import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <section className="vh-lg-100 bg-soft d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center form-bg-image">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <h1 className="h3">Forgot your password?</h1>
              <p className="mb-4">
                Don't fret! Just type in your email and we will send you a code
                to reset your password!
              </p>
              <form action="#">
                <div className="mb-4">
                  <label for="email">Your Email</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      required
                      autofocus
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-block btn-primary">
                  Recover password
                </button>
              </form>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <span className="font-weight-normal">
                  Go back to the 
                  <Link to="/signin" className="font-weight-bold">
                    login page
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
