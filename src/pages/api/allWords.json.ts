import { XataClient } from "@base/xata";


export async function GET({params, request}) {
  const xata = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH,
  });

  const page = await xata.db.WordList.select([
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

  return new Response(
    JSON.stringify(page)
  )
}