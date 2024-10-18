export function formatProductType(value: string, format: 'singular' | 'plural'): string {

  const productTypeMap: { [key: string]: { singular: string, plural: string } } = {
    'CARNETS': { singular: 'CARNET', plural: 'CARNETS' },
    'CARTES POSTALES': { singular: 'CARTE POSTALE', plural: 'CARTES POSTALES' },
    'MARQUE PAGES': { singular: 'MARQUE PAGE', plural: 'MARQUE PAGES' },
    'PRINT': { singular: 'PRINT', plural: 'PRINTS' }
  };

  const productType = productTypeMap[value.toUpperCase()];
  if (!productType) {
    throw new Error('Product type not found');
  }

  return format === 'singular' ? productType.singular : productType.plural;
}
