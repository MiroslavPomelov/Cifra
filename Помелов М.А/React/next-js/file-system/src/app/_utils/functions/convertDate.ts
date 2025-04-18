
export function convertDate(date: Date): string {
  const convertDate: string = date.toISOString().slice(0, 10);
  return convertDate;
}