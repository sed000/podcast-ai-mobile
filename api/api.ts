import { config } from "~/lib/config";

const AZURE_URL = config.azureUrl;

export async function generatePodcast(
  prompt: string,
  userId: string,
  host: string,
  guest: string,
  coins: number,
  createPodcastMutation: (args: {
    userId: string;
    title: string;
    description: string;
    hostVoice: string;
    guestVoice: string;
    prompt: string;
    audioUrl: string;
    sessionId?: string;
  }) => Promise<any>
) {
  try {
    const body = { prompt, userId, host, guest };
    if (coins < 1) {
      throw new Error("You don't have enough coins");
    }
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
    console.log("[generatePodcast] Azure response data:", data);
    
    const mutationArgs = {
      userId: userId,
      title: data.title,
      description: data.description,
      hostVoice: host,
      guestVoice: guest,
      prompt: prompt,
      audioUrl: data.mergedUrl,
      sessionId: data.sessionId,
    };
    
    console.log("[generatePodcast] Calling mutation with args:", mutationArgs);
    const result = await createPodcastMutation(mutationArgs);
    console.log("[generatePodcast] Mutation result:", result);
    
    return data;
  } catch (err: any) {
    console.warn("[generatePodcast] error:", err?.message);
    throw err;
  }
}