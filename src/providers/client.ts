import { Client } from "@langchain/langgraph-sdk";
import { getEngagementHeader } from "@/lib/headers";

export function createClient(apiUrl: string, apiKey: string | undefined) {
  return new Client({
    apiKey,
    apiUrl,
    defaultHeaders: getEngagementHeader(),
  });
}
