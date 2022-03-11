const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

export const formatCurrency = (value, currency = 'USD') => {
  let cur = '$';
  if (currency === 'NGN') cur = '₦';

  if (value) {
    let val = value;
    val = val ? parseFloat(val).toFixed(2) : 0.00;
    return val === 0 ? `${cur}0.00` : `${cur}${Number(val).toLocaleString('en-US')}`;
  }
  return `${cur}0.00`;
};

 export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return null;

  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
};
