import { useTranslate, type HttpError } from "@refinedev/core";
import { Create, EditButton, List, useForm, useTable } from "@refinedev/antd";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Table, notification } from "antd";
import {
  PaginationTotal,
} from "../../components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { EditCentre } from "./components/edit";
import { compareDepartments, departements, regionsWithDepartements } from "../../utils/config";
import { Centre } from "../../interfaces/type";

export const CentreList = () => {
  const { tableProps } = useTable<Centre, HttpError>();
  const { formProps, saveButtonProps } = useForm<Centre>({
    onMutationSuccess: () => {
      notification.success({ message: "La Centre a été ajouté" })
      formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const t = useTranslate();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedCentre, setUpdatedCentre] = useState<Centre>();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data: Centre) => {
    setUpdatedCentre(() => data)
    setOpenEdit(true)
  }


  const [currentDepartements, setCurrentDepartements] = useState<{ label: string; value: string; }[]>(departements.sort(compareDepartments))
  return (
    <>
      <Drawer
        title="Ajouter un centre"
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
                  name="nom"
                  label="Nom"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="region"
                  label="Region"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Select options={regionsWithDepartements}
                    onChange={(value) => {
                      setCurrentDepartements(regionsWithDepartements.find(r => r.value == value)?.departments ?? [])
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="departement"
                  label="Departement"
                  rules={[
                    {
                      required: true,
                      message: 'Ce champ est requis',
                    },
                  ]}
                >
                  <Select options={currentDepartements} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="arrondissement"
                  label="Arrondissement"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
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
            title="Create Centre" >Creer un centre
          </Button>
        }>
        <EditCentre open={openEdit} setOpen={setOpenEdit} centre={updatedCentre!} />
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
              <PaginationTotal total={total} entityName="centres" />
            ),
          }}
        >
          <Table.Column
            key="nom"
            dataIndex="nom"
            width={224}
            title={t("Nom du centre")}
          />
          <Table.Column
            key="region"
            dataIndex="region"
            width={224}
            title={t("Region")}
            render={(value) => regionsWithDepartements.find(r => r.value == value)?.label}
          />

          <Table.Column
            key="departement"
            dataIndex="departement"
            width={224}
            title={t("Departement")}
            render={(value, record: any) => regionsWithDepartements.find(r => r.value == record.region)?.departments.find(d => d.value == value)?.label}
          />

          <Table.Column
            key="arrondissement"
            dataIndex="arrondissement"
            width={224}
            title={t("Arrondissement")}
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
            render={(_, data: Centre) => <EditButton onClick={() => handleUpdate(data)} />}
          />

        </Table>
      </List>
    </>
  );
};
