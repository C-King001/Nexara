// Temporary deploy diagnostic: classic Node signature.
export default function handler(req, res) {
  res.status(200).json({ ok: true, style: "node" });
}
