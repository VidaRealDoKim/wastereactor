/* Security Policy */

/* Permissões de fiabilidade */
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block

/* HTTPS Strict Transport Security */
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

/* Content Security Policy */
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';

/* Referrer Policy */
Referrer-Policy: strict-origin-when-cross-origin

/* Permissions Policy */
Permissions-Policy: camera=(), microphone=(), geolocation=(), usb=(), payment=()
