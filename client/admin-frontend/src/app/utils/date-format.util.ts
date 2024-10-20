import * as moment from 'moment';

export class DateUtils {
  static timeAgo(date: string | Date): string {
    moment.locale('vi');
    return moment(date).fromNow();
  }
}
