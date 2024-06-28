import { useTranslate, type HttpError } from "@refinedev/core";
import { Create, EditButton, List, useForm, useTable } from "@refinedev/antd";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Table, notification } from "antd";
import {
  PaginationTotal,
} from "../../components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { EditFormation } from "./components/edit";
import { Formation } from "../../interfaces/type";

export const FormationList = () => {
  const { tableProps } = useTable<Formation, HttpError>();
  const { formProps, saveButtonProps } = useForm<Formation>({
    onMutationSuccess: () => {
      notification.success({ message: "La Formation a été ajouté" })
      formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const t = useTranslate();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedFormation, setUpdatedFormation] = useState<Formation>();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data: Formation) => {
    setUpdatedFormation(() => data)
    setOpenEdit(true)
  }


  return (
    <>
      <Drawer
        title="Créer un nouveau Formation"
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
                  name="code"
                  label="Code"
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
            title="Create Formation" >Creer un Formation
          </Button>
        }>
        <EditFormation open={openEdit} setOpen={setOpenEdit} formation={updatedFormation!} />
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
              <PaginationTotal total={total} entityName="Formations" />
            ),
          }}
        >
          <Table.Column
            key="code"
            dataIndex="code"
            width={224}
            title={t("Code")}
          />

          <Table.Column
            key="libelle"
            dataIndex="libelle"
            width={224}
            title={t("Libelle")}
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
            render={(_, data: Formation) => <EditButton onClick={() => handleUpdate(data)} />}
          />

        </Table>
      </List>
    </>
  );
};
