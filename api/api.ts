import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";

const AZURE_URL = process.env.EXPO_PUBLIC_AZURE_URL!;
const createPodcastMutation = useMutation(api.database.createPodcast);
export async function generatePodcast(
  prompt: string,
  userId: string,
  host: string,
  guest: string
) {
  try {
    const body = { prompt, userId, host, guest };

    const res = await fetch(AZURE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    await createPodcastMutation({
      userId: userId,
      title: data.title,
      description: data.description,
      hostVoice: host,
      guestVoice: guest,
      prompt: data.prompt,
    });
    return data;
  } catch (err: any) {
    console.warn("[generatePodcast] error:", err?.message);
    throw err;
  }
}
