import { useTranslate, type HttpError } from "@refinedev/core";
import { Create, EditButton, List, useForm, useTable } from "@refinedev/antd";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Table, notification } from "antd";
import { type ICategory } from "../../interfaces";
import {
  PaginationTotal,
  CategoryStatus,
  TableCategoryProductColumn,
} from "../../components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { EditCategorie } from "./components/edit";
import { PERMISSION_TOKEN } from "../../providers";
import { PermissionsItems } from "../../interfaces/type";

export const CategoryList = () => {
  const { tableProps } = useTable<ICategory, HttpError>();
  const { formProps, saveButtonProps } = useForm<ICategory>({
    onMutationSuccess: () => {
      notification.success({ message: "La categorie a été ajouté" })
      formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const t = useTranslate();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState<ICategory>();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data: ICategory) => {
    setUpdatedCategory(() => data)
    setOpenEdit(true)
  }

  const permissions = JSON.parse(localStorage.getItem(PERMISSION_TOKEN)!)

  return (
    <>
      <Drawer
        title="Créer une nouvelle catégorie"
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
                  <Input placeholder="Entrer le nom de la catégorie" />
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

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="color"
                  label="Color"
                  initialValue="green"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Select
                    options={[
                      {
                        label: "Vert",
                        value: "green"
                      },
                      {
                        label: "Rouge",
                        value: "red"
                      },
                      {
                        label: "Blue",
                        value: "blue"
                      },
                    ]} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Create>
      </Drawer>

      <List
        headerButtons={permissions.includes(PermissionsItems.CATEGORY_WRITE) &&
          <Button onClick={showDrawer}
            type="primary" iconPosition="end"
            icon={<PlusCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            title="Create category" >Creer une categorie
          </Button>
        }>
        <EditCategorie open={openEdit} setOpen={setOpenEdit} category={updatedCategory!} />
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
            render={(_, data: ICategory) => permissions.includes(PermissionsItems.CATEGORY_WRITE) && <EditButton onClick={() => handleUpdate(data)} />}
          />

        </Table>
      </List>
    </>
  );
};
