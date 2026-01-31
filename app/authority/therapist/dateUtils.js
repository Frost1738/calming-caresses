// Check if appointment is TODAY
export const isTodayAppointment = (appointmentDate) => {
  const today = new Date();
  const appointmentDateObj = new Date(appointmentDate);
  return today.toDateString() === appointmentDateObj.toDateString();
};

// Check if appointment is in the past (date only)
export const isPastDate = (appointmentDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const appointmentDateObj = new Date(appointmentDate);
  appointmentDateObj.setHours(0, 0, 0, 0);
  return appointmentDateObj < today;
};
