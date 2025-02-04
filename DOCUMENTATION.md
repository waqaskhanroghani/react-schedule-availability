# React Schedule Availability Documentation

## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Props Reference](#props-reference)
- [TypeScript Interfaces](#typescript-interfaces)
- [Usage Examples](#usage-examples)
- [Styling Guide](#styling-guide)
- [Best Practices](#best-practices)

## Installation

```bash
# Using npm
npm install react-schedule-availability

# Using yarn
yarn add react-schedule-availability
```

## Quick Start

```tsx
import { AvailabilityPicker } from 'react-schedule-availability';
import 'react-schedule-availability/styles.css';

const MyComponent = () => {
  const [schedule, setSchedule] = useState({
    monday: { isOpen: true, isAllDay: false, intervals: [] },
    // ... other days
  });

  return (
    <AvailabilityPicker
      value={schedule}
      onChange={setSchedule}
    />
  );
};
```

## Props Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `WeeklySchedule` | Required | The current schedule state |
| `onChange` | `(schedule: WeeklySchedule) => void` | Required | Callback function when schedule changes |
| `timeStep` | `number` | `30` | Time interval step in minutes |
| `minTime` | `string` | `"00:00"` | Minimum time in 24-hour format |
| `maxTime` | `string` | `"23:30"` | Maximum time in 24-hour format |
| `disabled` | `boolean` | `false` | Disables all interactions |
| `className` | `string` | `""` | Additional CSS class name |

### Advanced Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customTimeOptions` | `string[]` | `undefined` | Override default time options |
| `dayLabels` | `Record<DayOfWeek, string>` | `undefined` | Custom labels for days |
| `locale` | `string` | `"en"` | Localization setting |

## TypeScript Interfaces

### WeeklySchedule
```typescript
type WeeklySchedule = {
  [key in DayOfWeek]: DaySchedule;
};
```

### DaySchedule
```typescript
type DaySchedule = {
  isOpen: boolean;     // Whether the day is available
  isAllDay: boolean;   // Whether it's a 24-hour availability
  intervals: TimeInterval[]; // Array of time intervals
};
```

### TimeInterval
```typescript
type TimeInterval = {
  start: string; // Format: "HH:mm" (24-hour)
  end: string;   // Format: "HH:mm" (24-hour)
};
```

### DayOfWeek
```typescript
type DayOfWeek = 
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
```

## Usage Examples

### Basic Usage
```tsx
const BasicExample = () => {
  const [schedule, setSchedule] = useState<WeeklySchedule>({
    monday: { isOpen: true, isAllDay: false, intervals: [] },
    tuesday: { isOpen: true, isAllDay: false, intervals: [
      { start: "09:00", end: "17:00" }
    ]},
    // ... other days
  });

  return (
    <AvailabilityPicker
      value={schedule}
      onChange={setSchedule}
      timeStep={30}
    />
  );
};
```

### With Custom Time Range
```tsx
const CustomTimeExample = () => {
  return (
    <AvailabilityPicker
      value={schedule}
      onChange={setSchedule}
      minTime="06:00"    // Start at 6 AM
      maxTime="22:00"    // End at 10 PM
      timeStep={15}      // 15-minute intervals
    />
  );
};
```

## Styling Guide

### Default Styling
The component comes with a default styling that you can import:
```tsx
import 'react-schedule-availability/styles.css';
```

### Custom Styling
You can override the default styles using CSS classes:

```css
/* Custom styles */
.availability-picker {
  /* Container styles */
}

.day-row {
  /* Day row styles */
}

.interval {
  /* Time interval styles */
}

.add-interval {
  /* Add interval button styles */
}
```

### CSS Variables
The component uses CSS variables that you can override:

```css
:root {
  --availability-primary-color: #4F46E5;
  --availability-bg-color: #ffffff;
  --availability-border-color: #e0e0e0;
  /* ... other variables */
}
```

## Best Practices

1. **State Management**
   - Keep the schedule state in the parent component
   - Use a callback for onChange to handle updates
   - Consider debouncing changes if saving to a backend

2. **Performance**
   - Avoid unnecessary re-renders by memoizing callbacks
   - Use the timeStep prop appropriately (15-60 minutes)

3. **Accessibility**
   - The component is keyboard accessible
   - Supports screen readers
   - High contrast modes available

4. **Error Handling**
   - Validate time intervals
   - Handle edge cases (overlapping times)
   - Provide user feedback for invalid inputs

## Integration Examples

### With Next.js
```tsx
"use client";
import { AvailabilityPicker } from 'react-schedule-availability';

// See the NextJsExample.tsx for a complete example
```

### With Form Libraries
```tsx
import { useFormik } from 'formik';

const FormExample = () => {
  const formik = useFormik({
    initialValues: {
      schedule: initialSchedule
    },
    onSubmit: values => {
      // Handle form submission
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <AvailabilityPicker
        value={formik.values.schedule}
        onChange={newSchedule => formik.setFieldValue('schedule', newSchedule)}
      />
    </form>
  );
};
```

## Support

For issues and feature requests, please visit our [GitHub repository](https://github.com/yourusername/react-schedule-availability/issues).
