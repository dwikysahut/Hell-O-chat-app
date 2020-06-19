// bentuknya object

import {addCounter, subCounter} from './actionTypes';
export const countUp = () => {
  return {
    type: addCounter, //memebritahukan ke reducer aksi apa yang terjadi
    //  payload:"param", //apa yang harus dilakukan reducer, payload bisa dihilangkan
  };
};

// bentuknya object
export const countDown = () => {
  return {
    type: subCounter, //memebritahukan ke reducer aksi apa yang terjadi
  };
};
