import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICategory } from '../../../interfaces'
import { useForm } from '@refinedev/antd'
import { useUpdate } from '@refinedev/core'
import { API_URL } from '../../../providers'
import { TOKEN_KEY } from '../../../providers/auth/authProvider'
import { Formation, Registre } from '../../../interfaces/type'

type EditFormationProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    formation: Formation
}
export const EditFormation: React.FC<EditFormationProps> = ({ open, setOpen, formation }) => {
    const [form] = Form.useForm();
    const { mutate } = useUpdate();
    const [current, setCurrent] = useState<Formation | undefined>(undefined);

    useEffect(() => {
        setCurrent(formation);
    }, [formation]);

    useEffect(() => {
        if (current) {
            form.setFieldsValue({
                libelle: current.libelle,
                code: current.code,
            });
        }
    }, [current, form]);

    const handleSubmit = async (values: any) => {

        const response = await fetch(`${API_URL}/formations/${current?.id}`,
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
                    resource: "registres",
                    values: {
                        libelle: res.libelle,
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
        </Drawer>
    )
}
