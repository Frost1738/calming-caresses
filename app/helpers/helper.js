export function matchInput(therapists, therapistName, password) {
  // Find therapist by name
  const therapist = therapists.find(
    (t) => t.name.toLowerCase() === therapistName.toLowerCase(),
  );

  // If therapist not found or password doesn't match, return false
  if (!therapist || therapist.password !== password) {
    return false;
  }

  // If everything matches
  return true;
}

//for no show
export const datesPastToday = (appointmentsList) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison

  return appointmentsList.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0); // Set to beginning of day

    // Keep appointments that are today or in the future
    return appointmentDate <= today;
  });
};

//greetings
export function getTimeOfDay() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Morning ⛅";
  } else if (hour >= 12 && hour < 17) {
    return "Afternoon 🌞";
  } else if (hour >= 17 && hour < 20) {
    return "Evening 🌙";
  } else {
    return "Night 🌑";
  }
}

export const getLevelColor = (level) => {
  switch (level) {
    case "seasoned":
      return "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]";
    case "specialist":
      return "bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF]";
    case "novice":
      return "bg-gradient-to-r from-[#00B4D8] to-[#48CAE4]";
    default:
      return "bg-gradient-to-r from-[#6C757D] to-[#ADB5BD]";
  }
};

export const getLevelLabel = (level) => {
  switch (level) {
    case "seasoned":
      return "Seasoned";
    case "specialist":
      return "Specialist";
    case "novice":
      return "Novice";
    default:
      return level;
  }
};

///filters past appointments

export const filterOutPastAppointments = (appointmentsList) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return appointmentsList.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0);

    return appointmentDate >= today;
  });
};

export function findNonMatchingIds(array1, array2) {
  // Validate inputs

  // Create a Set of bookingIds from array2 for efficient lookup
  const bookingIdsSet = new Set(
    array2
      .filter((item) => item && typeof item === "object")
      .map((item) => item.booking_id)
      .filter((id) => id !== undefined),
  );

  // Find ids from array1 that DO NOT exist in array2's bookingIds
  const nonMatchingIds = array1
    .filter((item) => item && typeof item === "object")
    .map((item) => item.id)
    .filter((id) => id !== undefined && !bookingIdsSet.has(id));

  return nonMatchingIds;
}
