export function formatDate(date: string): string {
    if (!date) return ''; // Manejo de valores nulos
    const parsedDate = new Date(date);
    const day = parsedDate.getUTCDate().toString().padStart(2, '0');
    const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, '0'); 
    const year = parsedDate.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
  