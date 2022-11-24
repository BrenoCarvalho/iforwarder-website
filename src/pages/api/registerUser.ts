import { createHmac } from "crypto";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

const WEBHOOK_SECRETKEY = process.env.WEBHOOK_SECRETKEY;

export const config = {
  api: {
    bodyParser: false,
  },
};

function hmac_signature(bodyRaw: any) {
  const hmac = createHmac("sha256", WEBHOOK_SECRETKEY ? WEBHOOK_SECRETKEY : "")
    .update(bodyRaw)
    .digest("base64");

  return hmac;
}

async function isAuthenticated(
  req: NextApiRequest,
  res: NextApiResponse,
  bodyRaw: any
) {
  const signatureWebhook = req.headers["x-yampi-hmac-sha256"];
  const hmacSignature = hmac_signature(bodyRaw);

  if (signatureWebhook == hmacSignature) {
    return true;
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!WEBHOOK_SECRETKEY) {
      res.status(500).json({ error: "Invalid WEBHOOK_SECRETKEY" });
      return;
    }

    var bodyRaw = await buffer(req);

    if (!(await isAuthenticated(req, res, bodyRaw))) return;

    const bodyData = JSON.parse(bodyRaw.toString());

    const user = {
      name: bodyData.resource.customer.data.name,
      email: bodyData.resource.customer.data.email,
      cpf: bodyData.resource.customer.data.cpf,
      phone: 55 + bodyData.resource.customer.data.phone.full_number,
    };

    console.log(user);
    res.status(200).json({ status: "Successfuly" });
  }
}
