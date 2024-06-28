import { Badge, Button, Checkbox, Col, Drawer, Form, Input, Row, Select, Space, Tag, message } from 'antd'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICategory, IService, User } from '../../../interfaces'
import { useForm, useSelect } from '@refinedev/antd'
import { useUpdate } from '@refinedev/core'
import { API_URL } from '../../../providers'
import { TOKEN_KEY } from '../../../providers/auth/authProvider'
import { userRoles } from '../../../utils/config'
import { PermissionsItems } from '../../../interfaces/type'

type EditUserProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    user: User
}
export const EditUser: React.FC<EditUserProps> = ({ open, setOpen, user }) => {
    const [form] = Form.useForm();
    const { mutate } = useUpdate();
    const [current, setCurrent] = useState<User | undefined>(undefined);
    const { selectProps } = useSelect({
        resource: 'services',
        optionLabel: "name",
        optionValue: 'id'
    })
    useEffect(() => {
        setCurrent(user);
    }, [user]);




    useEffect(() => {

        if (current) {

            form.setFieldsValue({
                centre_id: current.centre_id,
                fonction: current.fonction,
                nom: current.nom,
                prenom: current.prenom,
                email: current.email,
                telephone: current.telephone,
            });
        }
    }, [current, form]);

    const handleSubmit = async (values: any) => {

        const response = await fetch(`${API_URL}/users/${current?.id}`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                },
                body: JSON.stringify({ ...values })
            },

        )

        const res = await response.json()
        if (response.ok) {
            message.success("Mise a jour reussi !")
            mutate(
                {
                    resource: "users",
                    values: {
                        nom: res.nom,
                    },
                    id: res!.id,
                },
            )

            setOpen(false)
        } else {
            message.error("Une erreur s'est produite")
        }


    }

    return (
        <Drawer open={open} onClose={() => { setOpen(false) }}>
            <Form form={form} onFinish={handleSubmit} layout="vertical" hideRequiredMark>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            name="nom"
                            label="Nom"
                            rules={[{ required: true, message: 'Ce champ est requis' }]}
                        >
                            <Input placeholder="Entrer le nom" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            name="prenom"
                            label="Prenom"
                            rules={[{ required: true, message: 'Ce champ est requis' }]}
                        >
                            <Input placeholder="Entrer le prenom" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            name="centre_id"
                            label="Centre"
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
                            name="telephone"
                            label="Telephone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ce champ est requis',
                                },
                            ]}
                        >
                            <Input autoComplete="off" placeholder="Saisir le numero de telephone" />
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
                            name="fonction"
                            label="Fonction"
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
        </Drawer>
    )
}
