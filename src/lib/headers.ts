export const ENGAGEMENT_HEADER = "engagement-id-base64";

export function getEngagementHeader(): Record<string, string> {
  const headers: Record<string, string> = {};
  if (typeof window !== "undefined") {
    // First try to extract engagement ID from the URL path
    // Expected pattern: /e/eng/{engagement-id}/s/agent-chat-ui/
    const pathSegments = window.location.pathname.split('/');
    const engIndex = pathSegments.indexOf('eng');
    let engagement: string | null = null;
    
    if (engIndex !== -1 && engIndex < pathSegments.length - 1) {
      engagement = pathSegments[engIndex + 1];
    }
    
    // Fall back to search parameter if not found in path
    if (!engagement) {
      engagement = new URLSearchParams(window.location.search).get("eng");
    }
    
    if (engagement) {
      headers[ENGAGEMENT_HEADER] = engagement;
    }
  }
  return headers;
}
