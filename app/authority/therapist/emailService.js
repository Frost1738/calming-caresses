import emailjs from "@emailjs/browser";

// EmailJS config
const EMAILJS_CONFIG = {
  serviceId: "service_slgp4rv",
  templateId: "template_oo66pul",
  publicKey: "SOcrJWBm3fDIpEFEp",
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init({
    publicKey: EMAILJS_CONFIG.publicKey,
  });
};

// Send cancellation email
export const sendCancellationEmail = async (appointment, therapistName) => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        type: appointment.massageName || appointment.massage_name,
        time: `${appointment.time
          .split(":")
          .slice(0, 2)
          .join(":")} on ${new Date(appointment.date).toLocaleDateString()}`,
        therapist: therapistName || "Therapist",
        action: "cancelled",
        name: appointment.clientName || appointment.clientname,
        email: appointment.clientEmail || appointment.clientemail,
      },
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to send cancellation email:", error);
    return { success: false, error };
  }
};
