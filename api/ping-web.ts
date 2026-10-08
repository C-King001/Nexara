// Temporary deploy diagnostic: web-standard signature, same as availability/book.
export function GET() {
  return Response.json({ ok: true, style: "web" });
}
