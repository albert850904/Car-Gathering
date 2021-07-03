// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  connectDatabaseHelper,
  insertDocumentHelper,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
  // any server side code，不會出現在client side bundle
  // 看看是哪種request
  if (req.method === "POST") {
    // 拉出使用者輸入的資訊
    const email = req.body.email;
    // 在後端檢查才能確保使用者不會做什麼小動作
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "invalid email" });
      return;
    }
    let client;
    try {
      client = await connectDatabaseHelper();
    } catch (error) {
      res.status(500).json({ message: "connecting to db fail" });
      return;
    }
    try {
      await insertDocumentHelper(client, "newsletter", { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "insert data fail" });
      return;
    }

    res.status(201).json({ success: true, message: "signed up success" });
    // store data in db or return error
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
