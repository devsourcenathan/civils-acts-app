import { Button, Col, Drawer, Form, Input, Row, Select, message } from 'antd'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICategory } from '../../../interfaces'
import { useForm, useSelect } from '@refinedev/antd'
import { useUpdate } from '@refinedev/core'
import { API_URL } from '../../../providers'
import { Acte, Formation, Registre } from '../../../interfaces/type'

type EditCategorieProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    acte: Acte
}
export const EditActe: React.FC<EditCategorieProps> = ({ open, setOpen, acte }) => {
    const [form] = Form.useForm();
    const { mutate } = useUpdate();
    const [current, setCurrent] = useState<Acte | undefined>(undefined);

    useEffect(() => {
        setCurrent(acte);
    }, [acte]);

    useEffect(() => {
        if (current) {
            form.setFieldsValue({
                numacte: current.numacte,
                cnipere: current.cnipere,
                cnimere: current.cnimere,
                cnitemoin1: current.cnitemoin1,
                cnitemoin2: current.cnitemoin2,
                dateetablissementacte: current.dateetablissementacte,
                idregistre: current.idregistre,
                idformation: current.idformation
            });
        }
    }, [current, form]);

    const handleSubmit = async (values: any) => {

        const response = await fetch(`${API_URL}/actes/${current?.id}`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
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

    return (
        <Drawer open={open} onClose={() => { setOpen(false) }}>
            <Form form={form} onFinish={handleSubmit} layout="vertical" hideRequiredMark>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="numacte"
                            label="Num Acte"
                            rules={[{ required: true, message: 'Ce champ est requis' }]}
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
                            name="color"
                            label="Color"
                            initialValue="green"
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
        </Drawer>
    )
}
