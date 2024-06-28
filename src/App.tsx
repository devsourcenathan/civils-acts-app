import React from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
  ThemedLayoutV2,
  ErrorComponent,
} from "@refinedev/antd";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  ApartmentOutlined,
  DashboardOutlined,
  UserOutlined,
  UnorderedListOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import "dayjs/locale/de";
import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";
import { useTranslation } from "react-i18next";
import { Header, Title } from "./components";
import { ConfigProvider } from "./context";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "./providers/data/data-provider";
import { authProvider } from "./providers/auth/authProvider";
import { UserList } from "./pages/users";
import { ActeList } from "./pages/actes";
import { FormationList } from "./pages/formations";
import { CentreList } from "./pages/centres";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };



  const resources = [
    {
      name: "dashboard",
      list: "/",
      meta: {
        label: "Dashboard",
        icon: <DashboardOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
      },
    },
    {
      name: "actes",
      list: "/actes",
      meta: {
        icon: <UnorderedListOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
      },
    },
    {
      name: "formations",
      list: "/formations",
      meta: {
        icon: <TagsOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
      },
    },
    {
      name: "centres",
      list: "/centres",
      meta: {
        icon: <ApartmentOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
      },
    },
    {
      name: "users",
      list: "/users",
      meta: {
        icon: <UserOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
      },
    },
  ];



  return (
    <BrowserRouter>
      <ConfigProvider>
        <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            options={{
              warnWhenUnsavedChanges: true,
            }}
            resources={resources}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2 Header={Header} Title={Title}>
                      <div
                        style={{
                          maxWidth: "1200px",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        <Outlet />
                      </div>
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<DashboardPage />} />

                <Route path="/actes" element={<ActeList />} />
                <Route path="/formations" element={<FormationList />} />
                <Route path="/centres" element={<CentreList />} />
                <Route path="/users" element={<UserList />} />
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="dashboard" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      registerLink={false}
                      forgotPasswordLink={false}
                      type="login"
                    />
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthPage type="register" />
                  }
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage type="updatePassword" />}
                />
              </Route>
              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2 Header={Header} Title={Title}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
