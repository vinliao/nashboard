import Redis from 'ioredis';

export async function get() {
  const upstashUrl = import.meta.env.VITE_UPSTASH_URL;
  let client = new Redis(upstashUrl);
  const rawData = await client.get('yearly_data');
  const body = JSON.parse(rawData);

  return { body };
}