import { useTranslate, type HttpError } from "@refinedev/core";
import { Create, EditButton, List, useForm, useTable } from "@refinedev/antd";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Table, notification } from "antd";
import {
  PaginationTotal,
} from "../../components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { EditRegistre } from "./components/edit";
import { Registre } from "../../interfaces/type";

export const RegistreList = () => {
  const { tableProps } = useTable<Registre, HttpError>();
  const { formProps, saveButtonProps } = useForm<Registre>({
    onMutationSuccess: () => {
      notification.success({ message: "La Registre a été ajouté" })
      formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const t = useTranslate();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedRegistre, setUpdatedRegistre] = useState<Registre>();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data: Registre) => {
    setUpdatedRegistre(() => data)
    setOpenEdit(true)
  }


  return (
    <>
      <Drawer
        title="Créer un nouveau registre"
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
                  name="libelle"
                  label="Libelle"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le libelle" />
                </Form.Item>

              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="annee"
                  label="Annee"
                  rules={[
                    {
                      required: true,
                      message: 'Ce champ est requis',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Create>
      </Drawer>

      <List
        headerButtons={
          <Button onClick={showDrawer}
            type="primary" iconPosition="end"
            icon={<PlusCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            title="Create Registre" >Creer un registre
          </Button>
        }>
        <EditRegistre open={openEdit} setOpen={setOpenEdit} registre={updatedRegistre!} />
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
              <PaginationTotal total={total} entityName="Registres" />
            ),
          }}
        >
          <Table.Column
            key="libelle"
            dataIndex="libelle"
            width={224}
            title={t("Libelle")}
          />

          <Table.Column
            key="annee"
            dataIndex="annee"
            width={224}
            title={t("Annee")}
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
            render={(_, data: Registre) => <EditButton onClick={() => handleUpdate(data)} />}
          />

        </Table>
      </List>
    </>
  );
};
