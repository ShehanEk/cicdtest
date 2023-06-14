export const convertPascalToCamel = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (!key[0].match(/[a-z]/)) {
      const camelKey = key[0].toLowerCase() + key.slice(1);
      obj[camelKey] = obj[key];
      delete obj[key];
    }
  });
};

export const convertListToCamel = (lst?: any[]) => {
  lst?.forEach((obj) => {
    convertPascalToCamel(obj);
  });
};
