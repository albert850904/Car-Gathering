import {
  connectDatabaseHelper,
  insertDocumentHelper,
  getAllDoucmentsHelper,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId; // query parameters，在filename裏面
  let client;
  try {
    client = await connectDatabaseHelper();
  } catch (error) {
    res.status(500).json({ message: "connect to databse fail" });
    return;
  }

  if (req.method === "POST") {
    // 建構file path
    // 透過file path 取得資料
    // 用 find 找出那個item
    // res.status(200).json({ data });
    const { email, name, text } = req.body;

    // server side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ success: false, message: "invalid input" });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };
    let dbRes;
    try {
      dbRes = await insertDocumentHelper(client, "comments", newComment);
      newComment._id = dbRes.insertedId;
      res.status(201).json({
        success: true,
        message: "successfully commented",
        commentContent: newComment,
      });
    } catch (error) {
      res.status(500).json({ message: "insert comment fail" });
    }
  } else if (req.method === "GET") {
    // find() 會fetch all comments
    try {
      const dbRes = await getAllDoucmentsHelper(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(201).json({ success: true, commentList: dbRes });
    } catch (error) {
      res.status(500).json({ message: "getting comments fail" });
      // 不用return，讓他直接走進close
    }
  }
  client.close();
}

export default handler;
