import { atom } from 'recoil';
import { AssignedItems, Estimation } from '../../types';

export const isButtonClickedState = atom<boolean>({
  key: 'isButtonClickedState',  
  default: false,
});

export const IsAddEstimationButtonclicked = atom<boolean>({
    key: 'IsAddEstimationButtonclicked',  
    default: false,
  });

export const allEstimations = atom<Estimation[]>({
  key: 'estimations', 
  default:[], 
});

export const assignedItemsAtom = atom<AssignedItems>({
  key: 'assignedItems', 
  default:{}, 
});