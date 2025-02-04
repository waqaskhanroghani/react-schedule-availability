import React, { useState, useCallback } from 'react';
import type {
  AvailabilityPickerProps,
  WeeklySchedule,
  DayOfWeek,
  TimeInterval,
} from '../types';
import { generateTimeOptions, formatTime, isValidTimeInterval } from '../utils/timeUtils';
import './AvailabilityPicker.css';

const DAYS_OF_WEEK: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const AvailabilityPicker: React.FC<AvailabilityPickerProps> = ({
  value,
  onChange,
  className = '',
  disabled = false,
  timeStep = 30,
  minTime = '00:00',
  maxTime = '23:30',
}) => {
  const timeOptions = generateTimeOptions(minTime, maxTime, timeStep);

  const handleDayToggle = (day: DayOfWeek) => {
    if (disabled) return;
    
    const newSchedule = {
      ...value,
      [day]: {
        ...value[day],
        isOpen: !value[day].isOpen,
        // Clear intervals and isAllDay when closing
        ...(value[day].isOpen ? {} : { intervals: [], isAllDay: false })
      },
    };
    onChange(newSchedule);
  };

  const handleAllDayToggle = (day: DayOfWeek) => {
    if (disabled) return;

    const newSchedule = {
      ...value,
      [day]: {
        ...value[day],
        isAllDay: !value[day].isAllDay,
        intervals: value[day].isAllDay ? [] : [{ start: minTime, end: maxTime }],
      },
    };
    onChange(newSchedule);
  };

  const handleAddInterval = (day: DayOfWeek) => {
    if (disabled || !value[day].isOpen) return;

    const intervals = value[day].intervals;
    const lastInterval = intervals[intervals.length - 1];
    const start = lastInterval ? lastInterval.end : timeOptions[0];
    const endIndex = timeOptions.indexOf(start) + 1;
    const end = timeOptions[endIndex] || timeOptions[timeOptions.length - 1];

    if (isValidTimeInterval(start, end)) {
      const newSchedule = {
        ...value,
        [day]: {
          ...value[day],
          intervals: [...intervals, { start, end }],
        },
      };
      onChange(newSchedule);
    }
  };

  const handleRemoveInterval = (day: DayOfWeek, index: number) => {
    if (disabled) return;

    const newSchedule = {
      ...value,
      [day]: {
        ...value[day],
        intervals: value[day].intervals.filter((_, i) => i !== index),
      },
    };
    onChange(newSchedule);
  };

  const handleIntervalChange = (
    day: DayOfWeek,
    index: number,
    field: keyof TimeInterval,
    newTime: string
  ) => {
    if (disabled) return;

    const intervals = [...value[day].intervals];
    const interval = { ...intervals[index], [field]: newTime };

    if (isValidTimeInterval(interval.start, interval.end)) {
      intervals[index] = interval;
      const newSchedule = {
        ...value,
        [day]: {
          ...value[day],
          intervals,
        },
      };
      onChange(newSchedule);
    }
  };

  return (
    <div className={`availability-picker ${className}`}>
      {DAYS_OF_WEEK.map((day) => (
        <div key={day} className="day-row">
          <div className="day-header">
            <label className="day-label">
              <input
                type="checkbox"
                checked={value[day].isOpen}
                onChange={() => handleDayToggle(day)}
                disabled={disabled}
              />
              <span className="day-name">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
            </label>
          </div>

          {value[day].isOpen && (
            <div className="day-content">
              <label className="all-day-label">
                <input
                  type="checkbox"
                  checked={value[day].isAllDay}
                  onChange={() => handleAllDayToggle(day)}
                  disabled={disabled}
                />
                <span>All Day</span>
              </label>

              {!value[day].isAllDay && (
                <div className="intervals">
                  {value[day].intervals.map((interval, index) => (
                    <div key={index} className="interval">
                      <select
                        value={interval.start}
                        onChange={(e) =>
                          handleIntervalChange(day, index, 'start', e.target.value)
                        }
                        disabled={disabled}
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {formatTime(time)}
                          </option>
                        ))}
                      </select>
                      <span>to</span>
                      <select
                        value={interval.end}
                        onChange={(e) =>
                          handleIntervalChange(day, index, 'end', e.target.value)
                        }
                        disabled={disabled}
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {formatTime(time)}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveInterval(day, index)}
                        disabled={disabled}
                        className="remove-interval"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddInterval(day)}
                    disabled={disabled}
                    className="add-interval"
                  >
                    + Add Hours
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
