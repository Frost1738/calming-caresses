import { createBrowserSupabaseClient } from "../supabase/supabaseClient";

const supabase = createBrowserSupabaseClient();
export async function getReviews() {
  try {
    let { data: reviews, error } = await supabase.from("reviews").select("*");

    if (error) throw new error();

    return reviews;
  } catch (error) {
    return {
      message: "we didnt get the reviews",
      problem: error.message,
    };
  }
}

export async function getTherapists(tier) {
  try {
    let { data: therapists, error } = await supabase
      .from("therapists")
      .select("*")
      .eq("level", tier);

    if (error) throw new error();

    return therapists;
  } catch (error) {
    return {
      message: "we couldnt get your therapist",
      error: error.message,
    };
  }
}

export async function getRooms() {
  try {
    let { data: rooms, error } = await supabase
      .from("rooms")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw new error();

    return rooms;
  } catch (error) {
    return {
      message: "we couldnt get your therapist",
      error: error.message,
    };
  }
}

export async function getAppointments(email) {
  try {
    let { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("clientEmail", email);

    if (error) throw new error();

    return bookings;
  } catch (error) {
    return {
      message: "we couldnt get your therapist",
      error: error.message,
    };
  }
}

export async function getAdmin() {
  try {
    let { data: user_permissions, error } = await supabase
      .from("user_permissions")
      .select("*");

    if (error) {
      throw new error();
    }
    return user_permissions;
  } catch (error) {
    return {
      message: "we couldnt get your therapist",
      error: error.message,
    };
  }
}

export async function getAllTherapists() {
  try {
    let { data: therapists, error } = await supabase
      .from("therapists")
      .select("*");

    if (error) throw new error();

    return therapists;
  } catch (error) {
    return {
      message: "we couldnt get your therapist",
      error: error.message,
    };
  }
}

export async function getSupabaseSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return { session };
  } catch (err) {
    return { status: "are you logged in ?", message: err.message };
  }
}

export async function getTherapistsBooking(therapistsName) {
  try {
    let { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("therapistName", therapistsName);

    if (error) throw new error();

    return bookings;
  } catch (error) {
    return {
      message: "we couldnt get your booking",
      error: error.message,
    };
  }
}

export async function getCompletedBookingsForTips(therapistsName) {
  try {
    let { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("therapistName", therapistsName)
      .eq("status", "completed");

    if (error) throw new error();

    return bookings;
  } catch (error) {
    return {
      message: "we couldnt get your bookings",
      error: error.message,
    };
  }
}

export async function getAllBookings() {
  try {
    let { data: bookings, error } = await supabase.from("bookings").select("*");

    if (error) throw error;
    return bookings;
  } catch (error) {
    return {
      message: "we couldnt get your bookings",
      error: error.message,
    };
  }
}

export async function getPostSessionTip(email) {
  try {
    let { data: postSessionTips, error } = await supabase
      .from("post session tips")
      .select("*")
      .eq("clientEmail", email);

    if (error) throw error;
    return postSessionTips;
  } catch (error) {
    return {
      message: "we couldnt get your tips",
      error: error.message,
    };
  }
}

export async function getReceipts(clientEmail) {
  try {
    let { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("clientEmail", clientEmail)
      .eq("status", "completed");

    if (error) throw new error();

    return bookings;
  } catch (error) {
    return {
      message: "we couldnt get your bookings",
      error: error.message,
    };
  }
}
