export type TimeInterval = {
  start: string;
  end: string;
};

export type DaySchedule = {
  isOpen: boolean;
  isAllDay: boolean;
  intervals: TimeInterval[];
};

export type WeeklySchedule = {
  [key in DayOfWeek]: DaySchedule;
};

export type DayOfWeek = 
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface AvailabilityPickerProps {
  value: WeeklySchedule;
  onChange: (schedule: WeeklySchedule) => void;
  className?: string;
  disabled?: boolean;
  timeStep?: number; // in minutes, default 30
  minTime?: string; // format: "HH:mm", default "00:00"
  maxTime?: string; // format: "HH:mm", default "23:30"
}
