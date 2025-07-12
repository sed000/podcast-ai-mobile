const AZURE_URL = process.env.EXPO_PUBLIC_AZURE_URL!;

export async function generatePodcast(
  prompt: string,
  userId: string,
  host: string,
  guest: string,
) {
  try {
    const body = { prompt, userId, host, guest };

    const res = await fetch(AZURE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data; 
  } catch (err: any) {
    console.warn('[generatePodcast] error:', err?.message);
    throw err; 
  }
}
