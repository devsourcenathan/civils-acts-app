export enum PermissionsItems {
    'USER_READ' = 'USER_READ',
    'USER_WRITE' = 'USER_WRITE',
    'SERVICE_READ' = 'SERVICE_READ',
    'SERVICE_WRITE' = 'SERVICE_READ',
    'CATEGORY_READ' = 'CATEGORY_READ',
    'CATEGORY_WRITE' = 'CATEGORY_WRITE',
    'EXPENSE_READ' = 'EXPENSE_READ',
    'EXPENSE_WRITE' = 'EXPENSE_WRITE'
  }

  export interface Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    roles: string;
    telephone: number;
}

export interface Registre {
    id: number;
    libelle: string;
    annee: string;
    idutilisateurs: number;
}

export interface Formation {
    id: number;
    code: string;
    libelle: string;
}

export interface Centre {
    id: number;
    nom: string;
    region: string;
    departement: string;
    arrondissement: string;
}

export interface Acte {
    id: number;
    numacte: string;
    cnipere: string;
    cnimere: string;
    cnitemoin1: string;
    cnitemoin2: string;
    dateetablissementacte: string;
    idregistre: number;
    idformation: number | undefined;
    type: "Mariage" | "Naissance" | "Deces"
 }

export interface Mariage {
    id: number;
    id_acte: number;
    cniepoux: string;
    cniepouse: string;
    nomepoux: string;
    datenaissanceepoux: string;
    lieunaissanceepoux: string;
    professionepoux: string;
    domicileepoux: string;
    nationaliteepoux: string;
    situationmatrimonialeepoux: string;
    nomepouse: string;
    datenaissanceepouse: string;
    lieunaissanceepouse: string;
    professionepouse: string;
    domicileepouse: string;
    nationaliteepouse: string;
    situationmatrimonialeepouse: string;
    regimematrimonial: string;
    idcentre: number;
    idutilisateur: number;
}

export interface Naissance {
    id: number;
    id_acte: number;
    sexe: string;
    nomenfant: string;
    datenaissanceenfant: string;
    lieunaissanceenfant: string;
    nompere: string;
    proffessionpere: string;
    domicileparent: string;
    nomemere: string;
    proffessionmere: string;
    etatparent: string;
    idformation: number;
    idacte: number;
    idcentre: number;
    idutilisateurs: number;
}

export interface Deces {
    id: number;
    id_acte: number;
    nomdeclarant: string;
    professiondeclarant: string;
    domiciledeclarant: string;
    qualitedeclarant: string;
    nomdefun: string;
    datenaissance: string;
    lieunaissance: string;
    profession: string;
    domiciledefun: string;
    nationalitedefun: string;
    datedeces: string;
    lieudeces: string;
    circonstancesdeces: string;
    idformation: number;
    idacte: number;
    idcentre: number;
    idutilisateurs: number;
}
