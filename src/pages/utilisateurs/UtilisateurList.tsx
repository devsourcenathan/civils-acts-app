// src/pages/utilisateurs/UtilisateurList.tsx
import { useTable } from '@refinedev/antd';
import { List, Table } from 'antd';
import { Utilisateur } from '../../interfaces/type';

export const UtilisateurList: React.FC = () => {
    const { tableProps } = useTable<Utilisateur>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="nom" title="Nom" />
                <Table.Column dataIndex="prenom" title="Prenom" />
                <Table.Column dataIndex="email" title="Email" />
                <Table.Column dataIndex="roles" title="Rôles" />
                <Table.Column dataIndex="telephone" title="Téléphone" />
            </Table>
        </List>
    );
};
