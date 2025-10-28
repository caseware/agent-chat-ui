/**
 * Abstraction layer for browser APIs to make testing easier.
 * These functions can be easily mocked in tests using jest.mock().
 */

export interface LocationInfo {
  origin: string;
  pathname: string;
  search: string;
  hash: string;
}

/**
 * Get current location information
 */
export function getLocation(): LocationInfo | null {
  if (typeof window === 'undefined') return null;
  
  return {
    origin: window.location.origin,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

/**
 * Navigate to a new URL
 */
export function navigateTo(url: string): void {
  if (typeof window === 'undefined') return;
  window.location.href = url;
}
