// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  // any server side code，不會出現在client side bundle
  // 看看是哪種request
  if (req.method === "POST") {
    // 拉出使用者輸入的資訊
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    // store data in db or return error
  } else {
    res.status(200).json({ name: "John Doe" });
  }
};
