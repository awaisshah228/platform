import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import PageRender from "./PageRender";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import Footer from "../components/Footer/Footer";
import PageDashboard from "../containers/PageDashboard/PageDashboard";
import DashboardBillingAddress from "../containers/PageDashboard/DashboardBillingAddress";
import DashboardEditProfile from "../containers/PageDashboard/DashboardEditProfile";
import DashboardPosts from "../containers/PageDashboard/DashboardPosts";
import DashboardRoot from "../containers/PageDashboard/DashboardRoot";
import DashboardSubcription from "../containers/PageDashboard/DashboardSubcription";
import DashboardSubmitPost from "../containers/PageDashboard/DashboardSubmitPost";

// interface Props{
//     children : React.ReactNode
// }

const index = () => {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}

        <Route path="/" element={<App />} />
        <Route path="/dashboard/*" element={<PageDashboard />} />

        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:slug" element={<PageRender />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default index;
