export function getMonthNumber(monthName: string) {
  const monthMapping: { [key: string]: string } = {
    janeiro: "01",
    fevereiro: "02",
    março: "03",
    abril: "04",
    maio: "05",
    junho: "06",
    julho: "07",
    agosto: "08",
    setembro: "09",
    outubro: "10",
    novembro: "11",
    dezembro: "12",
  };

  const lowerCase = monthName.toLocaleLowerCase();

  return monthMapping[lowerCase];
}
