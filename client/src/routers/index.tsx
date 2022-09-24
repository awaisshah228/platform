import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import PageRender from "./PageRender";
import HeaderContainer from "../containers/HeaderContainer/HeaderContainer";
import Footer from "../components/Footer/Footer";
import PageDashboard from "../containers/PageDashboard/PageDashboard";
import { useAppSelector,useAppDispatch } from "../app/hook";
import PageAdminDashboard from "../containers/PageAdminDashboard/PageAdminDashboard";
import { getCategories } from "../app/category/categoryActions";


// interface Props{
//     children : React.ReactNode
// }

const Index = () => {

  const role=useAppSelector(state=>state?.auth?.user?.role)
  const dispatch= useAppDispatch()
  useEffect(() => {
    dispatch(getCategories())
    // dispatch(refreshToken())
    // dispatch(getHomeBlogs())
  },[dispatch])
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}

        <Route path="/" element={<PageRender />} />
        <Route path="/dashboard/*" element={role && role=='admin'?<PageAdminDashboard/>: <PageDashboard />} />

        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:slug" element={<PageRender />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
