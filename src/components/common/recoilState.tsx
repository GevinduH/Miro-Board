import { atom } from 'recoil';

export const isButtonClickedState = atom<boolean>({
  key: 'isButtonClickedState',  
  default: false,
});

export const IsAddEstimationButtonclicked = atom<boolean>({
    key: 'IsAddEstimationButtonclicked',  
    default: false,
  });