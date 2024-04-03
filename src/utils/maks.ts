export function formatMoney(v: number | string): string {
  if (!v) return '';
  let value = v.toString();

  value = value.replace(/\D/g, '');
  value = value.length < 3 ? value.padStart(3, '0') : value;
  value = value.replace(/(\d{1})(\d{14})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{11})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{8})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{5})$/, '$1.$2');
  value = value.replace(/(\d{1})(\d{1,2})$/, '$1,$2');
  return value;
}
