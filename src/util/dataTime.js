import dayjs from "dayjs"
import localizedFormat  from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(localizedFormat);

export default function useDateHandle () {

    return function (val) {

        let newDate = dayjs(val).format('LLL');

        return newDate;
    }
    
}