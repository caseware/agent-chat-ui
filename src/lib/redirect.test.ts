import { redirectToLogin } from './redirect';
import * as browser from './browser';

// Mock the browser module
jest.mock('./browser');

describe('redirectToLogin', () => {
  let mockGetLocation: jest.MockedFunction<typeof browser.getLocation>;
  let mockNavigateTo: jest.MockedFunction<typeof browser.navigateTo>;

  beforeEach(() => {
    mockGetLocation = browser.getLocation as jest.MockedFunction<typeof browser.getLocation>;
    mockNavigateTo = browser.navigateTo as jest.MockedFunction<typeof browser.navigateTo>;
    
    // Reset mocks
    mockGetLocation.mockReset();
    mockNavigateTo.mockReset();
  });

  it('redirects to correct login URL with redirectTo parameter', () => {
    mockGetLocation.mockReturnValue({
      origin: 'http://localhost:3300',
      pathname: '/sdlc-da-dev-mikhail-test/other/page',
      search: '?foo=bar',
      hash: '#section',
    });

    redirectToLogin();

    expect(mockNavigateTo).toHaveBeenCalledWith(
      'http://localhost:3300/sdlc-da-dev-mikhail-test/webapps/#login?redirectTo=../other/page?foo=bar#section'
    );
  });

  it('does not redirect in SSR environment', () => {
    mockGetLocation.mockReturnValue(null);

    // Should not throw and should not call navigateTo
    expect(() => redirectToLogin()).not.toThrow();
    expect(mockNavigateTo).not.toHaveBeenCalled();
  });
});
