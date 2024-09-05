export const truncateName = (name: string, length: number) => {
  if (name.length > length) {
    return name.substring(0, length) + '...';
  }
  return name;
};
