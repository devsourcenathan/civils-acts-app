import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICategory, IExpense, IService } from '../../../interfaces'
import { useForm, useSelect } from '@refinedev/antd'
import { useUpdate } from '@refinedev/core'
import { API_URL, ROLE_TOKEN } from '../../../providers'
import { TOKEN_KEY } from '../../../providers/auth/authProvider'

type EditExpenseProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    expense: IExpense
}
export const EditExpense: React.FC<EditExpenseProps> = ({ open, setOpen, expense }) => {
    const [form] = Form.useForm();
    const { mutate } = useUpdate();
    const [current, setCurrent] = useState<IExpense | undefined>(undefined);

    useEffect(() => {
        setCurrent(expense);
    }, [expense]);

    useEffect(() => {
        if (current) {
            form.setFieldsValue({
                // price: current.price,
                quantity: current.quantity,
                unit_price: current.unit_price,
                category_id: current.category_id,
                service_id: current.service_id,
                date: current.date,
                name: current.name,
                description: current.description,
                unit: current.unit,
                total_price: Number(current.unit_price) * Number(current.quantity),

            });
        }
    }, [current, form]);

    const handleSubmit = async (values: any) => {

        const response = await fetch(`${API_URL}/expenses/${current?.id}`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                },
                body: JSON.stringify(values)
            },

        )

        const res = await response.json()
        if (response.ok) {
            message.success("Mise a jour reussi !")
            form.resetFields()
            mutate(
                {
                    resource: "expenses",
                    values: res,
                    id: res!.id,
                },
            )

            setOpen(false)
        } else {
            message.error("Une erreur s'est produite")
        }


    }


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

    const role = localStorage.getItem(ROLE_TOKEN)!

    return (
        <Drawer open={open} onClose={() => { setOpen(false) }} size='large'>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    style={{ padding: 5 }}
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ padding: 5 }}
                    label="Titre"
                    name={['name']}
                    rules={[{ required: true, message: 'Saisir un titre' }]}
                >
                    <Input placeholder="Titre" />
                </Form.Item>

                <Row>
                    <Col style={{ padding: 5 }} span={12}>
                        <Form.Item
                            label="Categorie"
                            name={['category_id']}
                            rules={[{ required: true, message: 'Choisir une catégorie' }]}
                        >
                            <Select placeholder="Choisir une catégorie" {...selectProps} />
                        </Form.Item>
                    </Col>

                    <Col style={{ padding: 5 }} span={12}>
                        <Form.Item
                            name={['service_id']}
                            hidden={!["ADMIN", "MANAGER", "SECRETARY"].includes(role)}
                        >
                            <Select placeholder="Choisir un service" {...servicesProps} />
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col style={{ padding: 5 }} span={12}>
                        <Form.Item
                            label="Unite"
                            name={['unit']}
                            rules={[{ required: true, message: 'Choisir une unité' }]}
                        >
                            <Select options={["Kg", "Litre", "Unité"].map((unit) => ({ label: unit, value: unit }))} placeholder="Choisir une unite" />
                        </Form.Item>
                    </Col>
                    <Col style={{ padding: 5 }} span={12}>
                        <Form.Item
                            label="Quantité"
                            name={['quantity']}
                            rules={[{ required: true, message: 'Saisir une quantité' }]}
                        >
                            <Input placeholder="Quantité" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ padding: 5 }} span={12}>
                        <Form.Item
                            label="Prix unitaire"
                            name={['unit_price']}
                        >
                            <Input placeholder="Prix unitaire" />
                        </Form.Item>
                    </Col>
                    <Col style={{ padding: 5 }} span={12}>

                        <Form.Item
                            label="Total"
                            name={['total_price']}
                        >
                            <Input placeholder="Total" />
                        </Form.Item>
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                    Enregistrer les modifications
                </Button>
            </Form>
        </Drawer>
    )
}
