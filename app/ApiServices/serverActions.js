"use server";

import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "../supabase/server";

export async function login(formData) {
  const supabase = await createSupabaseServerClient();

  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //redirect works by throwing errors

  if (error) {
    console.log(error);
    return {
      status: "login failed",
      issue: error.message,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      message: "you are not logged in",
      reason: "❌ Session was not created properly",
    };
  }

  console.log("success");
  revalidatePath("/dashboard");
  revalidatePath("/therapy");

  await redirect("/dashboard");
}

export async function register(formData) {
  const supabase = await createSupabaseServerClient();
  console.log("🚀 REGISTER ACTION STARTED");

  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,

    options: {
      data: {
        display_name: formData.get("username"),
      },
    },
  });

  if (error) {
    console.log(error);
    return {
      status: "registration failed",
      issue: error.message,
    };
  }

  redirect("/check-email");
}
export async function registrationSync(userEmail, name) {
  const supabase = await createSupabaseServerClient();
  try {
    //  Checks if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from("guests")
      .select("id, email")
      .eq("email", userEmail)
      .maybeSingle();

    //If user exists it stops there
    if (existingUser) {
      return {
        status: "already_exists",
        message: "User already registered",
      };
    }

    //  Only inserts if they don't exist
    const { data, error } = await supabase
      .from("guests")
      .insert([
        {
          email: userEmail,
          username: name,
        },
      ])
      .select();

    if (error) throw error;

    return {
      status: "success",
      data: data,
    };
  } catch (error) {
    return {
      status: "synchronization failed",
      issue: error.message,
    };
  }
}

export async function collectComment(formData) {
  const supabase = await createSupabaseServerClient();
  try {
    const comment = formData.get("feedback");
    const stars = formData.get("rating");
    const name = formData.get("name");
    const title = formData.get("massageTitle");

    const { data, error } = await supabase
      .from("review")
      .insert([
        {
          comment: comment,
          stars: Number(stars),
          name: name,
          massagetitle: title,
        },
      ])
      .select();

    console.log("Error:", error);
    console.log("Data:", data);

    revalidatePath("/therapy/experiences");
    if (error) throw error;
  } catch (error) {
    return {
      status: "comment wasn't uploaded",
      issue: error.message,
    };
  }
}

export async function bookMassage(
  massage,
  therapist,
  massageDate,
  massageTime,
  massageRoom,
  userName,
  userEmail,
  duration,
  price,
) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          massage_name: massage,
          therapistname: therapist,
          date: massageDate,
          time: massageTime,
          room: massageRoom,
          clientname: userName,
          clientemail: userEmail,
          duration: duration,
          price: price,
          status: "scheduled",
          completed: false,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) throw error;
    revalidatePath("/therapy/experiences");
    return data;
  } catch (error) {
    return { status: "the massage was not booked", message: error.message };
  }
}

export async function updateAppointmentStatus(appointmentId, updates) {
  const supabase = await createSupabaseServerClient();
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update({
        ...updates,
      })
      .eq("id", appointmentId)
      .select();

    if (error) {
      throw new error();
    }

    revalidatePath("/authority/therapist");
    revalidatePath("/dashboard");
    return {
      success: true,
      data: data[0], //returns the only updated appointment
      message: "Appointment updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Update failed",
    };
  }
}

export async function giveTip(tipData) {
  const supabase = await createSupabaseServerClient();
  try {
    const { data, error } = await supabase
      .from("post_session_tips")
      .insert([
        {
          first_main_tip: tipData.firstMainTip,
          first_explanation: tipData.firstExplanation,
          second_main_tip: tipData.secondMainTip,
          second_explanation: tipData.secondExplanation,
          bonus_tip: tipData.bonusTip,
          client_name: tipData.clientName,
          client_email: tipData.clientEmail,
          therapist_name: tipData.therapistName,
          service_consumed: tipData.serviceConsumed,
          booking_id: tipData.massageId,
        },
      ])
      .select();

    if (error) throw error;

    return {
      status: "success",
      message: "Tips sent successfully!",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message || "Failed to send tips",
    };
  }
}

export async function enrollTherapist(formData) {
  const supabase = await createSupabaseServerClient();
  try {
    const specialties = formData.get("specialties") || "";
    const techniques = formData.get("techniques") || "";

    const { data, error } = await supabase
      .from("therapists")
      .insert([
        {
          name: formData.get("name") || "",

          password: formData.get("password") || "",
          experience: parseInt(formData.get("experience") || 0),
          education: formData.get("education") || "",
          speciality: specialties,
          techniques: techniques,
          hours: parseInt(formData.get("hours") || 0),
          level: formData.get("level") || "",
          price: parseInt(formData.get("price") || 0),
          image: formData.get("image") || "",
          verified: formData.get("verified") === "true",
          rating: 4.0,
          reviews: 38,
          created_at: new Date().toISOString(),
          emailaddress: formData.get("email"),
        },
      ])
      .select();

    //register(formData);

    if (error) {
      console.log(error);
      throw error;
    }

    return {
      success: true,
      message: "Therapist enrolled successfully",
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteTherapist(therapistName) {
  const supabase = await createSupabaseServerClient();
  try {
    const { error } = await supabase
      .from("therapists")
      .delete()
      .eq("name", therapistName);

    if (error) throw error;

    return {
      success: true,
      message: "Therapist deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function markNoShow(passedInID) {
  const supabase = await createSupabaseServerClient();
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update({
        status: "no_show",
        completed: false,
      })
      .eq("id", passedInID);

    if (error) {
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}
