import React, { useEffect, useState } from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
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
  ShoppingOutlined,
  ApartmentOutlined,
  DashboardOutlined,
  UserOutlined,
  UnorderedListOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import jsonServerDataProvider from "@refinedev/simple-rest";
import "dayjs/locale/de";
import { DashboardPage } from "./pages/dashboard";
import { OrderList, OrderShow } from "./pages/orders";
import { AuthPage } from "./pages/auth";
import { CustomerShow, CustomerList } from "./pages/customers";
import { CourierList, CourierCreate, CourierEdit } from "./pages/couriers";
import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductShow,
} from "./pages/expenses";
import { StoreCreate, StoreEdit, StoreList } from "./pages/stores";
import { CategoryList } from "./pages/categories";
import { useTranslation } from "react-i18next";
import { Header, Title } from "./components";
import { BikeWhiteIcon } from "./components/icons";
import { ConfigProvider } from "./context";
import { useAutoLoginForDemo } from "./hooks";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "./providers/data/data-provider";
import { TOKEN_KEY, authProvider } from "./providers/auth/authProvider";
import { ServiceList } from "./pages/services";
import { UserList } from "./pages/users";
import { PERMISSION_TOKEN } from "./providers";
import { PermissionsItems } from "./interfaces/type";
import { Skeleton } from "antd";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPermissions = localStorage.getItem(PERMISSION_TOKEN);

    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }

    setLoading(false);
  }, []);

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
      name: "expenses",
      list: "/expenses",
      create: "/expenses/new",
      edit: "/expenses/:id/edit",
      show: "/expenses/:id",
      meta: {
        icon: <UnorderedListOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
      },
    },
    {
      name: "categories",
      list: "/categories",
      meta: {
        icon: <TagsOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
        hide: !permissions?.includes(PermissionsItems.CATEGORY_READ),
      },
    },
    {
      name: "services",
      list: "/services",
      meta: {
        icon: <ApartmentOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
        hide: !permissions?.includes(PermissionsItems.SERVICE_READ),
      },
    },
    {
      name: "users",
      list: "/users",
      meta: {
        icon: <UserOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
        hide: !permissions?.includes(PermissionsItems.USER_READ),
      },
    },
  ].filter(resource => !resource.meta.hide);

  if (loading) {
    return <Skeleton active />;
  }

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
                <Route
                  path="/customers"
                  element={
                    <CustomerList>
                      <Outlet />
                    </CustomerList>
                  }
                >
                  <Route path=":id" element={<CustomerShow />} />
                </Route>
                <Route
                  path="/expenses"
                  element={
                    <ProductList>
                      <Outlet />
                    </ProductList>
                  }
                >
                  <Route path="new" element={<ProductCreate />} />
                  <Route path=":id" element={<ProductShow />} />
                  <Route path=":id/edit" element={<ProductEdit />} />
                </Route>
                <Route path="/stores">
                  <Route index element={<StoreList />} />
                  <Route path="new" element={<StoreCreate />} />
                  <Route path=":id/edit" element={<StoreEdit />} />
                </Route>
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/services" element={<ServiceList />} />
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
