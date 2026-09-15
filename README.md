# Khiron

Aplicación personal de movilidad y rehabilitación espinal, enfocada en la zona L5-S1. SPA en español con React, TypeScript, Vite y HeroUI v3, sin backend.

## Funcionalidades

- Sesiones configurables de mañana y noche: selecciona y ordena ejercicios.
- Pausas activas en el trabajo con temporizador de 50 minutos.
- Rutina de fisioterapia con vídeos e imágenes privados mediante Google Drive.
- Favoritos, recordatorios de ejercicios a evitar y tema claro/oscuro.
- Preferencias guardadas en el navegador mediante localStorage.

> La rutina es personal, no una recomendación médica general. Consulta con un profesional antes de utilizarla o adaptar las cargas y los ejercicios a tu situación.

## Desarrollo local

Requiere Node.js 22.22 o posterior de la rama 22 y pnpm 10.33.2.

```bash
cp .env.example .env
# Completa VITE_GOOGLE_CLIENT_ID en .env con tu ID de cliente OAuth web.
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
```

Abre `http://localhost:5173/khiron/`.

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor local |
| `pnpm build` | Comprobación de tipos y build en `dist/` |
| `pnpm preview` | Vista previa del build |
| `pnpm test` | Tests |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm lint` | ESLint |
| `pnpm audit` | Auditoría de todas las dependencias |
| `pnpm audit --prod` | Auditoría de dependencias de producción |

El lockfile fija las versiones utilizadas. `.npmrc` aplica una cuarentena de 24 horas a versiones nuevas; esto no sustituye las actualizaciones ni la auditoría de seguridad. La instalación no necesita ejecutar scripts de dependencias.

## Configuración de Google

1. Habilita Google Drive API en tu proyecto de Google Cloud.
2. Configura la pantalla de consentimiento OAuth. Para uso personal puede mantenerse en **External / Testing**, añadiendo tu cuenta a los usuarios de prueba.
3. Crea o reutiliza un cliente OAuth de tipo **Web application**.
4. Añade como orígenes JavaScript autorizados:
   - `http://localhost:5173` para desarrollo.
   - El origen HTTPS real de la web publicada, sin `/khiron/`. Por ejemplo, `https://alexhermida.dev` si Pages utiliza ese dominio, o `https://alexhermida.github.io` si ese es el origen final.
5. Configura `VITE_GOOGLE_CLIENT_ID` con el ID del cliente. **No uses un client secret, una clave de servicio ni un access token.**
6. Comprueba que tu cuenta tiene permiso para abrir los archivos de Drive del catálogo.

El ID de cliente OAuth es público por diseño y se incorpora al build. Cualquier variable `VITE_*` utilizada por el frontend puede terminar siendo pública.

La integración actual solicita `drive.readonly`: permite leer los archivos de Drive accesibles para la cuenta que consiente, no solo los del catálogo. La biblioteca también solicita permisos de identidad por defecto. Ten en cuenta este alcance antes de autorizarla; una cuenta dedicada al material de ejercicios reduce la exposición. Si el token caduca, recarga la página y vuelve a iniciar sesión. Puedes revocar la autorización desde las conexiones de terceros de tu cuenta de Google.

## Contribuciones y seguridad

No añadas vídeos privados, documentos de prescripción, credenciales ni archivos `.env` al repositorio. Revisa los archivos antes de cada commit: `.gitignore` no elimina contenido ya versionado.

Las Actions están fijadas por SHA y las actualizaciones de dependencias se proponen mediante Dependabot. Se recomienda proteger `main` con los checks de CI y revisión de cambios, especialmente los workflows.
