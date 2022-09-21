import LayoutPage from "../../components/LayoutPage/LayoutPage";
import React, { ComponentType, FC, ReactNode } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import DashboardBillingAddress from "./DashboardBillingAddress";
import DashboardEditProfile from "./DashboardEditProfile";
import DashboardPosts from "./DashboardPosts";
import DashboardRoot from "./DashboardRoot";
import DashboardSubcription from "./DashboardSubcription";
import DashboardSubmitPost from "./DashboardSubmitPost";
import { Helmet } from "react-helmet";
import PrivatePage from "../../routers/PrivatePage";

export interface PageDashboardProps {
  className?: string;
}

interface DashboardLocationState {
  "/root"?: {};
  "/posts"?: {};
  "/edit-profile"?: {};
  "/subscription"?: {};
  "/billing-address"?: {};
  "/submit-post"?: {};
  "/account"?: {};
}

interface DashboardPage {
  sPath: keyof DashboardLocationState;
  exact?: boolean;
  component: ReactNode;
  emoij: string;
  pageName: string;
}

const subPages: DashboardPage[] = [
  {
    sPath: "/root",
    exact: true,
    component: <DashboardRoot />,
    emoij: "🕹",
    pageName: "Dash board",
  },
  {
    sPath: "/posts",
    component: <DashboardPosts />,
    emoij: "📕",
    pageName: "Posts",
  },
  {
    sPath: "/edit-profile",
    component: <DashboardEditProfile />,
    emoij: "🛠",
    pageName: "Edit profile",
  },
  {
    sPath: "/subscription",
    component: <DashboardSubcription />,
    emoij: "📃",
    pageName: "Subscription",
  },
  {
    sPath: "/billing-address",
    component: <DashboardBillingAddress />,
    emoij: "✈",
    pageName: "Billing address",
  },
  {
    sPath: "/submit-post",
    component: <DashboardSubmitPost />,
    emoij: "✍",
    pageName: "Submit post",
  },
];

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  // let { path, url } = useRouteMatch();
  let location = useLocation();

  return (
       <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Helmet>
        <title>Dashboard || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="View your dashboard, manage your Posts, Subscription, edit password and profile"
        headingEmoji="⚙"
        heading="Dash board"
      >
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
          {/* SIDEBAR */}

          <div className="flex-shrink-0 max-w-xl xl:w-80 xl:pr-8">
            <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              {subPages.map(({ sPath, pageName, emoij }, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                      to={`/dashboard${sPath}`}
                      // activeClassName="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <span className="w-8 mr-1">{emoij}</span>
                      {pageName}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
          <div className="flex-grow">
            {/* <Routes>
              {subPages.map(({ component, sPath, exact }, index) => {
                return (
                  <Route
                    key={index}
                    // exact={exact}
                    element={component}
                    path={`${location.pathname}${sPath}`}
                  />
                );
              })}
              <Route path={`${location.pathname}/root`} element={<DashboardRoot/>}/>
              <Navigate to={location.pathname + "/root"} replace />
            </Routes> */}
            <Routes>
              <Route path="root" element={<DashboardRoot />} />
              <Route path="posts" element={<DashboardPosts />} />
              <Route path="edit-profile" element={<DashboardEditProfile />} />
              <Route path="subscription" element={<DashboardSubcription />} />
              <Route
                path="billing-address"
                element={<DashboardBillingAddress />}
              />
              <Route path="submit-post" element={<DashboardSubmitPost />} />
              <Route path="*" element={<DashboardRoot />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </LayoutPage>
    </div>
   
   
  );
};

export default PageDashboard;
