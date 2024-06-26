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

    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const handleCheck = (item: string) => {

        setCheckedItems((prev) => {
            if (prev == undefined) {
                return [item]
            }
            return prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        }
        );
    };

    useEffect(() => {

        if (current) {

            setCheckedItems(JSON.parse(current.permissions))

            form.setFieldsValue({
                service_id: current.service_id,
                role: current.role,
                name: current.name,
                email: current.email,
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
                body: JSON.stringify({ ...values, permissions: checkedItems })
            },

        )

        const res = await response.json()
        if (response.ok) {
            message.success("Mise a jour reussi !")
            mutate(
                {
                    resource: "users",
                    values: {
                        name: res.name,
                        description: res.email
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
            <Form form={form} onFinish={handleSubmit} layout='vertical'>
                <Form.Item name="name" label="Nom" >
                    <Input />
                </Form.Item>

                <Form.Item name="email" label="Email" >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="service_id"
                    label="Service"
                >
                    <Select {...selectProps} />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                >
                    <Select options={userRoles} />
                </Form.Item>
                <label htmlFor="">Permissions</label>

                <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
                    {[
                        'USER_READ',
                        'USER_WRITE',
                        'SERVICE_READ',
                        'SERVICE_WRITE',
                        'CATEGORY_READ',
                        'CATEGORY_WRITE',
                        'EXPENSE_READ',
                        'EXPENSE_WRITE'
                    ].map((item) => (
                        <Col key={item} span={12}>

                            <div onClick={() => handleCheck(item)} style={{ cursor: "pointer" }} >
                                <Badge key={item} count={item.replaceAll("_", " ")} color={checkedItems?.includes(item) ? "green" : "gray"}>

                                </Badge>
                            </div>
                        </Col>
                    ))}
                </Row>

                <Space>
                    <Button
                        onClick={() => {
                            form.resetFields()
                            setOpen(false)
                        }}
                    >Annuler</Button>
                    <Button type="primary" htmlType="submit">
                        Enregistrer les modifications
                    </Button>
                </Space>

            </Form>
        </Drawer>
    )
}
