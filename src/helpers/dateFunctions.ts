import { formatDistanceToNow } from 'date-fns';
import es from 'date-fns/locale/es';

export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date, {
    locale: es,
    addSuffix: true,
  });
  return fromNow;
};
