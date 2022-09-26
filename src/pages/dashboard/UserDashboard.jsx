import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import NewTaskExport from "./NewTaskExport";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridSearchIcon,
  GridFilterInputDate,
} from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  faCheck,
  faCheckDouble,
  faChevronCircleUp,
  faCoffee,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { ranks } from "./data";
import { getFormData } from "../../helpers/helpers";

export default function DashboardHome() {
  const { memberID } = useParams();
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editMemberInfo, setEditMemberInfo] = useState(false);
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "level", headerName: "Level", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "coin_wallet", headerName: "Coin Wallet", width: 200 },
    { field: "income_wallet", headerName: "Income Wallet", width: 200 },
    { field: "createdAt", headerName: "Joined On", type: "date", width: 150 },
  ];
  
  const infoArray = [
    { icon: "fas fa-coins", field: "pool_wallet", label: "Pool Wallet" },
    { icon: "fas fa-coins", field: "cashback_wallet", label: "ROI Wallet" },
    { icon: "fas fa-coins", field: "referalwallet", label: "Referral Wallet" },
    { icon: "fas fa-coins", field: "investment", label: "Total Investments" },
    { icon: "fas fa-coins", field: "userProfit", label: "User Profit" },
    { icon: "fas fa-users", field: "direct_members", label: "Direct Members",link: "https://facebook.com" },
    { icon: "fas fa-users", field: "total_members", label: "Total Members" },
    
  ];

  async function getUsersInfo() {
    api
      .post("userInfo", { member_id: memberID })
      .then((res) => {
        console.log("userInfo :: ", res.data.data);
        setUserData({ ...res.data.data });
        setDirectChilds([...res.data.directChild]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function getLevelIncome() {
    api
      .post("getIncomeHistory", {
        member_id: memberID,
        income_type: "Incom from downline",
      })
      .then((res) => {
        console.log("LevelIncome:: ", res.data.data);
        setTableData([...res.data.data]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function updateMemberInfo(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const updatePromise = api.post("updateUserInfo", formData);
    toast
      .promise(updatePromise, {
        loading: "Updatng member's information",
        success: "Success, Member's information updated successfully.",
        error: "Error, Something went worng",
      })
      .then(() => {
        getUsersInfo();
      });
  }

  async function updateMemberRank(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const updatePromise = api.post("update_rank", formData);
    toast
      .promise(updatePromise, {
        loading: "Updatng member's rank",
        success: "Success, Member's rank updated successfully.",
        error: "Error, Something went worng",
      })
      .then(() => {
        getUsersInfo();
      });
  }

  async function creditMemberWallet(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const updatePromise = api.post("credit_wallet", formData);
    toast
      .promise(updatePromise, {
        loading: "Updatng member's wallet",
        success: "Success, Member's wallet updated successfully.",
        error: "Error, Something went worng",
      })
      .then(() => {
        getUsersInfo();
      });
  }

  useEffect(async () => {
    await getUsersInfo();
    //await getLevelIncome();
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        {editMemberInfo ? (
          <>
            <h2 className="h5 mb-1">General information</h2>
            <form
              onSubmit={(e) => {
                updateMemberInfo(e);
              }}
            >
              <input
                type="hidden"
                name="member_id"
                value={userData.member_id}
              />
              <div className="row">
                <div className="col-md mb-3">
                  <div>
                    <label for="full_name">Full Name</label>
                    <input
                      className="form-control"
                      id="full_name"
                      type="text"
                      placeholder="Name"
                      name="full_name"
                      defaultValue={userData.full_name}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      name="email"
                      defaultValue={userData.email}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label for="phone">Phone</label>
                    <input
                      className="form-control"
                      id="phone"
                      type="number"
                      placeholder="+12-345 678 910"
                      name="mobile"
                      defaultValue={userData.mobile}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md mb-3">
                  <div>
                    <label for="xcelpay_wallet">Wallet Address</label>
                    <input
                      className="form-control"
                      id="xcelpay_wallet"
                      type="text"
                      placeholder="Wallet Address"
                      name="xcelpay_wallet"
                      defaultValue={userData.xcelpay_wallet}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-0 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-warning me-2"
                  onClick={() => setEditMemberInfo(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Info
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="row">
            <div className="col-lg">
              <div className="row row-cols-1">
                <div className="col mb-2">
                  <div className="card card-body border-0 shadow-sm">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="me-2">
                          <img
                            class="user-avatar md-avatar rounded-circle"
                            alt="Image placeholder"
                            src="/theme_files/assets/img/team/profile-picture-3.jpg"
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                            {memberID}
                          </div>
                          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                            <span className="fw-bold text-uppercase">
                              Sponsor ID :{" "}
                            </span>
                            {userData.sponsor_id}
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          className="btn"
                          onClick={() => setEditMemberInfo(true)}
                        >
                          <span>
                            <FontAwesomeIcon icon={faEdit} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row-cols-4">
                {infoArray.map((info) => (
                  <div className="col mb-2">
                    <div className="card card-body border-0 shadow-sm">
                      <h6 className="fw-bold my-0">{info.label}</h6>
                      <div className="d-flex align-items-center">
                        <div className="mr-2">
                          <span className="flink-icon text-light">
                            <span className={info.icon}></span>
                          </span>
                        </div>
                        <div>
                          <span className="fw-bold fs-5">
                            {userData[info.field]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
