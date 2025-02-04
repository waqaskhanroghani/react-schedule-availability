"use client";
import React, { useState } from "react";
import { AvailabilityPicker, WeeklySchedule } from "react-availability-picker";
import "react-availability-picker/styles.css";

const Home = () => {
  const [schedule, setSchedule] = useState<WeeklySchedule>({
    sunday: { isOpen: false, isAllDay: false, intervals: [] },
    monday: { isOpen: true, isAllDay: false, intervals: [
      { start: "09:00", end: "12:00" },
      { start: "13:00", end: "17:00" }
    ]},
    tuesday: {
      isOpen: true,
      isAllDay: false,
      intervals: [{ start: "09:00", end: "17:00" }],
    },
    wednesday: { isOpen: true, isAllDay: true, intervals: [] },
    thursday: { isOpen: true, isAllDay: false, intervals: [
      { start: "10:00", end: "19:00" }
    ]},
    friday: { isOpen: true, isAllDay: false, intervals: [
      { start: "09:00", end: "16:00" }
    ]},
    saturday: { isOpen: false, isAllDay: false, intervals: [] },
  });

  const handleScheduleChange = (newSchedule: WeeklySchedule) => {
    setSchedule(newSchedule);
    // You can perform additional actions here, like saving to a database
    console.log('Schedule updated:', newSchedule);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Hours</h1>
          <p className="text-gray-600 mb-6">Set your weekly availability schedule</p>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <AvailabilityPicker
              value={schedule}
              onChange={handleScheduleChange}
              timeStep={30}
              minTime="00:00"
              maxTime="23:30"
              className="availability-custom"
              disabled={false}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Schedule</h2>
          <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
            <pre className="text-sm text-gray-700">
              {JSON.stringify(schedule, null, 2)}
            </pre>
          </div>
        </div>

        {/* Optional: Add custom styles */}
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
      </div>
    </div>
  );
};

export default Home;
