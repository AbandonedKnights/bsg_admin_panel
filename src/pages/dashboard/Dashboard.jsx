import { Route, Routes, useParams } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import Associates from "./Associates";
import DashboardAreaNav from "./DashboardAreaNav";
import DashboardFooter from "./DashboardFooter";
import DashboardHome from "./DashboardHome";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTrasactions from "./DashboardTransactions";
import ForgetPassword from "./ForgetPassword";
import FundRequest from "./FundRequest";
import IncomeHistory from "./IncomeHistory";
import Investments from "./Investments";
import CashBackIncome from "./CashBackIncome";
import Settings from "./Settings";
import UserDashboard from "./UserDashboard";
import WidthdrawlHistory from "./WidthdrawlHistory";
import WithdrawlRequest from "./WithdrawlRequest";
import ROIIncomeHistory from "./ROIIncomeHistory";
import RefIncomeHistory from "./RefIncomeHistory";
import LevelIncomeHistory from "./LevelIncomeHistory";
import ROIWidthdrawlHistory from "./ROIWidthdrawlHistory";
import LevelWidthdrawlHistory from "./LevelWidthdrawlHistory";
import RefWidthdrawlHistory from "./ReferralWidthdrawlHistory";
import Support from "./Support";

export default function Dashboard() {
  const { page, memberID } = useParams();
  const pages = {
    settings: <Settings />,
    associates: <Associates />,
    investments: <Investments />,
    fund_request: <FundRequest />,
    income_history: <IncomeHistory />,
    roi_income_history: <ROIIncomeHistory />,
    level_income_history: <LevelIncomeHistory />,
    ref_income_history: <RefIncomeHistory />,
    roi_widthdrawal_history: <ROIWidthdrawlHistory />,
    level_widthdrawal_history: <LevelWidthdrawlHistory />,
    ref_widthdrawal_history: <RefWidthdrawlHistory />,
    withdrawl_requests: <WithdrawlRequest />,
    transactions: <DashboardTrasactions />,
    cashback_income: <CashBackIncome />,
    forgetpassword: <ForgetPassword />,
    support: <Support />,
  };
  return (
    <>
      <DashboardNav />
      <div className="container-fluid bg-soft">
        <div className="row">
          <div className="col-12">
            {/* DashboardSidebar */}
            <DashboardSidebar />
            <main className="content">
              {/* DashboardNav */}
              <DashboardAreaNav />
              {memberID ? (
                <UserDashboard />
              ) : pages?.[page] ? (
                pages[page]
              ) : (
                <DashboardHome />
              )}
              {/* DashboardFooter */}
              {/* <DashboardFooter /> */}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
