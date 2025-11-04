import { getLocation, navigateTo } from './browser';

/**
 * Redirect user to the login page, including the current URL so user can be returned post-auth.
 * Adds two query params:
 * - redirectTo: the full current path (pathname + search + hash)
 *
 * Usage: redirectToLogin();
 */
export function redirectToLogin(): void {
  const location = getLocation();
  if (!location) return; // SSR guard

  const { origin, pathname, search, hash } = location;
  
  // Extract first path segment (e.g., /sdlc-da-dev-mikhail-test from /sdlc-da-dev-mikhail-test/anything/else)
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0] || '';
  const basePath = firstSegment ? `/${firstSegment}` : '';
  
  // Build redirectTo as relative path from /webapps/ to the target page
  // Remove the first segment from pathname to get relative path
  let remainingPath = pathSegments.slice(1).join('/');
  
  // Ensure trailing slash is preserved (important for proper routing)
  if (remainingPath && !remainingPath.endsWith('/')) {
    remainingPath += '/';
  }
  
  const current = `../${remainingPath}${search}${hash}`;

  // Target login URL pattern: {origin}{basePath}/webapps/#login?redirectTo=...
  const target = `${origin}${basePath}/webapps/#login?redirectTo=${current}`;

  navigateTo(target);
}

/**
 * Check if an error is an authentication error (401/403) and redirect to login if so.
 * Returns true if the error was an auth error and redirect was triggered.
 * 
 * @param error - The error to check
 * @returns true if auth error and redirected, false otherwise
 */
export function handleAuthError(error: unknown): boolean {
  // Check if error has a status property (common for fetch errors)
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status;
    if (status === 401 || status === 403) {
      redirectToLogin();
      return true;
    }
  }
  
  // Check if it's a Response object
  if (error instanceof Response) {
    if (error.status === 401 || error.status === 403) {
      redirectToLogin();
      return true;
    }
  }
  
  // Check if error has a response property (axios-style errors)
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response: any }).response;
    if (response && typeof response === 'object' && 'status' in response) {
      const status = response.status;
      if (status === 401 || status === 403) {
        redirectToLogin();
        return true;
      }
    }
  }
  
  // Check if error message contains status code
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: string }).message;
    if (message && (message.includes('401') || message.includes('403') || 
        message.includes('Unauthorized') || message.includes('Forbidden'))) {
      redirectToLogin();
      return true;
    }
  }
  
  return false;
}
