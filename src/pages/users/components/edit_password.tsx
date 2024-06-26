import { Button, Drawer, Form, Input, message, notification } from 'antd'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICategory, IService, User } from '../../../interfaces'
import { useForm } from '@refinedev/antd'
import { useUpdate } from '@refinedev/core'
import { API_URL } from '../../../providers'
import { TOKEN_KEY } from '../../../providers/auth/authProvider'

type EditUserPasswordProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    user: User
}
export const EditUserPassword: React.FC<EditUserPasswordProps> = ({ open, setOpen, user }) => {
    const [form] = Form.useForm();
    const { mutate } = useUpdate();
    const [current, setCurrent] = useState<User | undefined>(undefined);

    useEffect(() => {
        setCurrent(user);
    }, [user]);

    useEffect(() => {
        if (current) {
            form.setFieldsValue({});
        }
    }, [current, form]);

    const handleSubmit = async (values: any) => {

        if (values.password.length < 5) {
            notification.info({ message: "Le mot de passe doit contenir plus de 4 lettres" })
            return

        }

        if (values.password != values.password_confirm) {
            notification.warning({ message: "Les mots de passes doivent etre identiques" })
            form.scrollToField("password")
            return
        }

        const response = await fetch(`${API_URL}/users/password/${current?.id}`,
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
            notification.success({ message: "Mise a jour reussi !" })

            mutate(
                {
                    resource: "users",
                    values: {
                        password: res.password
                    },
                    id: res!.id,
                },
            )

            setOpen(false)
        } else {
            notification.error({ message: "Une erreur s'est produite" })
        }


    }

    return (
        <Drawer title={`Modifier le mot de passe de ${current?.name}`} open={open} onClose={() => { setOpen(false) }}>
            <Form form={form} onFinish={handleSubmit} layout='vertical'>
                <Form.Item name="password" label="Nouveau Mot de passe">
                    <Input />
                </Form.Item>

                <Form.Item name="password_confirm" label="Comfirmer le mote de passe">
                    <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Enregistrer les modifications
                </Button>
            </Form>
        </Drawer>
    )
}
