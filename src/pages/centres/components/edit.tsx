import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICategory } from '../../../interfaces'
import { useForm } from '@refinedev/antd'
import { useUpdate } from '@refinedev/core'
import { API_URL } from '../../../providers'
import { TOKEN_KEY } from '../../../providers/auth/authProvider'
import { Centre } from '../../../interfaces/type'
import { compareDepartments, departements, regionsWithDepartements } from '../../../utils/config'

type EditCategorieProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    centre: Centre
}
export const EditCentre: React.FC<EditCategorieProps> = ({ open, setOpen, centre }) => {
    const [form] = Form.useForm();
    const { mutate } = useUpdate();
    const [current, setCurrent] = useState<Centre | undefined>(undefined);
    const [currentDepartements, setCurrentDepartements] = useState<{ label: string; value: string; }[]>(departements.sort(compareDepartments))

    useEffect(() => {
        setCurrent(centre);
    }, [centre]);

    useEffect(() => {
        if (current) {
            form.setFieldsValue({
                nom: current.nom,
                description: current.region,
                departement: current.departement,
                arrondissement: current.arrondissement,
            });
        }
    }, [current, form]);

    const handleSubmit = async (values: any) => {

        const response = await fetch(`${API_URL}/centres/${current?.id}`,
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
                    resource: "centres",
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
                            initialValue="green"
                            rules={[{ required: true, message: 'Ce champ est requis' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}
