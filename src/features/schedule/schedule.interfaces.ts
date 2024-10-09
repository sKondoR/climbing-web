export type IEventType = 'LEAD' | 'BOULDER' | 'SCHOOL' | 'HOBBY';

export type IWeekDay =
  | 'Понедельник'
  | 'Вторник'
  | 'Среда'
  | 'Четверг'
  | 'Пятница'
  | 'Суббота'
  | 'Воскресенье';

  export type IDayTime =
  | '8 - 9'
  | '9 - 10'
  | '10 - 11'
  | '11 - 12'
  | '12 - 13'
  | '13 - 14'
  | '14 - 15'
  | '15 - 16'
  | '16 - 17'
  | '17 - 18'
  | '18 - 19'
  | '19 - 20'
  | '20 - 21'
  | '21 - 22';

export interface IEvent {
  weekDay: IWeekDay;
  fromTime: string;
  toTime: string;
  place: string | null;
  type: string | null;
}
