import { useTranslate, type HttpError } from "@refinedev/core";
import { Create, EditButton, List, useForm, useSelect, useTable } from "@refinedev/antd";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Table, notification } from "antd";
import {
  PaginationTotal,
} from "../../components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { EditActe } from "./components/edit";
import { Acte, Centre, Formation, Mariage, Registre } from "../../interfaces/type";
import { getRandomIntInclusive } from "../../utils/config";

export const ActeList = () => {
  const { tableProps } = useTable<Acte, HttpError>();
  const [currentType, serCurrentType] = useState("Mariage")
  const [currentStep, setCurrentStep] = useState(0)
  const [createdActeId, setCreatedActeId] = useState(0)
  const [createdActeNum, setCreatedActeNum] = useState("")
  const { formProps, saveButtonProps } = useForm<Acte>({

    onMutationSuccess: ({ data }) => {
      notification.success({ message: "L'acte a été ajouté" })
      setCurrentStep(1)
      setCreatedActeId(data.id)
      setCreatedActeNum(data.numacte)
      serCurrentType(formProps.form?.getFieldValue("type"))
      // formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const { formProps: mariageProps, saveButtonProps: saveMariageProps } = useForm<Mariage>({

    onMutationSuccess: ({ data }) => {
      notification.success({ message: "L'acte a été sauvegardé" })
      setCurrentStep(0)
      setCreatedActeId(0)
      formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const t = useTranslate();

  const { selectProps: formationsProps } = useSelect<Formation>({
    resource: 'formations',
    optionLabel: "libelle",
    optionValue: 'id'
  })

  const { selectProps: registresProps } = useSelect<Registre>({
    resource: 'registres',
    optionLabel: "libelle",
    optionValue: 'id'
  })

  const { selectProps: centresProps } = useSelect<Centre>({
    resource: 'centres',
    optionLabel: "nom",
    optionValue: 'id'
  })
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedActe, setUpdatedActe] = useState<Acte>();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data: Acte) => {
    setUpdatedActe(() => data)
    setOpenEdit(true)
  }


  return (
    <>
      <Drawer
        title="Ajouter un nouvel acte"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {currentStep == 0 && <Create title={false} breadcrumb={false} goBack={false} saveButtonProps={saveButtonProps}>
          <Form {...formProps} layout="vertical" hideRequiredMark >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="numacte"
                  label="Num Acte"
                  initialValue={getRandomIntInclusive(99999, 9999999999999)}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateetablissementacte"
                  label="Date Etablissement Acte"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="cnipere"
                  label="CNI du pere"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le numero de CNI du pere" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="cnimere"
                  label="CNI de la mere"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le numero de CNI de la mere" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="cnitemoin1"
                  label="CNI du premier temoin"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le numero de CNI du premier temoin" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="cnitemoin2"
                  label="CNI du second temoin"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le numero de CNI du second temoin" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="idregistre"
                  label="Registre"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Select {...registresProps} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="idformation"
                  label="Centre de formation"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Select {...formationsProps} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="type"
                  label="Type d'acte"
                  initialValue="Mariage"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Select
                    options={[
                      {
                        label: "Mariage",
                        value: "Mariage"
                      },
                      {
                        label: "Naissance",
                        value: "Naissance"
                      },
                      {
                        label: "Deces",
                        value: "Deces"
                      },
                    ]} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Create>}

        {currentStep == 1 && <Create title={false} breadcrumb={false} goBack={false} saveButtonProps={saveMariageProps}>
          <Form {...mariageProps} layout="vertical" hideRequiredMark >
            <Row gutter={24}>
              <Col span={24}>
                {/* <Form.Item
                  name="id_acte"
                  label="Num Acte"
                >
                  <Input disabled value={createdActeNum} />
                </Form.Item> */}
                <Form.Item
                  name="numacte"
                  label="Libelle"
                  initialValue={"ACTE-" + Math.floor(Math.random() * 1000000)}
                // hidden
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="cniepoux"
                  label="CNI de l'epoux"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le numero de CNI de l'epoux" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="cniepouse"
                  label="CNI de l'epouse"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input placeholder="Entrer le numero de CNI de l'epouse" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="nomepoux"
                  label="Nom Epoux"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nomepouse"
                  label="Nom Epouse"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="datenaissanceepoux"
                  label="Date Naissance Epoux"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="datenaissanceepouse"
                  label="Date Naissance Epouse"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="lieunaissanceepoux"
                  label="Lieu Naissance Epoux"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lieunaissanceepouse"
                  label="Lieu Naissance Epouse"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="professionepoux"
                  label="Profession Epoux"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="professionepouse"
                  label="Profession Epouse"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="domicileepoux"
                  label="Domicile Epoux"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="domicileepouse"
                  label="Domicile Epouse"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="nationaliteepoux"
                  label="Nationalite Epoux"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nationaliteepouse"
                  label="Nationalite Epouse"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="situationmatrimonialeepoux"
                  label="Situation Matrimonial Epoux"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="situationmatrimonialeepouse"
                  label="Situation Matrimoniale Epouse"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="regimematrimonial"
                  label="Regime Matrimonial"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Select options={[
                    {
                      "label": "Communauté de biens",
                      "value": "CB"
                    },
                    {
                      "label": "Séparation de biens",
                      "value": "SB"
                    },
                    {
                      "label": "Communauté réduite aux acquêts",
                      "value": "CRA"
                    }
                  ]} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="idcentre"
                  label="Centre"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <Select {...centresProps} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Create>}
      </Drawer>

      <List
        headerButtons={
          <Button onClick={showDrawer}
            type="primary" iconPosition="end"
            icon={<PlusCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            title="Create Acte" >Creer un acte
          </Button>
        }>
        <EditActe open={openEdit} setOpen={setOpenEdit} acte={updatedActe!} />
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
            render={(_, data: Acte) => <EditButton onClick={() => handleUpdate(data)} />}
          />

        </Table>
      </List>
    </>
  );
};
