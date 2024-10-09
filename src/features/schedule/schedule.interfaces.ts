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
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21';

export interface IEvent {
  weekDay: IWeekDay;
  fromTime: string;
  toTime: string;
  place: string | null;
  type: string | null;
}
