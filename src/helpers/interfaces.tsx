export interface IWord {
    name: string;
    definition: string;
    lvl?: number;
    id?: number;
    setName?: string;
  }

 export interface IData {
    username: string;
    sets: {
      count: number;
      rows: string[];
    };
  }