export async function get() {
  const upstashBearer = import.meta.env.VITE_UPSTASH_BEARER;
  const response = await fetch("https://global-fond-mastiff-31218.upstash.io/mget/event_body/monthly_data/yearly_data", {
    headers: {
      Authorization: `Bearer ${upstashBearer}`
    }
  });
  const rawBody = await response.json();
  const eventBody = JSON.parse(rawBody.result[0]);
  const monthlyData = JSON.parse(rawBody.result[1]);
  const yearlyData = JSON.parse(rawBody.result[2]);

  return { body: { status: 200, eventBody, monthlyData, yearlyData } };
}