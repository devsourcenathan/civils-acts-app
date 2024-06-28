import { useTranslate, type HttpError } from "@refinedev/core";
import { Create, EditButton, List, useForm, useTable } from "@refinedev/antd";
import { Button, Col, Drawer, Form, Input, Row, Table, notification } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Utilisateur } from "../../interfaces/type";

export const UtilisateurList = () => {
    const { tableProps } = useTable<Utilisateur, HttpError>();
    const { formProps, saveButtonProps } = useForm<Utilisateur>({
        onMutationSuccess: () => {
            notification.success({ message: "Utilisateur ajouté" });
            formProps.form?.resetFields();
        },
        onMutationError: () => {
            notification.error({ message: "Une erreur s'est produite" });
        }
    });

    const t = useTranslate();
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [updatedUtilisateur, setUpdatedUtilisateur] = useState<Utilisateur>();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleUpdate = (data: Utilisateur) => {
        setUpdatedUtilisateur(() => data);
        setOpenEdit(true);
    };

    return (
        <>
            <Drawer
                title="Créer un nouvel utilisateur"
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
                                    <Input placeholder="Entrer le nom de l'utilisateur" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="prenom"
                                    label="Prenom"
                                    rules={[{ required: true, message: 'Ce champ est requis' }]}
                                >
                                    <Input placeholder="Entrer le prénom de l'utilisateur" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: 'Ce champ est requis' }]}
                                >
                                    <Input placeholder="Entrer l'email de l'utilisateur" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="passwords"
                                    label="Mot de passe"
                                    rules={[{ required: true, message: 'Ce champ est requis' }]}
                                >
                                    <Input placeholder="Entrer le mot de passe de l'utilisateur" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="roles"
                                    label="Roles"
                                    rules={[{ required: true, message: 'Ce champ est requis' }]}
                                >
                                    <Input placeholder="Entrer le rôle de l'utilisateur" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="telephone"
                                    label="Téléphone"
                                    rules={[{ required: true, message: 'Ce champ est requis' }]}
                                >
                                    <Input placeholder="Entrer le téléphone de l'utilisateur" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Create>
            </Drawer>

            <List
                headerButtons={
                    <Button onClick={showDrawer} type="primary" iconPosition="end" icon={<PlusCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}>
                        Créer un utilisateur
                    </Button>
                }
            >
                <Table
                    {...tableProps}
                    rowKey="id"
                    scroll={{
                        x: true,
                    }}
                    pagination={{
                        ...tableProps.pagination,
                        hideOnSinglePage: true,
                        showTotal: (total) => `${total} utilisateurs`,
                    }}
                >
                    <Table.Column
                        key="nom"
                        dataIndex="nom"
                        width={224}
                        title={t("Nom")}
                    />
                    <Table.Column
                        key="prenom"
                        dataIndex="prenom"
                        width={224}
                        title={t("Prenom")}
                    />
                    <Table.Column
                        key="email"
                        dataIndex="email"
                        width={224}
                        title={t("Email")}
                    />
                    <Table.Column
                        key="roles"
                        dataIndex="roles"
                        width={224}
                        title={t("Roles")}
                    />
                    <Table.Column
                        key="telephone"
                        dataIndex="telephone"
                        width={224}
                        title={t("Téléphone")}
                    />
                    <Table.Column
                        key="actions"
                        render={(_, data: Utilisateur) => <EditButton onClick={() => handleUpdate(data)} />}
                    />
                </Table>
            </List>
        </>
    );
};
