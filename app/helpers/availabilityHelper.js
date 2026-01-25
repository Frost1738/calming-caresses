export function getTherapistAvailability(bookings, therapistName) {
  // Helper functions
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const formatMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "pm" : "am";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${mins.toString().padStart(2, "0")}${period}`;
  };

  // Get current time
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

  // Work hours
  const workStart = 9 * 60; // 9:00 AM
  const workEnd = 18 * 60; // 6:00 PM

  // Function to find next available day (non-recursive)
  const findNextAvailableDay = (fromDate) => {
    // Get all unique future dates for this therapist
    const therapistBookings = bookings.filter(
      (b) =>
        b.therapistName === therapistName && b.date && b.time && b.duration,
    );

    const allDates = [
      ...new Set(
        therapistBookings.map((b) => b.date).filter((date) => date > fromDate),
      ),
    ].sort();

    for (const date of allDates) {
      const dateBookings = therapistBookings
        .filter((b) => b.date === date)
        .sort(
          (a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time),
        );

      let lastEndTime = workStart;

      // Check for first available slot
      for (const booking of dateBookings) {
        const bookingStart = parseTimeToMinutes(booking.time);
        const bookingDuration = parseInt(booking.duration) || 0;
        const bookingEnd = bookingStart + bookingDuration;

        if (bookingStart > lastEndTime && bookingStart - lastEndTime >= 30) {
          return {
            therapist: therapistName,
            date: date,
            nextAvailable: {
              start: formatMinutesToTime(lastEndTime),
              end: formatMinutesToTime(bookingStart),
              startMinutes: lastEndTime,
              endMinutes: bookingStart,
              duration: bookingStart - lastEndTime,
              slotType: "future-day",
              message: `Available on ${date} at ${formatMinutesToTime(
                lastEndTime,
              )}`,
            },
          };
        }

        lastEndTime = Math.max(lastEndTime, bookingEnd);
      }

      // Check after last booking
      if (lastEndTime < workEnd && workEnd - lastEndTime >= 30) {
        return {
          therapist: therapistName,
          date: date,
          nextAvailable: {
            start: formatMinutesToTime(lastEndTime),
            end: formatMinutesToTime(workEnd),
            startMinutes: lastEndTime,
            endMinutes: workEnd,
            duration: workEnd - lastEndTime,
            slotType: "future-day-late",
            message: `Available on ${date} at ${formatMinutesToTime(
              lastEndTime,
            )}`,
          },
        };
      }
    }

    // No future bookings found - return full day for tomorrow
    const tomorrow = new Date(fromDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    return {
      therapist: therapistName,
      date: tomorrowStr,
      nextAvailable: {
        start: formatMinutesToTime(workStart),
        end: formatMinutesToTime(workEnd),
        startMinutes: workStart,
        endMinutes: workEnd,
        duration: workEnd - workStart,
        slotType: "no-bookings",
        message: `Available all day ${tomorrowStr}`,
      },
    };
  };

  // Check if we're outside work hours (after 6 PM)
  if (currentTimeMinutes >= workEnd) {
    // It's after 6 PM, check tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    // Find therapist's bookings for tomorrow
    const tomorrowBookings = bookings
      .filter(
        (b) =>
          b.therapistName === therapistName &&
          b.date === tomorrowStr &&
          b.time &&
          b.duration,
      )
      .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

    if (tomorrowBookings.length === 0) {
      // No bookings tomorrow, available all day
      return {
        therapist: therapistName,
        date: tomorrowStr,
        nextAvailable: {
          start: formatMinutesToTime(workStart),
          end: formatMinutesToTime(workEnd),
          startMinutes: workStart,
          endMinutes: workEnd,
          duration: workEnd - workStart,
          slotType: "tomorrow",
          message: `Available tomorrow ${formatMinutesToTime(
            workStart,
          )} to ${formatMinutesToTime(workEnd)}`,
        },
      };
    }

    // Find first available slot tomorrow
    let lastEndTime = workStart;
    for (const booking of tomorrowBookings) {
      const bookingStart = parseTimeToMinutes(booking.time);
      const bookingDuration = parseInt(booking.duration) || 0;
      const bookingEnd = bookingStart + bookingDuration;

      if (bookingStart > lastEndTime && bookingStart - lastEndTime >= 30) {
        // Found available slot
        return {
          therapist: therapistName,
          date: tomorrowStr,
          nextAvailable: {
            start: formatMinutesToTime(lastEndTime),
            end: formatMinutesToTime(bookingStart),
            startMinutes: lastEndTime,
            endMinutes: bookingStart,
            duration: bookingStart - lastEndTime,
            slotType: "tomorrow",
            message: `Available tomorrow at ${formatMinutesToTime(
              lastEndTime,
            )}`,
          },
        };
      }

      lastEndTime = Math.max(lastEndTime, bookingEnd);
    }

    // Check after last booking tomorrow
    if (lastEndTime < workEnd && workEnd - lastEndTime >= 30) {
      return {
        therapist: therapistName,
        date: tomorrowStr,
        nextAvailable: {
          start: formatMinutesToTime(lastEndTime),
          end: formatMinutesToTime(workEnd),
          startMinutes: lastEndTime,
          endMinutes: workEnd,
          duration: workEnd - lastEndTime,
          slotType: "tomorrow",
          message: `Available tomorrow at ${formatMinutesToTime(lastEndTime)}`,
        },
      };
    }

    // Fully booked tomorrow, look for next available day
    return findNextAvailableDay(tomorrowStr);
  }

  // We're within work hours today (before 6 PM)
  // Get therapist's bookings for today
  const todayBookings = bookings
    .filter(
      (b) =>
        b.therapistName === therapistName &&
        b.date === today &&
        b.time &&
        b.duration,
    )
    .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

  // If no bookings today
  if (todayBookings.length === 0) {
    // Check if we can still book today (need at least 30 minutes before closing)
    const minSessionTime = 30;
    const bufferTime = 15;
    const earliestStart = currentTimeMinutes + bufferTime;

    if (earliestStart <= workEnd - minSessionTime) {
      return {
        therapist: therapistName,
        date: today,
        nextAvailable: {
          start: formatMinutesToTime(earliestStart),
          end: formatMinutesToTime(workEnd),
          startMinutes: earliestStart,
          endMinutes: workEnd,
          duration: workEnd - earliestStart,
          slotType: "today",
          message: `Available today at ${formatMinutesToTime(earliestStart)}`,
        },
      };
    } else {
      // Too late to book today, check tomorrow
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      return {
        therapist: therapistName,
        date: tomorrowStr,
        nextAvailable: {
          start: formatMinutesToTime(workStart),
          end: formatMinutesToTime(workEnd),
          startMinutes: workStart,
          endMinutes: workEnd,
          duration: workEnd - workStart,
          slotType: "tomorrow",
          message: `Available tomorrow at ${formatMinutesToTime(workStart)}`,
        },
      };
    }
  }

  // Find next available slot today
  let lastEndTime = workStart;

  for (const booking of todayBookings) {
    const bookingStart = parseTimeToMinutes(booking.time);
    const bookingDuration = parseInt(booking.duration) || 0;
    const bookingEnd = bookingStart + bookingDuration;

    // Check if there's a gap between lastEndTime and this booking
    if (bookingStart > lastEndTime) {
      // This is an available slot
      const slotStart = Math.max(lastEndTime, currentTimeMinutes);
      const slotEnd = bookingStart;

      // Only consider slots that are in the future and have at least 30 minutes
      if (slotStart < slotEnd && slotEnd - slotStart >= 30) {
        const bufferTime = 15; // 15-minute buffer
        const actualStart = slotStart + bufferTime;

        if (actualStart < slotEnd) {
          return {
            therapist: therapistName,
            date: today,
            nextAvailable: {
              start: formatMinutesToTime(actualStart),
              end: formatMinutesToTime(slotEnd),
              startMinutes: actualStart,
              endMinutes: slotEnd,
              duration: slotEnd - actualStart,
              slotType: "today",
              message: `Available today at ${formatMinutesToTime(actualStart)}`,
            },
          };
        }
      }
    }

    // Update lastEndTime to the end of this booking
    lastEndTime = Math.max(lastEndTime, bookingEnd);
  }

  // Check for slot after last booking today
  if (lastEndTime < workEnd) {
    const slotStart = Math.max(lastEndTime, currentTimeMinutes);
    const slotEnd = workEnd;

    if (slotStart < slotEnd && slotEnd - slotStart >= 30) {
      const bufferTime = 15;
      const actualStart = slotStart + bufferTime;

      if (actualStart < slotEnd) {
        return {
          therapist: therapistName,
          date: today,
          nextAvailable: {
            start: formatMinutesToTime(actualStart),
            end: formatMinutesToTime(slotEnd),
            startMinutes: actualStart,
            endMinutes: slotEnd,
            duration: slotEnd - actualStart,
            slotType: "today",
            message: `Available today at ${formatMinutesToTime(actualStart)}`,
          },
        };
      }
    }
  }

  // No slots available today, find next available day
  return findNextAvailableDay(today);
}
