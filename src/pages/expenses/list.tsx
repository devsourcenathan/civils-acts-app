import { useGo, useNavigation, useTranslate } from "@refinedev/core";
import { Create, CreateButton, List, useForm, useSelect } from "@refinedev/antd";
import { ProductListCard, ProductListTable } from "../../components";
import { type PropsWithChildren, useState } from "react";
import { AppstoreOutlined, MinusCircleOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Drawer, Form, Input, Row, Segmented, Select, Space, notification } from "antd";
import { useLocation } from "react-router-dom";
import { ICategory, IExpense, IService } from "../../interfaces";
import { PERMISSION_TOKEN, ROLE_TOKEN, SERVICE_TOKEN } from "../../providers";
import { PermissionsItems } from "../../interfaces/type";

type View = "table" | "card";

export const ProductList = ({ children }: PropsWithChildren) => {
  const { formProps, saveButtonProps } = useForm<IExpense>({
    onMutationSuccess: () => {
      notification.success({ message: "La transaction a été éffectué" })
      formProps.form?.resetFields()
    },

    onMutationError: () => {
      notification.error({ message: "Une erreur s'est produite" })
    }
  });

  const { selectProps } =
    useSelect<ICategory>({
      resource: "categories",
      optionLabel: "name",
      optionValue: "id"
    });


  const { selectProps: servicesProps } =
    useSelect<IService>({
      resource: "services",
      optionLabel: "name",
      optionValue: "id"
    });


  const t = useTranslate();


  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const role = localStorage.getItem(ROLE_TOKEN)!
  const service_id = JSON.parse(localStorage.getItem(SERVICE_TOKEN)!)

  return (
    <>
      <Drawer
        title="Ajouter une nouvelle transaction"
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
                  name="date"
                  label="Date de la transaction"
                  rules={[{ required: true, message: 'Ce champ est requis' }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.List name="expenses">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Row>
                          <Col span={24}>
                            <Space key={key} style={{ display: 'flex' }} align="baseline">
                              <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                rules={[{ required: true, message: 'Saisir un titre' }]}
                              >
                                <Input placeholder="Titre" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'service_id']}
                                hidden={!["ADMIN", "MANAGER", "SECRETARY"].includes(role)}
                                initialValue={!["ADMIN", "MANAGER", "SECRETARY"].includes(role) ? service_id : "Choisir un service"}
                              >
                                <Select placeholder="Choisir un service" {...servicesProps} />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'category_id']}
                                rules={[{ required: true, message: 'Choisir une catégorie' }]}
                              >
                                <Select placeholder="Choisir une catégorie" {...selectProps} />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'unit']}
                                rules={[{ required: true, message: 'Choisir une unité' }]}
                              >
                                <Select options={["Kg", "Litre", "Unité"].map((unit) => ({ label: unit, value: unit }))} placeholder="Choisir une unite" />
                              </Form.Item>

                            </Space>
                          </Col>

                          <Col span={24}>
                            <Space key={key} style={{ display: 'flex' }} align="baseline">
                              <Form.Item
                                {...restField}
                                name={[name, 'quantity']}
                                rules={[{ required: true, message: 'Saisir une quantité' }]}
                              >
                                <Input placeholder="Quantité" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'unit_price']}
                              >
                                <Input placeholder="Prix unitaire" />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, 'total_price']}
                              >
                                <Input placeholder="Total" />
                              </Form.Item>
                            </Space>
                          </Col>
                        </Row>


                        <MinusCircleOutlined onClick={() => remove(name)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                      </Space>
                      <Divider />
                    </>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}>
                      Ajouter
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

          </Form>
        </Create>
      </Drawer>

      <List
        breadcrumb={false}
        headerButtons={(props) => [

          <CreateButton
            {...props.createButtonProps}
            key="create"
            size="large"
            onClick={showDrawer}
          >
            {t("Ajouter une transaction")}
          </CreateButton>,
        ]}
      >
        <ProductListTable />
        {children}
      </List>

    </>
  );
};
