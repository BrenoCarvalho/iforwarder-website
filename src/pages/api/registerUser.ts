import { createHmac } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const WEBHOOK_SECRETKEY = process.env.WEBHOOK_SECRETKEY;

function hmac_signature(body: object) {
  if (!WEBHOOK_SECRETKEY) {
    return "";
  }

  const payload = JSON.stringify(body);
  const sha256 = createHmac("sha256", WEBHOOK_SECRETKEY)
    .update(payload)
    .digest("base64");

  return sha256;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!WEBHOOK_SECRETKEY) {
      res.status(500).json({ error: "Internal Server Error" });
    }

    const signatureWebhook = req.headers["x-yampi-hmac-sha256"];
    const hmacSignature = hmac_signature(req.body);

    if (signatureWebhook == hmacSignature) {
      console.log("Authenticated");
      res.status(200).json({ status: "Successfuly" });
    } else {
      console.log("Unauthorized");
      res.status(401).json({ status: "Unauthorized" });
    }
  }
}
