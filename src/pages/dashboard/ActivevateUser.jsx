import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ActivevateUser = () => {
    const { userInfo } = useSelector((state) => state?.user?.value);
    const admin_user_id = userInfo?.params?.user_id;
    const [user_id, setUserId] = useState('');
    const [balance, setBalance] = useState(0);
    const [msg, setMsg] = useState('')
    const [packages, setPackages] = useState();
useEffect(()=>{
    api.post("get-deposit-details")
    .then((res) => {
      let data =res.data; 
      if(data.status == 200){
     setPackages(data.params.packages_data)
      }
      
    })
    .catch((error) => {
      console.log("user", error);
    })
}, [])
    

  function submit(e) {
    e.preventDefault();
    if(admin_user_id && user_id && balance>49 && msg) {
        api
        .post("set-admin-invest", { admin_user_id, user_id, balance, msg })
        .then((res) => {
          console.log("res", res);
          let data = res.data;
          if(data.status == 200) {
            toast.success(
                "Congratulations, you have successfully Activate Account."
              );
          } else {
            toast.error(
                "Somthing went Wrong!!"
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
    }else {
        toast.error(
          "Please Fill All Value"
          );
    }
    
  }
  const packagelist = packages && packages.map((item) => {
    return (
      <>
      <option value={item.amount}>{item.amount}{" BSXG "}{item.name}</option>
      </>
    );
});
  return (
    <div>
      <div className="forgetDiv mx-auto " style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-11">
            <h2>Activate User</h2>
            <form
              className="d-flex justify-content-center flex-column"
              onSubmit={submit}
            >
              <div class="form-group row my-2">
                <label for="user_id" class="col-sm-3 col-form-label text-lg-center">
                  User Id
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="user_id"
                    placeholder="Enter User Id"
                    name="user_id"
                    value={user_id}
                    onChange={(e)=>{
                        setUserId(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row my-2">
                <label for="amount" className="col-sm-3 col-form-label text-lg-center">
                  Amount
                </label>
                <div className="col-sm-9">
                <select class="form-control" name="pack_name" onChange={(e)=>{
                    setBalance(e.target.value);
                }}>
                    <option disabled="disabled" selected="selected">Select BSXG Packages</option>
                    {packagelist}
                                </select>
                </div>
              </div>
              <div className="form-group row my-2">
                <label for="msg" className="col-sm-3 col-form-label text-lg-center">
                  Comments
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="msg"
                    placeholder="Enter Your Message"
                    name="msg"
                    value={msg}
                    onChange={(e)=>{
                        setMsg(e.target.value)
                    }}
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

export default ActivevateUser;
