import crypto from 'crypto';

export const getCode = () => {
  const otp = crypto.randomInt(100000, 999999);
  return `${otp}`;
};

export const verifyOtpByHash = (otp: string, hash: string) => {
  const cryptoHash = crypto.createHash('sha256');
  cryptoHash.update(otp);
  const otpHash = cryptoHash.digest('hex');
  if (otpHash === hash) {
    return true;
  } else {
    return false;
  }
};

export const removeDynamoDbKeys = (result: {
  pk?: string;
  sk?: string;
  gsi1Pk?: string;
  gsi1Sk?: string;
  gsi2Pk?: string;
  gsi2Sk?: string;
}) => {
  if (result.hasOwnProperty('pk')) delete result.pk;
  if (result.hasOwnProperty('sk')) delete result.sk;
  if (result.hasOwnProperty('gsi1Pk')) delete result.gsi1Pk;
  if (result.hasOwnProperty('gsi1Sk')) delete result.gsi1Sk;
  if (result.hasOwnProperty('gsi2Pk')) delete result.gsi2Pk;
  if (result.hasOwnProperty('gsi2Sk')) delete result.gsi2Sk;

  return result;
};

export const getISODate = (date: Date) => {
  let year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  let dt: any = date.getDate();
  let hours: any = date.getHours();
  let minutes: any = date.getMinutes();
  let seconds: any = date.getSeconds();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  console.log(`${year}-${month}-${dt} ${hours}:${minutes}:${seconds}`);
  return `${year}-${month}-${dt} ${hours}:${minutes}:${seconds}`;
};
