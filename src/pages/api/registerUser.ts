import { createHmac } from "crypto";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
const nodemailer = require("nodemailer");
const path = require("path");
var nodemailerHandlebars = require("nodemailer-express-handlebars");

export const config = {
  api: {
    bodyParser: false,
  },
};

function hmac_signature(bodyRaw: any) {
  const hmac = createHmac(
    "sha256",
    process.env.WEBHOOK_SECRETKEY ? process.env.WEBHOOK_SECRETKEY : ""
  )
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

interface user {
  full_name: string;
  first_name: string;
  email: string;
  cpf: number;
  phone: number;
}

async function getUser(
  res: NextApiResponse,
  supabase: SupabaseClient<any, "public", any>,
  user: user
) {
  const response = await supabase
    .from("Users")
    .select("id")
    .eq("email", user.email)
    .eq("phone1", user.phone)
    .eq("name", user.full_name);

  if (response.error) {
    res.status(500).json({ error: response.error });
    return false;
  }

  return response.data[0].id;
}

async function createUser(res: NextApiResponse, user: user) {
  const supabase = createClient(
    process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "",
    process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : ""
  );

  const response = await supabase.from("Users").insert([
    {
      name: user.full_name,
      email: user.email,
      cpf: user.cpf,
      phone1: user.phone,
      access: "Full",
      enable: true,
    },
  ]);

  if (response.error) {
    res.status(500).json({ error: response.error });
    return false;
  }

  const license = await getUser(res, supabase, user);
  return license ? license : false;
}

async function sendEmail(user: user, license: string) {
  let transporter = nodemailer.createTransport({
    host: process.env.UMBLER_HOST,
    port: process.env.UMBLER_PORT,
    secure: false,
    auth: {
      user: process.env.UMBLER_USER,
      pass: process.env.UMBLER_PASSWORD,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.join(process.cwd(), "templates"),
      defaultLayout: false,
    },
    viewPath: path.join(process.cwd(), "templates"),
    extName: ".handlebars",
  };

  transporter.use("compile", nodemailerHandlebars(handlebarOptions));

  var mailOptions = {
    from: process.env.UMBLER_USER,
    to: user.email,
    subject: "Telegram Control License Key",
    template: "email",
    context: {
      first_name: user.first_name,
      license: license,
    },
  };

  await transporter.sendMail(mailOptions);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!process.env.WEBHOOK_SECRETKEY) {
      res.status(500).json({ error: "Invalid WEBHOOK_SECRETKEY" });
      return;
    }
    console.log(path.join(process.cwd(), "templates"));

    var bodyRaw = await buffer(req);

    if (!(await isAuthenticated(req, res, bodyRaw))) return;

    const bodyData = JSON.parse(bodyRaw.toString());

    const user = {
      full_name: bodyData.resource.customer.data.name,
      first_name: bodyData.resource.customer.data.first_name,
      email: bodyData.resource.customer.data.email,
      cpf: bodyData.resource.customer.data.cpf,
      phone: 55 + bodyData.resource.customer.data.phone.full_number,
    };

    const license = await createUser(res, user);
    if (!license) return;

    await sendEmail(user, license);
    res.status(200).json({ status: "Successfuly" });
  }
}
