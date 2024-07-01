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
import { Acte } from "../../interfaces/type";


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


  const [latestActes, setLatestActes] = useState<Acte[]>([]);

  const fetchActes = async () => {
    try {
      // Effectuer la requête GET avec fetch
      const response = await fetch(`${API_URL}/actes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Extraire les données JSON de la réponse
      const data = await response.json();


      setLatestActes(data)

      // Vous pouvez ensuite utiliser ces données pour mettre à jour l'état de votre composant ou autre
    } catch (error) {
      // Gérer les erreurs
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchActes();
  }, []);

  // const { queryResult } =
  //   useSelect<ICategory>({
  //     resource: "categories",
  //     optionLabel: "name",
  //     optionValue: "id",
  //   });

  // const categories = queryResult?.data?.data || [];



  const columns: TableColumnsType<Acte> = [
    { title: 'Titre', dataIndex: 'name', key: 'name' },
    // {
    //   title: 'Categorie', dataIndex: 'category_id', key: 'category_id', render(value, record, index) {
    //     const category = categories.find((c) => c.id == value)
    //     return <Badge color={category?.color} count={category?.name} />;
    //   },
    // },
    // {
    //   title: 'Service', dataIndex: 'service_id', key: 'service_id', render(value, record, index) {
    //     return <Badge color="purple" count={services.find((service) => service.id == value)?.name} />;
    //   },
    // },
    { title: 'Quantite', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Unite', dataIndex: 'unit', key: 'unit' },
    { title: 'Prix unitaire', dataIndex: 'unit_price', key: 'unit_price' },
    {
      title: 'Date', dataIndex: 'date', key: 'date', render(value, record, index) {
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
  ];


  return (
    <List
      title={t("dashboard.overview.title")}

    >
      <Row gutter={[16, 16]}>

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
            title={t("Dernièrs enregistrements")}
          >

            <Table
              style={{ width: "100%" }}
              pagination={false}
              columns={columns}
              dataSource={latestActes.slice(0, 9)}
            />
          </CardWithContent>
        </Col>
      </Row>
    </List>
  );
};
