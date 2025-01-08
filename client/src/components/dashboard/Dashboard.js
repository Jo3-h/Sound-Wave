import "./css/dashboard.css";

import ThreeDText from "../common/ThreeDText";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard" id="page-title-container">
        <ThreeDText text="Soundwave.FM" />
        <div className="dashboard-contents"></div>
      </div>
    </>
  );
}
