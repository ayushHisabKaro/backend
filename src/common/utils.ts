import * as moment from 'moment';

export const getDateFromTimeString = (time: string) => {
  return new Date(`${moment().format('YYYY-MM-DD')} ${time}`);
};

export const generateRandomCode = () => {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
