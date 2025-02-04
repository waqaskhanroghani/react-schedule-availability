import React, { useState } from 'react';
import { AvailabilityPicker, WeeklySchedule } from 'react-availability-picker';
import 'react-availability-picker/styles.css';

// Initial schedule template
const initialSchedule: WeeklySchedule = {
  sunday: { isOpen: false, isAllDay: false, intervals: [] },
  monday: {
    isOpen: true,
    isAllDay: false,
    intervals: [{ start: "09:00", end: "17:00" }]
  },
  tuesday: {
    isOpen: true,
    isAllDay: false,
    intervals: [{ start: "09:00", end: "17:00" }]
  },
  wednesday: {
    isOpen: true,
    isAllDay: false,
    intervals: [{ start: "09:00", end: "17:00" }]
  },
  thursday: {
    isOpen: true,
    isAllDay: false,
    intervals: [{ start: "09:00", end: "17:00" }]
  },
  friday: {
    isOpen: true,
    isAllDay: false,
    intervals: [{ start: "09:00", end: "17:00" }]
  },
  saturday: { isOpen: false, isAllDay: false, intervals: [] }
};

const AvailabilityManager: React.FC = () => {
  const [schedule, setSchedule] = useState<WeeklySchedule>(initialSchedule);

  const handleScheduleChange = (newSchedule: WeeklySchedule) => {
    setSchedule(newSchedule);
    // Add your logic here (e.g., API calls, state updates)
    console.log('Schedule updated:', newSchedule);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Availability Schedule</h1>
        
        <AvailabilityPicker
          value={schedule}
          onChange={handleScheduleChange}
          timeStep={30}
          minTime="00:00"
          maxTime="23:30"
        />

        {/* Optional: Display current schedule */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Current Schedule</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(schedule, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManager;
