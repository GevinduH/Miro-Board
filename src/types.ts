export enum ProductEnum {
    VAS = 'VAS',
    NAPP = 'NAPP',
    SIM = 'SIM',
    OTHER = 'Other',
  }
  

export type WorkItem = {
    _id: string;
    description: string;
    storyPoints: string;
    workItemNumber: number; 
    status: string;
    product:ProductEnum;
    assigned:boolean
};

export type AssignedItems = { [key: string]: WorkItem[] };
