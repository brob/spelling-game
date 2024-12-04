import type { APIRoute } from 'astro';
import { XataClient } from "@base/xata";

const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
  branch: import.meta.env.XATA_BRANCH,
});

const {records} = await xata.db.WordList.select([
  "xata_id",
  "Grade level",
  "definition",
  "part of speech",
  "sentence",
  "word",
]).getPaginated({
  pagination: {
    size: 70,
  },
});

export const GET: APIRoute = ({ params, request }) => {
  const id = params.id;
  return new Response(
    JSON.stringify({
      ...records.filter((record) => record.xata_id === id)[0]
    })
  )
}

export async function getStaticPaths() {
    
  return records.map((record) => ({
    params: { id: record.xata_id }
  }));
}