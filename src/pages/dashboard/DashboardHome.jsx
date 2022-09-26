import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { ranks } from "./data";
import NewTaskExport from "./NewTaskExport";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { getFormData } from "../../helpers/helpers";
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

export default function DashboardHome() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [ownerWalletAddress, setOwnerWalletAddress] = useState(
    userInfo?.admin?.owner_wallet_address
  );
  const [userData, setUserData] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const [poolUsers, setPoolUsers] = useState([]);
  const [showEditWalletAddress, setShowEditWalletAddress] = useState(false);
  const dispatch = useDispatch();

  async function sendPoolIncome(e, params) {
    e.preventDefault();
    const formData = getFormData(e.target);
    if (formData.amount > params.row.pool_wallet) {
      toast.error("Insufficient pool balance.");
    } else {
      console.log("Params :: ", params, formData);
      const updatePromise = api.post("sendPoolIncome", formData);
      toast
        .promise(updatePromise, {
          loading: "Sending pool income.",
          success: (data) => {
            e.target.reset();
            return "Success, Pool income transfered successfully.";
          },
          error: "Error, Something went worng",
        })
        .then(() => {
          getDashboardData();
        });
    }
  }

  async function sendARP(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    if (formData.amount > dashboardData.totalPoolBalance) {
      toast.error("Insufficient pool balance.");
    } else {
      const updatePromise = api.post("sendARPToALl", formData);
      toast
        .promise(updatePromise, {
          loading: "Sending pool income.",
          success: (data) => {
            e.target.reset();
            return "Success, Pool income transfered successfully.";
          },
          error: "Error, Something went worng",
        })
        .then(() => {
          getDashboardData();
        });
    }
  }


  const columns = [
    /* {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="User Dashboard"
          onClick={(e) => {
            //history.replace(``);
            console.log(params.row);
            navigate(`associate/${params.row.member_id}`, true);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          label={
            params.row?.status == 2 ? "Unblock Associate" : "Block Associate"
          }
          onClick={(e) => {
            blockMember(e, params.row);
          }}
          showInMenu
        />,
      ],
    }, */
    { field: "member_id", headerName: "Member ID" },
    { field: "sponsor_id", headerName: "Sponsor ID" },
    { field: "full_name", headerName: "Name" },
    { field: "email", headerName: "Email", minWidth: 150, flex: 1 },
    {
      field: "investment",
      headerName: "Investment wallet",
      minWidth: 150,
      flex: 1,
    },
    { field: "level", headerName: "Present Rank", minWidth: 150, flex: 1 },
    {
      field: "pool_wallet",
      headerName: "Available Pool Income",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <span>{Number(params.value).toFixed(2)}</span>,
    },
    {
      field: "auto_pool_recv",
      headerName: "Send Pool Income",
      minWidth: 250,
      flex: 1,
      renderCell: (params) => (
        <div className="d-flex">
          <div>
            <form
              onSubmit={(e) => {
                sendPoolIncome(e, params);
              }}
            >
              <div className="input-group">
                <input
                  type="hidden"
                  name="member_id"
                  value={params.row.member_id}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Pool Income"
                  name="amount"
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Send Income
                </button>
              </div>
            </form>
          </div>
        </div>
      ),
    },
  ];

  async function getDashboardData() {
    api
      .post("getDashboardData")
      .then((res) => {
        console.log("dashboardData :: ", res.data);
        setDashboardData({ ...res.data });
        setPoolUsers([...res.data.eligibleUserForPoolIncome]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function startClosing() {
    api
      .post("startClosing")
      .then((res) => {
        console.log("dashboardData :: ", res.data);
        toast.success("Closing done  successfully.");
        //setDashboardData({ ...res.data });
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  // async function getroidistribution() {
  //   api
  //     .post("roiDistribution", {})
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         error.response.data.message ??
  //           error.message ??
  //           "OOPs, something went wrong."
  //       );
  //     });
  // }

  async function updateOnwerWallet(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const updatePromise = api.post("update_owner_address", formData);
    toast
      .promise(updatePromise, {
        loading: "Updatng onwers's wallet address",
        success: (data) => {
          e.target.reset();
          setOwnerWalletAddress(formData.owner_wallet_address);
          setShowEditWalletAddress(false);
          return "Success, wallet address updated successfully.";
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getDashboardData();
      });
  }

  async function updateTopupAmount(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const updatePromise = api.post("change_min_max_topup_amount", formData);
    toast
      .promise(updatePromise, {
        loading: "Updating topup amounts...",
        success: (data) => {
          e.target.reset();
          return "Success, topup amount updated successfully.";
        },
        error: "Error, Something went worng",
      })
      .then(() => {
        getDashboardData();
      });
  }
  // useEffect(() => {
  //   getroidistribution();
  // }, []);

  useEffect(async () => {
    //await getUsersInfo();
    await getDashboardData();
  }, []);
  return (
    <>
      {/* <NewTaskExport /> */}
      <div className="container-fluid py-4">
        <div className="mb-2">
          <span className="fw-bold">Owner Wallet Address:</span>{" "}
          {ownerWalletAddress && ownerWalletAddress.length > 0
            ? ownerWalletAddress
            : "Not available yet"}{" "}
          {!showEditWalletAddress && (
            <button
              className="btn p-1"
              onClick={() => {
                setShowEditWalletAddress(true);
              }}
            >
              <span>
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </button>
          )}
        </div>
        {showEditWalletAddress && (
          <div className="my-2">
            <div className="card card-body border-0 shadow-sm">
              <div className="d-block mb-4 mb-md-0 mb-2">
                <h4 className="my-0">Update owner's wallet address</h4>
              </div>
              <form
                onSubmit={(e) => {
                  updateOnwerWallet(e);
                }}
              >
                <input
                  type="hidden"
                  name="email"
                  value={userInfo.admin.email}
                />
                <div class="input-group mb-3">
                  <input
                    type="text"
                    name="owner_wallet_address"
                    class="form-control"
                    placeholder="New Onwer Wallet"
                    aria-label="New Owner Address"
                    aria-describedby="button-addon2"
                    required
                  />

                  <button
                    class="btn btn-outline-secondary"
                    type="submit"
                    id="button-addon2"
                  >
                    Update Wallet Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="d-flex mb-2">
          <div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                startClosing();
              }}
            >
              Start Closing
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 ">
              <div className="col  mb-2">
                <div className="card card-body border-0 shadow-sm h-100">
                  <h6 className="fw-bold my-0 ">Total Users</h6>
                  <div className="d-flex">
                    <div>
                      <span className="fs-4">
                        {dashboardData.totalUsers ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col mb-2">
                <div className="card card-body border-0 shadow-sm h-100">
                  <h6 className="fw-bold my-0">Total Withdrawal</h6>
                  <div className="d-flex">
                    <div>
                      <span className="fs-4">
                        {dashboardData.totalWithdrawl ?? 0}
                      </span>{" "}
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col mb-2">
                <div className="card card-body border-0 shadow-sm h-100">
                  <h6 className="fw-bold my-0 ">Total Business</h6>
                  <div className="d-flex">
                    <div>
                      <span className="fs-4">
                        {dashboardData?.totalInvestment ?? 0}
                      </span>{" "}
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col mb-2">
                <div className="card card-body border-0 shadow-sm h-100">
                  <h6 className="fw-bold my-0">Total Distribution</h6>
                  <div className="d-flex">
                    <div>
                      <span className="fs-4">
                        {dashboardData?.totalWidthdrawl?.[0]?.totalWidthdrawl ??
                          0}
                      </span>{" "}
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col mb-2">
                <div className="card card-body border-0 shadow-sm h-100">
                  <h6 className="fw-bold my-0">Total Pool Income</h6>
                  <div className="d-flex">
                    <div>
                      <span className="fs-4">
                        {Number(dashboardData?.totalPoolBalance).toFixed(2) ??
                          0}
                      </span>{" "}
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-2">
          <h3>Eligible member for Pool Income </h3>
          <div className="my-2">
            <div className="d-flex justify-content-end">
              <div>
                <form
                  onSubmit={(e) => {
                    sendARP(e);
                  }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ARP"
                      name="amount"
                    />
                    <button type="submit" className="btn btn-primary">
                      Send ARP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <DataGrid
            //loading={loadingData}
            getRowId={(r) => r._id}
            rows={poolUsers}
            columns={columns}
            //rowCount={totalUsers}
            pageSize={10}
            //rowsPerPageOptions={[10, 25, 25, 50, 100]}
            //checkboxSelection
            //paginationMode="server"
            //onFilterModelChange={onFilterChange}
            //onPageChange={handlePageChange}
            autoHeight={true}
            className="bg-white"
            density="compact"
          />
        </div>
      </div>
    </>
  );
}
