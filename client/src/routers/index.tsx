import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import PageRender from "./PageRender";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import Footer from "../components/Footer/Footer";
import PageDashboard from "../containers/PageDashboard/PageDashboard";
import { useAppSelector } from "../app/hook";
import PageAdminDashboard from "../containers/PageAdminDashboard/PageAdminDashboard";


// interface Props{
//     children : React.ReactNode
// }

const Index = () => {

  const role=useAppSelector(state=>state.auth.user.role)
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}

        <Route path="/" element={<PageRender />} />
        <Route path="/dashboard/*" element={role=='admin'?<PageAdminDashboard/>: <PageDashboard />} />

        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:slug" element={<PageRender />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
