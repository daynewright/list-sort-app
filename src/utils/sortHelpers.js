import { sort } from './constants';

export const sortList = (list, direction) => {
  return list.sort((a, b) => {
    if (direction === sort.ASCENDING) return a.text.localeCompare(b.text);
    if (direction === sort.DESCENDING) return b.text.localeCompare(a.text);
    return 0;
  });
};
