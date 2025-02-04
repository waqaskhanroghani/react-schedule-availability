'use client';

import React, { useState } from 'react';
import { AvailabilityPicker, WeeklySchedule } from 'react-availability-picker';
import 'react-availability-picker/styles.css';

// Initial schedule template with proper closed days
const initialSchedule: WeeklySchedule = {
  sunday: { 
    isOpen: false, 
    isAllDay: false, 
    intervals: [] 
  },
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
  saturday: { 
    isOpen: false, 
    isAllDay: false, 
    intervals: [] 
  }
};

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<WeeklySchedule>(initialSchedule);

  const handleScheduleChange = (newSchedule: WeeklySchedule) => {
    // Clean up any intervals for closed days
    const cleanedSchedule = Object.entries(newSchedule).reduce((acc, [day, daySchedule]) => {
      return {
        ...acc,
        [day]: {
          ...daySchedule,
          intervals: daySchedule.isOpen ? daySchedule.intervals : [],
          isAllDay: daySchedule.isOpen ? daySchedule.isAllDay : false
        }
      };
    }, {} as WeeklySchedule);

    setSchedule(cleanedSchedule);
    console.log('Schedule updated:', cleanedSchedule);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Availability Schedule
            </h1>
            
            <AvailabilityPicker
              value={schedule}
              onChange={handleScheduleChange}
              timeStep={30}
              minTime="00:00"
              maxTime="23:30"
              className="availability-custom"
            />

            {/* Optional: Display current schedule */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Current Schedule
              </h2>
              <pre className="text-sm text-gray-600 overflow-auto">
                {JSON.stringify(schedule, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Custom styles */}
      <style jsx global>{`
        .availability-custom .day-row {
          transition: all 0.2s ease;
        }
        .availability-custom .day-row:hover {
          transform: translateX(4px);
        }
        .availability-custom .add-interval {
          background: #4F46E5;
          color: white;
          transition: all 0.2s ease;
        }
        .availability-custom .add-interval:hover {
          background: #4338CA;
        }
      `}</style>
    </main>
  );
}
