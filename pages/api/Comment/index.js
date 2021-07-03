export default function handler(req, res) {
  if (req.method === "GET") {
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
