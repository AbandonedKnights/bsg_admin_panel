import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import NewTaskExport from "./NewTaskExport";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
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
import {
  faCheck,
  faCheckDouble,
  faChevronCircleUp,
  faCoffee,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { getFormData } from "../../helpers/helpers";

export default function Support() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const authToken = userInfo.token;
  const apiHeaders = { headers: { Authorization: `Bearer ${authToken}` } };
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [replyTo, setReplyTo] = useState({});
  const [showReplyform, setShowReplyForm] = useState(false);
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "support_subject", headerName: "Subject", width: 200 },
    { field: "support_message", headerName: "Message", width: 200, flex: 1 },
    { field: "admin_reply", headerName: "Admin's Reply", width: 200, flex: 1 },
    {
      field: "createdAt",
      headerName: "Request Date",
      type: "date",
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="Send Reply"
          //icon={<ReplyIcon/>}
          onClick={(e) => {
            //history.replace(``);
            console.log(params.row);
            setReplyTo({ ...params.row });
            setShowReplyForm(true);
            //navigate(`associate/${params.row.member_id}`, true)
          }}
          showInMenu
        />,
      ],
    },
  ];

  async function getUsersInfo() {
    api
      .post("userInfo", { member_id: userInfo?.user?.member_id }, apiHeaders)
      .then((res) => {
        console.log("userInfo :: ", res.data.data);
        setUserData({ ...res.data.data });
        //setDirectChilds([...res.data.directChild]);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function getSupportRequests() {
    api
      .post("getSupportRequests", {}, apiHeaders)
      .then((res) => {
        setTableData([...res.data]);
      })
      .catch((error) => {
        toast.error(error.message ?? "OOPs, Something went wrong.");
      });
  }

  async function sendSupportRequest(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    console.log(formData);
    const fundRes = api.post("/send_admin_reply", formData, apiHeaders);

    toast.promise(fundRes, {
      loading: "Sending reply...",
      success: (data) => {
        e.target.reset();
        getSupportRequests();
        setShowReplyForm(false);
        setReplyTo({});
        return `Replied successfully`;
      },
      error: (err) => {
        return (
          err?.response?.data?.errors ??
          err?.response?.data?.message ??
          err?.message ??
          "OOPs something went wrong."
        );
      },
    });
  }

  //

  useEffect(async () => {
    await getUsersInfo();
    await getSupportRequests();
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        {showReplyform && (
          <div className="row">
            <div className="col-lg">
              <form
                onSubmit={(e) => {
                  sendSupportRequest(e);
                }}
              >
                <input type="hidden" name="request_id" value={replyTo._id} />
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div>
                      <label for="support_subject">Subject</label>
                      <input
                        className="form-control"
                        id="support_subject"
                        type="text"
                        placeholder="Subject"
                        defaultValue={replyTo.support_subject}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div>
                      <label for="support_message">Query</label>
                      <textarea
                        className="form-control"
                        id="support_message"
                        placeholder="You Query"
                        defaultValue={replyTo.support_message}
                        required
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div>
                      <label for="admmin_reply">Reply</label>
                      <textarea
                        className="form-control"
                        id="admin_reply"
                        placeholder="Admin Reply"
                        name="admin_reply"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-end">
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={(e) => {
                      setShowReplyForm(false);
                      setReplyTo({});
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg">
            <div className="my-2">
              <div className="d-block mb-4 mb-md-0 mb-2">
                <h2 className="h4 my-0">Support Requests</h2>
              </div>
              <DataGrid
                //loading={loadingData}
                getRowId={(r) => r._id}
                rows={tableData}
                columns={columns}
                pageSize={10}
                autoHeight={true}
                className="bg-white"
              />
            </div>
          </div>
          {/* <div className="col-lg-4">
            <div className="card card-body bg-white border-light shadow-sm mb-4">
              <h2 className="h5">Support Requests</h2>
              
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
