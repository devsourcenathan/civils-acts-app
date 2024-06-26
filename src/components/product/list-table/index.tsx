import {
  type HttpError,
  getDefaultFilter,
  useGo,
  useNavigation,
  useTranslate,
  useList,
} from "@refinedev/core";
import {
  Edit,
  EditButton,
  FilterDropdown,
  NumberField,
  getDefaultSortOrder,
  useDrawerForm,
  useSelect,
  useTable,
} from "@refinedev/antd";
import type { GroupedExpenses, ICategory, IExpense, IService, User } from "../../../interfaces";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  TableColumnsType,
  Typography,
  message,
  theme,
} from "antd";
import { ProductStatus } from "../status";
import { PaginationTotal } from "../../paginationTotal";
import { EditOutlined, EyeOutlined, MailOutlined, SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import emailjs from '@emailjs/browser';
import { useState } from "react";
import type { SelectProps } from 'antd';
import { EditExpense } from "../../../pages/expenses/components/edit";
import { PERMISSION_TOKEN, ROLE_TOKEN, SERVICE_TOKEN } from "../../../providers";
import { PermissionsItems } from "../../../interfaces/type";

const { TextArea } = Input;

export const ProductListTable = () => {
  const [currentExpense, setCurrentExpense] = useState<GroupedExpenses | null>(null);
  const [updatedExpense, setUpdatedExpense] = useState<IExpense>()
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [reveivers, setReceivers] = useState<string[]>([])

  const role = localStorage.getItem(ROLE_TOKEN)!
  const service_id = JSON.parse(localStorage.getItem(SERVICE_TOKEN)!)
  const permissions = JSON.parse(localStorage.getItem(PERMISSION_TOKEN)!)

  const { data } = useList<User>({
    resource: 'users',
  })
  const options: SelectProps['options'] = [];

  if (data) {
    data?.data?.map((user: User) => {
      options.push({
        label: user.email,
        value: user.email
      })
    })
  }

  const handleChange = (value: string[]) => {
    setReceivers(value);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (reveivers.length === 0) {
      message.warning("Choisir un destinataire !")
      return
    }
    setConfirmLoading(true);
    message.info("Email en cours d'envoi");
    for (let index = 0; index < reveivers.length; index++) {
      sendMail(reveivers[index]);

      if (index === reveivers.length - 1) {
        setModalText('')
        setOpen(false)
        setConfirmLoading(false);
      }
    }

  };

  const handleCancel = () => {
    setOpen(false);
  };

  const sendMail = (receiver: string) => {

    const expenseTable = currentExpense?.expenses.map((expense: IExpense) => `
      <tr>
        <td>${expense.date}</td>
        <td>${expense.name}</td>
        <td>${expense.quantity}</td>
        <td>${expense.unit_price}</td>
        <td>${parseFloat(expense.unit_price) * expense.quantity} XFA</td> 
      </tr>
    `).join('');

    var data = {
      service_id: 'service_5d6balx',
      template_id: 'template_oip18ix',
      user_id: '3D9Ne5pwIR0ufZNdG',
      template_params: {
        'subject': `Rapport de depenses du ${currentExpense?.date}`,
        'title': `<h3>Rapport de Dépenses, somme total ${currentExpense?.total_sum} XFA</h3>`,
        'message': ` 
          <div> 
            <p>Bonjour/Bonsoir,</p>
            <p>Veuillez trouver ci-dessous la liste des dépenses datant du ${dayjs().format("DD MMM YYYY")} :</p>
            <table border="1" style="width: 100%" cellspacing="0" cellpadding="10">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Designation</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${expenseTable}
              </tbody>
            </table>
            <p>
              <b>Remarque: </b>
              <br />
              <p>${modalText.length > 0 ? modalText : "Pas de remarque"}</p>
            </p>
            <p>Merci,</p>
            <p>L'équipe Comptabilité</p>
          </div> 
      `,
        'receiver': receiver,
        'to_reply': 'sadenachbinathan@gmail.com'
      }
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          message.success(`Email envoyé à ${receiver}.`);
        } else {
          message.error(`Une erreur est survenue.`);
        }
      })
      .catch(error => {
        message.error('Oops... ' + error.message);
      });

  }
  const t = useTranslate();
  const { tableProps, sorters, filters } = useTable<IExpense, HttpError>({});

  const { queryResult } =
    useSelect<ICategory>({
      resource: "categories",
      optionLabel: "name",
      optionValue: "id",
      defaultValue: getDefaultFilter("category.id", filters, "in"),
    });

  const categories = queryResult?.data?.data || [];


  const { queryResult: sResult } =
    useSelect<IService>({
      resource: "services",
      optionLabel: "name",
      optionValue: "id",
      defaultValue: getDefaultFilter("service.id", filters, "in"),
    });

  const services = sResult?.data?.data || [];

  const groupByDate = (expenses: IExpense[]): GroupedExpenses[] => {
    const groupedData: { [key: string]: GroupedExpenses } = expenses?.reduce((acc, expense) => {
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = {
          date: date,
          total_sum: 0,
          expenses: []
        };
      }
      if ((["ADMIN", "MANAGER", "SECRETARY"].includes(role) || expense.service_id == service_id)) {
        acc[date].total_sum += expense.quantity * parseFloat(expense.unit_price);
        acc[date].expenses.push(expense);
      }

      return acc;
    }, {} as { [key: string]: GroupedExpenses });

    return Object.values(groupedData);
  };




  const columns: TableColumnsType<IExpense> = [
    { title: 'Titre', dataIndex: 'name', key: 'name' },
    {
      title: 'Categorie', dataIndex: 'category_id', key: 'category_id', render(value, record, index) {
        return <Badge color={categories.find((c) => c.id == value)?.color} count={categories.find((category) => category.id == value)?.name} />;
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
      title: 'Date de creation', dataIndex: 'created_at', key: 'created_at', render(value, record, index) {
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      title: 'Derniere modification', dataIndex: 'updated_at', key: 'updated_at', render(value, record, index) {
        return dayjs(value).fromNow();
      },
    },
    {
      title: "Actions", key: "actions", render(value, record, index) {
        const editBtn = (["ADMIN", "MANAGER", "SECRETARY"].includes(role) || record.service_id == service_id) && <EditButton
          hideText
          size="small"
          recordItemId={record.id}
          onClick={() => {
            setUpdatedExpense(record)
            setOpenUpdate(true)
          }}
        />
        return editBtn
      },
    }
  ];

  const [openUpdate, setOpenUpdate] = useState(false)
  return (
    <>
      <Modal
        title={`Envoyer un mail de depense pour le ${currentExpense?.date}`}
        open={open}
        okText="Envoyer"
        cancelText="Annuler"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Destinataires">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Choisir un ou plusieur destinataires"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>

          <Form.Item label="Commentaire">
            <TextArea value={modalText} onChange={(e) => setModalText(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>


      <EditExpense open={openUpdate} setOpen={setOpenUpdate} expense={updatedExpense!} />
      <Table
        // {...tableProps}
        dataSource={groupByDate(tableProps.dataSource as IExpense[] ?? [])}
        rowKey="date"
        scroll={{ x: true }}
        pagination={{
          ...tableProps.pagination,
          showTotal: (total) => (
            <PaginationTotal total={total} entityName="expenses" />
          ),
        }}
        expandable={{
          expandedRowRender: (record) =>
            <div>
              <Table
                style={{ width: "100%" }}
                pagination={false}
                columns={columns}
                dataSource={record.expenses}
              />
            </div>
          ,
        }}
      >

        <Table.Column
          title={t("Date")}
          dataIndex="date"
          key="date"

          render={(value: string) => {
            return (
              <Typography.Text
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {value}
              </Typography.Text>
            );
          }}
        />
        <Table.Column
          title={t("Montant Total")}
          dataIndex="total_sum"
          key="total_sum"
          align="right"
          sorter
          defaultSortOrder={getDefaultSortOrder("price", sorters)}
          render={(price: number) => {
            return (
              <NumberField
                value={price}
                style={{
                  width: "80px",
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
                options={{
                  style: "currency",
                  currency: "XFA",
                }}
              />
            );
          }}
        />

        <Table.Column
          title={t("Actions")}
          key={"actions"}
          render={(_, record: GroupedExpenses) => (
            <Button onClick={() => {
              setCurrentExpense(record)
              showModal()
            }} icon={<MailOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} />
          )}
        />
      </Table>
    </>
  );
};

