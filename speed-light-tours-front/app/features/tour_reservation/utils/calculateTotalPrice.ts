export const calculateTotalPrice = (pricePerPerson: number, guests: number): number => {
  return pricePerPerson * guests;
};
