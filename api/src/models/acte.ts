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
    type: "Mariage" | "Naissance" | "Deces";
  }
  