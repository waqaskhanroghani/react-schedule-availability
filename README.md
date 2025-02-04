# React Schedule Availability

A modern React component for managing weekly availability schedules.

## Installation

```bash
npm install react-schedule-availability
# or
yarn add react-schedule-availability
```

## Quick Start Templates

### For Next.js (App Router)
```tsx
'use client';
import { AvailabilityPicker } from 'react-schedule-availability';
import 'react-schedule-availability/styles.css';

export default function Page() {
  const [schedule, setSchedule] = useState({
    monday: {
      isOpen: true,
      isAllDay: false,
      intervals: [{ start: "09:00", end: "17:00" }]
    },
    // ... other days
  });

  return (
    <AvailabilityPicker
      value={schedule}
      onChange={setSchedule}
      timeStep={30}
    />
  );
}
```

### For React
```tsx
import { AvailabilityPicker } from 'react-schedule-availability';
import 'react-schedule-availability/styles.css';

function ScheduleManager() {
  const [schedule, setSchedule] = useState({
    monday: {
      isOpen: true,
      isAllDay: false,
      intervals: [{ start: "09:00", end: "17:00" }]
    },
    // ... other days
  });

  return (
    <AvailabilityPicker
      value={schedule}
      onChange={setSchedule}
      timeStep={30}
    />
  );
}
```

## Ready-to-Use Templates

We provide complete, styled templates for both React and Next.js:

1. **React Template**: Copy from `/templates/ReactTemplate.tsx`
   - Basic setup with TypeScript
   - Clean, modern UI
   - State management example
   - Schedule display

2. **Next.js Template**: Copy from `/templates/NextTemplate.tsx`
   - App Router compatible
   - Tailwind CSS styling
   - Custom animations
   - Schedule display

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `WeeklySchedule` | Required | Current schedule |
| `onChange` | `(schedule: WeeklySchedule) => void` | Required | Change handler |
| `timeStep` | `number` | `30` | Interval in minutes |
| `minTime` | `string` | `"00:00"` | Start time (24h) |
| `maxTime` | `string` | `"23:30"` | End time (24h) |
| `disabled` | `boolean` | `false` | Disable picker |
| `className` | `string` | `""` | Custom CSS class |

## Types

```typescript
type WeeklySchedule = {
  [key in DayOfWeek]: {
    isOpen: boolean;
    isAllDay: boolean;
    intervals: Array<{ start: string; end: string; }>;
  };
};
```

## Styling

1. **Default Style**
```tsx
import 'react-schedule-availability/styles.css';
```

2. **Custom Styling**
```css
.availability-picker {
  /* Your styles */
}
```

## Examples

### Custom Time Range
```tsx
<AvailabilityPicker
  value={schedule}
  onChange={setSchedule}
  minTime="06:00"
  maxTime="22:00"
  timeStep={15}
/>
```

### With Form
```tsx
<form onSubmit={handleSubmit}>
  <AvailabilityPicker
    value={formData.schedule}
    onChange={schedule => setFormData({ ...formData, schedule })}
  />
  <button type="submit">Save</button>
</form>
```

## License

MIT
