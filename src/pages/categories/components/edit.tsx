import { Button, Drawer, Form, Input, Select, message } from 'antd'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICategory } from '../../../interfaces'
import { useForm } from '@refinedev/antd'
import { useUpdate } from '@refinedev/core'
import { API_URL } from '../../../providers'
import { TOKEN_KEY } from '../../../providers/auth/authProvider'

type EditCategorieProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    category: ICategory
}
export const EditCategorie: React.FC<EditCategorieProps> = ({ open, setOpen, category }) => {
    const [form] = Form.useForm();
    const { mutate } = useUpdate();
    const [current, setCurrent] = useState<ICategory | undefined>(undefined);

    useEffect(() => {
        setCurrent(category);
    }, [category]);

    useEffect(() => {
        if (current) {
            form.setFieldsValue({
                // id: current.id,
                name: current.name,
                description: current.description,
                color: current.color,
            });
        }
    }, [current, form]);

    const handleSubmit = async (values: any) => {

        const response = await fetch(`${API_URL}/categories/${current?.id}`,
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
                    resource: "categories",
                    values: {
                        name: res.name,
                        description: res.description
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

                <Form.Item name="description" label="Description" >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="color"
                    label="Color"
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

                <Button type="primary" htmlType="submit">
                    Enregistrer les modifications
                </Button>
            </Form>
        </Drawer>
    )
}
