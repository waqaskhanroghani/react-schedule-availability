"use client";
import React, { useState } from "react";
import { AvailabilityPicker, WeeklySchedule } from "react-availability-picker";
import "react-availability-picker/styles.css";

const ModernExample = () => {
  const [schedule, setSchedule] = useState<WeeklySchedule>({
    sunday: { isOpen: false, isAllDay: false, intervals: [] },
    monday: {
      isOpen: true,
      isAllDay: false,
      intervals: [
        { start: "09:00", end: "12:00" },
        { start: "13:00", end: "17:00" },
      ],
    },
    tuesday: {
      isOpen: true,
      isAllDay: false,
      intervals: [{ start: "09:00", end: "17:00" }],
    },
    wednesday: { isOpen: true, isAllDay: true, intervals: [] },
    thursday: {
      isOpen: true,
      isAllDay: false,
      intervals: [{ start: "10:00", end: "19:00" }],
    },
    friday: {
      isOpen: true,
      isAllDay: false,
      intervals: [{ start: "09:00", end: "16:00" }],
    },
    saturday: { isOpen: false, isAllDay: false, intervals: [] },
  });

  const handleScheduleChange = (newSchedule: WeeklySchedule) => {
    setSchedule(newSchedule);
    console.log("Schedule updated:", newSchedule);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Business Hours Manager</h1>
          <p className="mt-1 text-sm text-gray-500">
            Set your weekly availability schedule with ease
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Availability Picker Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-1">
                  Weekly Schedule
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Click on days to toggle availability and add time slots
                </p>
                <div className="availability-wrapper">
                  <AvailabilityPicker
                    value={schedule}
                    onChange={handleScheduleChange}
                    timeStep={30}
                    minTime="00:00"
                    maxTime="23:30"
                    className="modern-picker"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-1">
                  Schedule Summary
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Current availability configuration
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-xs text-gray-600 overflow-auto">
                    {JSON.stringify(schedule, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-1">
                  Quick Actions
                </h2>
                <div className="space-y-3 mt-4">
                  <button
                    onClick={() => {
                      const newSchedule = { ...schedule };
                      Object.keys(newSchedule).forEach((day) => {
                        newSchedule[day as keyof WeeklySchedule].isOpen = true;
                        newSchedule[day as keyof WeeklySchedule].isAllDay = true;
                      });
                      handleScheduleChange(newSchedule);
                    }}
                    className="w-full px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                  >
                    Set All Days Open (24/7)
                  </button>
                  <button
                    onClick={() => {
                      const newSchedule = { ...schedule };
                      Object.keys(newSchedule).forEach((day) => {
                        newSchedule[day as keyof WeeklySchedule].isOpen = false;
                      });
                      handleScheduleChange(newSchedule);
                    }}
                    className="w-full px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Clear All Schedules
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .modern-picker .day-row {
          border: 1px solid #E5E7EB;
          border-radius: 0.75rem;
          margin-bottom: 1rem;
          padding: 1.25rem;
          background: #FFFFFF;
          transition: all 0.2s ease;
        }

        .modern-picker .day-row:hover {
          border-color: #C7D2FE;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
        }

        .modern-picker .day-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .modern-picker .interval {
          background: #F9FAFB;
          padding: 0.5rem;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }

        .modern-picker .interval select {
          border: 1px solid #E5E7EB;
          border-radius: 0.375rem;
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          color: #374151;
          background-color: white;
          transition: all 0.2s ease;
        }

        .modern-picker .interval select:hover {
          border-color: #C7D2FE;
        }

        .modern-picker .interval select:focus {
          outline: none;
          border-color: #818CF8;
          ring: 2px solid #C7D2FE;
        }

        .modern-picker .add-interval {
          background: #4F46E5;
          color: white;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .modern-picker .add-interval:hover {
          background: #4338CA;
          transform: translateY(-1px);
        }

        .modern-picker .remove-interval {
          background: #EF4444;
          color: white;
          border-radius: 0.375rem;
          transition: all 0.2s ease;
        }

        .modern-picker .remove-interval:hover {
          background: #DC2626;
        }

        .modern-picker input[type="checkbox"] {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 0.375rem;
          border: 2px solid #E5E7EB;
          transition: all 0.2s ease;
        }

        .modern-picker input[type="checkbox"]:checked {
          background-color: #4F46E5;
          border-color: #4F46E5;
        }
      `}</style>
    </div>
  );
};

export default ModernExample;
