export function toTitleCase(str: string): string {
  return str
    .toLowerCase() // Convertir toute la chaîne en minuscules
    .split(' ') // Diviser la chaîne en mots
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Mettre en majuscule la première lettre de chaque mot
    .join(' '); // Rejoindre les mots en une seule chaîne
}
