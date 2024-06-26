import { Row, Col, theme, Dropdown, type MenuProps, Button, Flex, TableColumnsType, Badge, Table } from "antd";
import { useTranslation } from "react-i18next";

import {
  CardWithPlot,
  DailyRevenue,
  DailyOrders,
  NewCustomers,
  CardWithContent,
  TrendUpIcon,
  TrendDownIcon,
  ProductListTable,
} from "../../components";
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  DownOutlined,
  RiseOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { List, NumberField, useSelect, useTable } from "@refinedev/antd";
import { HttpError, useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";
import type { ICategory, IExpense, ISalesChart, IService } from "../../interfaces";
import { TOKEN_KEY } from "../../providers/auth/authProvider";
import { PERMISSION_TOKEN, ROLE_TOKEN, SERVICE_TOKEN } from "../../providers";
import { PermissionsItems } from "../../interfaces/type";

type DateFilter = "lastWeek" | "lastMonth";

const DATE_FILTERS: Record<
  DateFilter,
  {
    text: string;
    value: DateFilter;
  }
> = {
  lastWeek: {
    text: "lastWeek",
    value: "lastWeek",
  },
  lastMonth: {
    text: "lastMonth",
    value: "lastMonth",
  },
};

export const DashboardPage: React.FC = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const API_URL = useApiUrl();
  const role = localStorage.getItem(ROLE_TOKEN)!
  const service_id = JSON.parse(localStorage.getItem(SERVICE_TOKEN)!)
  const permissions = JSON.parse(localStorage.getItem(PERMISSION_TOKEN)!)


  const [latestExpenses, setLatestExpenses] = useState<IExpense[]>([]);

  const fetchExpenses = async () => {
    try {
      // Effectuer la requête GET avec fetch
      const response = await fetch(`${API_URL}/expenses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}` // Remplacez par votre token d'authentification si nécessaire
        }
      });

      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Extraire les données JSON de la réponse
      const data = await response.json();

      if (["ADMIN", "MANAGER", "SECRETARY"].includes(role)) {
        setLatestExpenses(data)
      } else {
        const serviceData = data.filter((d: IExpense) => d.service_id == service_id)
        setLatestExpenses(serviceData)
      }

      // Vous pouvez ensuite utiliser ces données pour mettre à jour l'état de votre composant ou autre
    } catch (error) {
      // Gérer les erreurs
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const { queryResult } =
    useSelect<ICategory>({
      resource: "categories",
      optionLabel: "name",
      optionValue: "id",
    });

  const categories = queryResult?.data?.data || [];

  const { queryResult: sResult } =
    useSelect<IService>({
      resource: "services",
      optionLabel: "name",
      optionValue: "id",
    });

  const services = sResult?.data?.data || [];

  const columns: TableColumnsType<IExpense> = [
    { title: 'Titre', dataIndex: 'name', key: 'name' },
    {
      title: 'Categorie', dataIndex: 'category_id', key: 'category_id', render(value, record, index) {
        const category = categories.find((c) => c.id == value)
        return <Badge color={category?.color} count={category?.name} />;
      },
    },
    {
      title: 'Service', dataIndex: 'service_id', key: 'service_id', render(value, record, index) {
        return <Badge color="purple" count={services.find((service) => service.id == value)?.name} />;
      },
    },
    { title: 'Quantite', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Unite', dataIndex: 'unit', key: 'unit' },
    { title: 'Prix unitaire', dataIndex: 'unit_price', key: 'unit_price' },
    {
      title: 'Date', dataIndex: 'date', key: 'date', render(value, record, index) {
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
  ];

  const revenue = useMemo(() => {
    const data = latestExpenses as IExpense[];
    if (!data)
      return {
        data: [],
        trend: 0,
      };

    const plotData = data.map((revenue) => {
      const date = dayjs(revenue.date);
      return {
        timeUnix: date.unix(),
        timeText: date.format("DD MMM YYYY"),
        value: revenue.quantity * parseFloat(revenue.unit_price),
        state: "Daily Revenue",
      };
    });

    return {
      data: plotData,
      trend: data.filter((revenue) => dayjs(revenue.date).diff(dayjs(), "day") === 0).reduce((sum, expense) => sum + (expense.price || (parseFloat(expense.unit_price) * expense.quantity)), 0),
    };
  }, [latestExpenses]);




  return (
    <List
      title={t("dashboard.overview.title")}
    // headerButtons={() => (
    //   <Dropdown menu={{ items: dateFilters }}>
    //     <Button>
    //       {t(
    //         `dashboard.filter.date.${DATE_FILTERS[selecetedDateFilter].text}`,
    //       )}
    //       {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
    //       <DownOutlined />
    //     </Button>
    //   </Dropdown>
    // )}
    >
      <Row gutter={[16, 16]}>
        <Col md={24}>
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 10 }} lg={24} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                  <DollarCircleOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                title={t("Depenses du jour")}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField
                      value={revenue.trend}
                      options={{
                        style: "currency",
                        currency: "XFA",
                      }}
                    />
                    {revenue.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
              >
                <DailyRevenue height={170} data={revenue.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                  <ShoppingOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField value={0} />
                    {/* {orders.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />} */}
                  </Flex>
                }
                title={t("dashboard.dailyOrders.title")}
              >
                {/* <DailyOrders height={170} data={orders.data} /> */}
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                  <UserOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                title={t("dashboard.newCustomers.title")}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField
                      value={0}
                      // value={newCustomers.trend}
                      options={{
                        style: "percent",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }}
                    />
                    {/* {newCustomers.trend > 0 ? (
                      <TrendUpIcon />
                    ) : (
                      <TrendDownIcon />
                    )} */}
                  </Flex>
                }
              >
                {/* <NewCustomers height={170} data={newCustomers.data} /> */}
              </CardWithPlot>
            </Col>
          </Row>
        </Col>

        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              padding: "1px 0px 0px 0px",
            }}
            icon={
              // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
              <ShoppingOutlined
                style={{
                  fontSize: 14,
                  color: token.colorPrimary,
                }}
              />
            }
            title={t("Dernières transactions")}
          >

            <Table
              style={{ width: "100%" }}
              pagination={false}
              columns={columns}
              dataSource={latestExpenses.slice(0, 9)}
            />
          </CardWithContent>
        </Col>
      </Row>
    </List>
  );
};
