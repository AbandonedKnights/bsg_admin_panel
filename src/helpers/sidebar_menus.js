const sidebarMenus = [
  { title: "Dashboard", icon: "fas fa-chart-pie", page: "/dashboard" },
  { title: "Associates", icon: "fas fa-hand-holding-usd", page: "/dashboard/associates" },
  //{title: "Credit Wallets", icon:"fas fa-hand-holding-usd", page:"credit_wallets"},
  //{title: "Update Rank", icon:"fas fa-hand-holding-usd", page:"update_rank"},
  {
    title: "Investments",
    icon: "fas fa-hand-holding-usd",
    page: "/dashboard/investments",
  },
  {
    title: "Fund Request",
    icon: "fas fa-hand-holding-usd",
    page: "/dashboard/fund_request",
  },
  {
    title: "Income History",
    icon: "fas fa-hand-holding-usd",
    childrens: [
      { title: "Daily ROI", page: "/dashboard/roi_income_history" },
      { title: "Referral Income", page: "/dashboard/ref_income_history" },
      { title: "Level Income", page: "/dashboard/level_income_history" },
      //{ title: "Cashback Income", page: "/cashback_income" },
    ],
  },
  {
    title: "Withdrawal Requests",
    icon: "fas fa-hand-holding-usd",
    page: "/dashboard/withdrawl_requests",
  },
  {
    title: "Withdrawal History",
    icon: "fas fa-hand-holding-usd",
    childrens: [
      { title: "Daily ROI Withdrawal", page: "/dashboard/roi_widthdrawal_history" },
      { title: "Referral Income Withdrawal", page: "/dashboard/ref_widthdrawal_history" },
      { title: "Level Income Withdrawal", page: "/dashboard/level_widthdrawal_history" },
    ],
  },
  {
    title: "Support Requests",
    icon: "fas fa-hand-holding-usd",
    page: "/dashboard/support",
  },
  {
    title: "Forget Password",
    icon: "fas fa-hand-holding-usd",
    page: "/dashboard/forgetpassword",
  },
];
export default sidebarMenus;
