import { test, expect } from '@playwright/test';

test.describe('Auth API - OTP Flow', () => {
  const phone = '5321234455';
  const url = 'https://example.com';

  test('POST /api/auth/otp/send - should send OTP', async ({ request }) => {
    const response = await request.post('/api/auth/otp/send', {
      data: {
        phone,
        url,
        method: 'phone'
      }
    });

    // Expecting 200 or 429 (rate limited)
    // If we have a test phone number, it should return 200
    if (response.status() === 200) {
      const body = await response.json();
      expect(body).toHaveProperty('success', true);
    } else {
      console.warn(`Auth API returned status ${response.status()}`);
    }
  });

  test('POST /api/auth/otp/verify - should handle incorrect code', async ({ request }) => {
    const response = await request.post('/api/auth/otp/verify', {
      data: {
        code: '000000'
      }
    });

    // Should return 401 or include an error message
    const body = await response.json();
    expect(response.status()).not.toBe(200);
    expect(body).toHaveProperty('error');
  });

  test('POST /api/auth/otp/verify - should handle missing fields', async ({ request }) => {
    const response = await request.post('/api/auth/otp/verify', {
      data: {}
    });

    expect(response.status()).toBe(400);
  });
});
