
import { getSupabaseClient } from "./supabaseClient";

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await getSupabaseClient().auth.signUp({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error: toError(error) };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await getSupabaseClient().auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error: toError(error) };
  }
}

export async function signOut() {
  try {
    const { error } = await getSupabaseClient().auth.signOut();
    return { error };
  } catch (error) {
    return { error: toError(error) };
  }
}

export async function resetPassword(email: string) {
  try {
    const { data, error } = await getSupabaseClient().auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/perfi-pay/login`
            : undefined,
      }
    );

    return { data, error };
  } catch (error) {
    return { data: null, error: toError(error) };
  }
}

export async function getUser() {
  try {
    const { data } = await getSupabaseClient().auth.getUser();
    return data?.user ?? null;
  } catch {
    return null;
  }
}

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}
