import { useTranslate, type HttpError } from "@refinedev/core";
import { Create, EditButton, List, useForm, useTable } from "@refinedev/antd";
import { Button, Col, Drawer, Form, Input, Row, Space, Table, notification } from "antd";
import type { IService } from "../../interfaces";
import {
  PaginationTotal,
  CategoryStatus,
  TableCategoryProductColumn,
} from "../../components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { EditService } from "./components/edit";

export const ServiceList = () => {
  const { tableProps } = useTable<IService, HttpError>();
  const { formProps, saveButtonProps } = useForm<IService>({
    onMutationSuccess: () => {
      notification.success({ message: "Le service a été ajouté" })
      formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const t = useTranslate();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedService, setUpdatedService] = useState<IService>();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data: IService) => {
    setUpdatedService(() => data)
    setOpenEdit(true)
  }

  return (
    <>
      <Drawer
        title="Créer un nouveau service"
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
                  label="Name"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le nom du service" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'Ce champ est requis',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="Saisir la description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Create>
      </Drawer>

      <List headerButtons={<Button onClick={showDrawer} type="primary" iconPosition="end" icon={<PlusCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} title="Create service" >Create Service</Button>}>
        <EditService open={openEdit} setOpen={setOpenEdit} service={updatedService!} />
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
              <PaginationTotal total={total} entityName="categories" />
            ),
          }}
        >
          <Table.Column
            key="name"
            dataIndex="name"
            width={224}
            title={t("categories.fields.title")}
          />

          <Table.Column
            key="description"
            dataIndex="description"
            width={224}
            title={t("Description")}
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
            render={(_, data: IService) => <EditButton onClick={() => handleUpdate(data)} />}
          />

        </Table>
      </List>
    </>
  );
};
