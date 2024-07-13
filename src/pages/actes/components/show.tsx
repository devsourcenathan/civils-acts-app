import React from 'react';
import { useGetIdentity, useList, useOne, useShow } from '@refinedev/core';
import { Descriptions, Typography } from 'antd';
import { Show } from '@refinedev/antd';
import { useParams } from 'react-router-dom';
import { IIdentity } from '../../../interfaces';

const { Title, Text } = Typography;

export const MarriageShow = () => {
    //   const { data, isLoading } = useOne({
    //     resource: 'actes',
    //     id: props.id,
    //   });
    const { id } = useParams();

    const { data, isLoading } = useList({
        resource: 'mariages',
    });

    const record = data?.data.find((item: any) => item.id_acte == id);


    if (isLoading) {
        return <div>Loading...</div>;
    }



    return (
        <Show>
            <Title level={3}>Détails du Mariage</Title>
            <Descriptions bordered>
                <Descriptions.Item label="ID Acte">{record?.id_acte}</Descriptions.Item>
                <Descriptions.Item label="CNI Époux">{record?.cniepoux}</Descriptions.Item>
                <Descriptions.Item label="Nom Époux">{record?.nomepoux}</Descriptions.Item>
                <Descriptions.Item label="Date de Naissance Époux">
                    {new Date(record?.datenaissanceepoux).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Lieu de Naissance Époux">{record?.lieunaissanceepoux}</Descriptions.Item>
                <Descriptions.Item label="Profession Époux">{record?.professionepoux}</Descriptions.Item>
                <Descriptions.Item label="Domicile Époux">{record?.domicileepoux}</Descriptions.Item>
                <Descriptions.Item label="Nationalité Époux">{record?.nationaliteepoux}</Descriptions.Item>
                <Descriptions.Item label="Situation Matrimoniale Époux">{record?.situationmatrimonialeepoux}</Descriptions.Item>
                <Descriptions.Item label="CNI Épouse">{record?.cniepouse}</Descriptions.Item>
                <Descriptions.Item label="Nom Épouse">{record?.nomepouse}</Descriptions.Item>
                <Descriptions.Item label="Date de Naissance Épouse">
                    {new Date(record?.datenaissanceepouse).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Lieu de Naissance Épouse">{record?.lieunaissanceepouse}</Descriptions.Item>
                <Descriptions.Item label="Profession Épouse">{record?.professionepouse}</Descriptions.Item>
                <Descriptions.Item label="Domicile Épouse">{record?.domicileepouse}</Descriptions.Item>
                <Descriptions.Item label="Nationalité Épouse">{record?.nationaliteepouse}</Descriptions.Item>
                <Descriptions.Item label="Situation Matrimoniale Épouse">{record?.situationmatrimonialeepouse}</Descriptions.Item>
                <Descriptions.Item label="Régime Matrimonial">{record?.regimematrimonial}</Descriptions.Item>
                <Descriptions.Item label="Centre">{record?.centre?.nom}</Descriptions.Item>
                <Descriptions.Item label="Utilisateur">{record?.utilisateur?.nom}</Descriptions.Item>
            </Descriptions>
        </Show>
    );
};
