import moment from 'moment';

export const formatHours = (hours) => {
  return moment(hours).format(`H HH`);
};

export const formatMinutes = (minutes) => {
  return moment(minutes).format(`m mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD/MM/YYYY`);
};
