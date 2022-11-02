export const listToMap = (list = [], fieldName = 'id') => {

  const map = {};

  list.forEach(item => {
    map[item[fieldName]] = item;
  });

  return map;
}
