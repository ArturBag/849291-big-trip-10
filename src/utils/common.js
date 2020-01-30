import moment from 'moment';

export const formatTime = (time, formatType) => {
  return moment(time, formatType).utc().format(`HH:mm`);

};

export const formatDay = (day) => {
  return moment(day).format(`DD`);

};

export const formatMonth = (month) => {
  return moment(month).format(`MMM`);

};


export const formatDate = (date, formatType) => {
  return moment(date, formatType).utc().format(`MM/DD/YY`);
};

export const dateDiff = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`);
};
