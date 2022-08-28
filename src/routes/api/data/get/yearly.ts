export async function get() {
  const upstashBearer = import.meta.env.VITE_UPSTASH_BEARER;
  const response = await fetch("https://global-fond-mastiff-31218.upstash.io/get/yearly_data", {
    headers: {
      Authorization: `Bearer ${upstashBearer}`
    }
  });
  const rawBody = await response.json();
  const body = JSON.parse(rawBody.result);

  return { body };
}