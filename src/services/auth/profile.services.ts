import { supabase } from "@/lib/supabase/client";
import type { User } from "@/types/user";

export const createUserProfile = async ({
  id,
  name,
  email,
  role = "customer",
}: User) => {
  const { error } = await supabase.from("profiles").insert([{ id, name, email, role }]);
  if (error) throw error;
};


export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("name, role")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};
