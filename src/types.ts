import { allEstimations } from "./components/common/recoilState";

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

export type Estimation = {
  map(arg0: (estimation: any) => void): import("react").ReactNode;
  _id: string;
  year: string;
  quarter: string;
  items:WorkItem[]
}

export const AllEstimations: Estimation[] = [];

export type AssignedItems = { [key: string]: WorkItem[] };
