import ky from 'ky';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

export async function loginUser(login: string, password: string): Promise<TokensResponse> {
  try {
    const tokens = await ky.post('http://localhost:8080/api/v1/auth/login', {
      json: { login, password },
    }).json<TokensResponse>();

    const response = NextResponse.json(
      { accessToken: tokens.accessToken }, // accessToken можна повертати клієнту
      { status: 200 }
    );

    response.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,              // true у продакшні
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,  // 14 днів
    });

    return response;
  } catch (error) {
    // Можна додати більш детальну обробку помилок тут
    throw new Error('Не вдалось залогінитись: ' + (error instanceof Error ? error.message : 'невідома помилка'));
  }
}

export function setRefreshTokenCookie(refreshToken: string, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // термін дії cookie — days днів

  // Записуємо cookie, доступну лише для HTTP (HttpOnly) — **недоступно через JS**, тому записуємо просто куку
  // Якщо хочеш HttpOnly, це має робити сервер при відповіді (Set-Cookie заголовок)
  document.cookie = `refreshToken=${refreshToken};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
}