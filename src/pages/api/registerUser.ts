import { createHmac } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const WEBHOOK_SECRETKEY = process.env.WEBHOOK_SECRETKEY;

function hmac_signature(body: object) {
  const payload = JSON.stringify(body);

  const hmac = createHmac("sha256", WEBHOOK_SECRETKEY ? WEBHOOK_SECRETKEY : "")
    .update(payload)
    .digest("base64");

  const encoded = Buffer.from(hmac, "utf8").toString("base64");

  console.log(encoded);

  return hmac;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!WEBHOOK_SECRETKEY) {
      res.status(500).json({ error: "Invalid WEBHOOK_SECRETKEY" });
      return;
    }

    const signatureWebhook = req.headers["x-yampi-hmac-sha256"];
    const hmacSignature = hmac_signature(req.body);

    console.log(WEBHOOK_SECRETKEY, hmacSignature);

    if (signatureWebhook == hmacSignature) {
      console.log("Authenticated");
      res.status(200).json({ status: "Successfuly" });
    } else {
      console.log("Unauthorized");
      res.status(401).json({ status: "Unauthorized" });
    }
  }
}
