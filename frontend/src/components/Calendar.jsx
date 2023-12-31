import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from'react-datepicker';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import '../scss/Datepicker.scss';

registerLocale('ko', ko);

function Calendar({ params, setParams }) {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    // console.log('start: ', format(new Date(startDate), 'yyyy-MM-dd'));
    // console.log('end: ', format(new Date(endDate), 'yyyy-MM-dd'));
    setParams({
      ...params,
      schprogrmBgnde: format(new Date(startDate), 'yyyyMMdd'),
      progrmEndde: format(new Date(endDate), 'yyyyMMdd'),
    });
  }, [dateRange, endDate, startDate]);

  return (
    
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      locale="ko"
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
  );
}

export default Calendar