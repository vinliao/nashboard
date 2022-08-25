import supabase from '$lib/db';

export async function get() {
  const { data, error } = await supabase
    .from('event_data')
    .select('body')
    .order('id', { ascending: false })
    .limit(1);

  const body = JSON.parse(data[0].body);

  return { body };
}