import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ChatMessage, SupabaseChatMessageRow, SupabaseChatSessionRow } from "@/types/chatbot";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize Supabase Client if credentials exist
export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;

/**
 * Creates or gets a chat session in Supabase
 */
export async function createSupabaseChatSession(sessionId: string, userName?: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from("chat_sessions").upsert(
      {
        id: sessionId,
        user_name: userName || "Tamu Soraya Tour",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      console.warn("Supabase chat session error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase session Exception:", err);
    return false;
  }
}

/**
 * Saves a single message to Supabase chat_messages table
 */
export async function saveSupabaseMessage(sessionId: string, message: ChatMessage): Promise<boolean> {
  if (!supabase) return false;

  try {
    const payload: Partial<SupabaseChatMessageRow> = {
      id: message.id,
      session_id: sessionId,
      role: message.role,
      content: message.content,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("chat_messages").insert([payload]);

    if (error) {
      console.warn("Supabase save message error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase message Exception:", err);
    return false;
  }
}

/**
 * Fetches chat history for a session from Supabase
 */
export async function fetchSupabaseChatHistory(sessionId: string): Promise<ChatMessage[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error || !data) return [];

    return data.map((row: SupabaseChatMessageRow) => ({
      id: row.id,
      role: row.role,
      content: row.content,
      timestamp: new Date(row.created_at).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  } catch (err) {
    console.warn("Fetch Supabase history Exception:", err);
    return [];
  }
}
