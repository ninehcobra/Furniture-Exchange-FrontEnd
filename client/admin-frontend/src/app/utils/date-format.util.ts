import * as moment from 'moment';

export class DateUtils {
  static timeAgo(date: string | Date): string {
    return moment(date).fromNow();
  }
}
