import path from 'path';
import { handleUploadPose } from './src/api/UploadPoseInnhold';
import { handleGetPose } from './src/api/GetPoseInnhold';

const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.NODE_ENV === 'production'
  ? '*' // Replace with your specific origin if needed, '*' allows any
  : 'http://localhost:5173';

const staticFilesDir = path.resolve(import.meta.dir, 'dist');

console.log(`Serving static files from: ${staticFilesDir}`);
console.log(`Backend server starting on port ${PORT}...`);

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (pathname.startsWith('/api/')) {
      let responseBody: any = { error: 'API Not Found' };
      let responseStatus: number = 404;
      let result: { status: number; body: any } | null = null;

      try {
        if (pathname === '/api/UploadPoseInnhold' && req.method === 'POST') {
          const reqBody = await req.json();
          result = await handleUploadPose(reqBody);
        } else if (pathSegments[0] === 'api' && pathSegments[1] === 'poses' && pathSegments.length === 3 && req.method === 'GET') {
          const poseCode = pathSegments[2];
          result = await handleGetPose(poseCode);
        }

        if (result) {
          responseBody = result.body;
          responseStatus = result.status;
        }
      } catch (error) {
        console.error(`Error processing API ${req.method} ${pathname}:`, error);
        responseBody = { success: false, error: 'Internal Server Error processing API request.' };
        responseStatus = 500;
      }

      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': allowedOrigin, // Usually not needed for same-origin
        },
      });
    }

    if (req.method === 'GET') {
      try {
        let relativePath = pathname === '/' ? 'index.html' : pathname;
        if (relativePath.includes('..')) {
            console.warn(`Potential path traversal attempt blocked: ${pathname}`);
            return new Response('Forbidden', { status: 403 });
        }
        let filePath = path.join(staticFilesDir, relativePath);

        const file = Bun.file(filePath);
        const fileExists = await file.exists();

        if (fileExists) {
          return new Response(file);
        } else {
          const indexHtmlPath = path.join(staticFilesDir, 'index.html');
          const indexHtmlFile = Bun.file(indexHtmlPath);

          if (await indexHtmlFile.exists()) {
            return new Response(indexHtmlFile);
          } else {
            console.error(`Critical: index.html not found at ${indexHtmlPath}`);
            return new Response('Not Found - index.html missing', { status: 404 });
          }
        }
      } catch (error) {
        console.error(`Error serving static content for ${pathname}:`, error);
        return new Response('Internal Server Error during static serving', { status: 500 });
      }
    }

    console.log(`Unhandled request: ${req.method} ${pathname}`);
    return new Response('Not Found', { status: 404 });

  },

  error(error: Error) {
    console.error("Server error:", error);
    return new Response("Internal Server Error", {
        status: 500,
    });
  },
});

console.log(`Backend server listening on http://localhost:${PORT}`);