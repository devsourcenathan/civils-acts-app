import { useTranslate, type HttpError } from "@refinedev/core";
import { Create, EditButton, List, useForm, useSelect, useTable } from "@refinedev/antd";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Table, notification } from "antd";
import { type User } from "../../interfaces";
import {
  PaginationTotal,
  CategoryStatus,
  TableCategoryProductColumn,
} from "../../components";
import { LockOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { EditUser } from "./components/edit";
import { userRoles } from "../../utils/config";
import { EditUserPassword } from "./components/edit_password";

export const UserList = () => {
  const { tableProps } = useTable<User, HttpError>();

  const { formProps, saveButtonProps } = useForm<User>({
    onMutationSuccess: () => {
      notification.success({ message: "L'utilisateur a été ajouté" })
      formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const t = useTranslate();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User>();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data: User) => {
    setUpdatedUser(() => data)
    setOpenEdit(true)
  }

  const handleUpdatePassword = (data: User) => {
    setUpdatedUser(() => data)
    setOpenEditPassword(true)
  }
  const { selectProps } = useSelect({
    resource: 'services',
    optionLabel: "name",
    optionValue: 'id'
  })

  return (
    <>
      <Drawer
        title="Créer un nouveau utilisateur"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Create title={false} breadcrumb={false} goBack={false} saveButtonProps={saveButtonProps}>
          <Form {...formProps} layout="vertical" hideRequiredMark>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Nom complet"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le nom" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="service_id"
                  label="Service"
                >
                  <Select {...selectProps} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Ce champ est requis',
                    },
                  ]}
                >
                  <Input autoComplete="off" placeholder="Saisir l'email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Ce champ est requis',
                    },
                  ]}
                >
                  <Input autoComplete="off" placeholder="Saisir le mot de passe" type="password" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: 'Ce champ est requis',
                    },
                  ]}
                >
                  <Select options={userRoles} defaultValue={"STAFF"} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Create>
      </Drawer>

      <List headerButtons={<Button onClick={showDrawer} type="primary" iconPosition="end" icon={<PlusCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} title="Nouvel utilsateur" >Nouvel utilisateur</Button>}>
        <EditUser open={openEdit} setOpen={setOpenEdit} user={updatedUser!} />
        <EditUserPassword open={openEditPassword} setOpen={setOpenEditPassword} user={updatedUser!} />
        <Table
          {...tableProps}
          rowKey="id"
          scroll={{
            x: true,
          }}
          pagination={{
            ...tableProps.pagination,
            hideOnSinglePage: true,
            showTotal: (total) => (
              <PaginationTotal total={total} entityName="users" />
            ),
          }}
        >
          <Table.Column
            key="name"
            dataIndex="name"
            width={224}
            title={t("Noms")}
          />

          <Table.Column
            key="email"
            dataIndex="email"
            width={224}
            title={t("Email")}
          />

          <Table.Column
            key="roles"
            dataIndex="role"
            width={224}
            title={t("Roles")}
          />

          <Table.Column
            dataIndex="created_at"
            key="created_at"
            width={224}
            title={t("Date de creation")}
            render={(value) => dayjs(value).format("DD/MM/YYYY")}
          />

          <Table.Column
            key="actions"
            render={(_, data: User) => <Space>
              <EditButton onClick={() => handleUpdate(data)} />
              <EditButton style={{ borderColor: "red", color: "red" }} icon={<LockOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} onClick={() => handleUpdatePassword(data)} >
                Mot de passe
              </EditButton>
            </Space>}
          />

        </Table>
      </List>
    </>
  );
};