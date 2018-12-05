const alphanumeric =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const nanoId = (length = 6) => {
  let result = '';

  for (let i = 0; i < length; ++i) {
    result += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
  }

  return result;
};

export default nanoId;
