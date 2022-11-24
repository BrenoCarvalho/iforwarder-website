import { createHmac } from "crypto";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
const nodemailer = require("nodemailer");

function buildHtmlTemplate(first_name: string, license: string) {
  return `
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="font-family:arial, 'helvetica neue', helvetica, sans-serif"
  >
    <head>
      <meta charset="UTF-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta content="telephone=no" name="format-detection" />
      <title>Document</title>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i"
        rel="stylesheet"
      />
      <style type="text/css">
        #outlook a { padding:0; } .es-button { mso-style-priority:100!important;
        text-decoration:none!important; } a[x-apple-data-detectors] {
        color:inherit!important; text-decoration:none!important;
        font-size:inherit!important; font-family:inherit!important;
        font-weight:inherit!important; line-height:inherit!important; }
        .es-desk-hidden { display:none; float:left; overflow:hidden; width:0;
        max-height:0; line-height:0; mso-hide:all; } [data-ogsb] .es-button {
        border-width:0!important; padding:10px 30px 10px 30px!important; } @media
        only screen and (max-width:600px) {p, ul li, ol li, a {
        line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a {
        line-height:120%!important } h1 { font-size:36px!important;
        text-align:left } h2 { font-size:26px!important; text-align:left } h3 {
        font-size:20px!important; text-align:left } .es-header-body h1 a,
        .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important;
        text-align:left } .es-header-body h2 a, .es-content-body h2 a,
        .es-footer-body h2 a { font-size:26px!important; text-align:left }
        .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
        font-size:20px!important; text-align:left } .es-menu td a {
        font-size:12px!important } .es-header-body p, .es-header-body ul li,
        .es-header-body ol li, .es-header-body a { font-size:14px!important }
        .es-content-body p, .es-content-body ul li, .es-content-body ol li,
        .es-content-body a { font-size:14px!important } .es-footer-body p,
        .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {
        font-size:14px!important } .es-infoblock p, .es-infoblock ul li,
        .es-infoblock ol li, .es-infoblock a { font-size:12px!important }
        *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c
        h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important }
        .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {
        text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2,
        .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c
        img, .es-m-txt-l img { display:inline!important } .es-button-border {
        display:inline-block!important } a.es-button, button.es-button {
        font-size:20px!important; display:inline-block!important } .es-adaptive
        table, .es-left, .es-right { width:100%!important } .es-content table,
        .es-header table, .es-footer table, .es-content, .es-footer, .es-header {
        width:100%!important; max-width:600px!important } .es-adapt-td {
        display:block!important; width:100%!important } .adapt-img {
        width:100%!important; height:auto!important } .es-m-p0 {
        padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l {
        padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b
        { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important
        } .es-mobile-hidden, .es-hidden { display:none!important }
        tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {
        width:auto!important; overflow:visible!important; float:none!important;
        max-height:inherit!important; line-height:inherit!important }
        tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden {
        display:table!important } td.es-desk-menu-hidden {
        display:table-cell!important } .es-menu td { width:1%!important }
        table.es-table-not-adapt, .esd-block-html table { width:auto!important }
        table.es-social { display:inline-block!important } table.es-social td {
        display:inline-block!important } .es-m-p5 { padding:5px!important }
        .es-m-p5t { padding-top:5px!important } .es-m-p5b {
        padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important }
        .es-m-p5l { padding-left:5px!important } .es-m-p10 {
        padding:10px!important } .es-m-p10t { padding-top:10px!important }
        .es-m-p10b { padding-bottom:10px!important } .es-m-p10r {
        padding-right:10px!important } .es-m-p10l { padding-left:10px!important }
        .es-m-p15 { padding:15px!important } .es-m-p15t {
        padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important }
        .es-m-p15r { padding-right:15px!important } .es-m-p15l {
        padding-left:15px!important } .es-m-p20 { padding:20px!important }
        .es-m-p20t { padding-top:20px!important } .es-m-p20r {
        padding-right:20px!important } .es-m-p20l { padding-left:20px!important }
        .es-m-p25 { padding:25px!important } .es-m-p25t {
        padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important }
        .es-m-p25r { padding-right:25px!important } .es-m-p25l {
        padding-left:25px!important } .es-m-p30 { padding:30px!important }
        .es-m-p30t { padding-top:30px!important } .es-m-p30b {
        padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important
        } .es-m-p30l { padding-left:30px!important } .es-m-p35 {
        padding:35px!important } .es-m-p35t { padding-top:35px!important }
        .es-m-p35b { padding-bottom:35px!important } .es-m-p35r {
        padding-right:35px!important } .es-m-p35l { padding-left:35px!important }
        .es-m-p40 { padding:40px!important } .es-m-p40t {
        padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important }
        .es-m-p40r { padding-right:40px!important } .es-m-p40l {
        padding-left:40px!important } .es-desk-hidden {
        display:table-row!important; width:auto!important;
        overflow:visible!important; max-height:inherit!important } }
      </style>
    </head>
    <body
      style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"
    >
      <div class="es-wrapper-color" style="background-color:#ffffff">
        <table
          class="es-wrapper"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#ffffff"
        >
          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"
              >
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table
                      bgcolor="#ffffff"
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"
                    >
                      <tr>
                        <td
                          align="left"
                          style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding:0;Margin:0;width:560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                                >
                                  <tr class="es-visible-simple-html-only">
                                    <td
                                      align="center"
                                      class="es-m-txt-c"
                                      style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px"
                                    ><h3
                                        style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333"
                                      >&nbsp;Olá ${first_name}!</h3></td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;padding-left:5px"
                                    ><p
                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px"
                                      >Obrigado por adquirir o produto, as
                                        informações de download e tutorial estão
                                        abaixo.</p></td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="left"
                                      style="padding:0;Margin:0;padding-left:20px;padding-top:30px;padding-bottom:30px"
                                    ><p
                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px"
                                      >Tutorial de instação:
                                        https://youtu.be/1EhjRz46w9s<br
                                        />API_ID:&nbsp;4166995<br />API_HASH:
                                        59f971660bb3014566369d159f3027b5</p></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table></td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding:0;Margin:0;width:560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-left:2px dashed #cccccc;border-right:2px dashed #cccccc;border-top:2px dashed #cccccc;border-bottom:2px dashed #cccccc;border-radius:5px"
                                  role="presentation"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-m-txt-c"
                                      style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"
                                    ><h2
                                        style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333"
                                      >Licença</h2></td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-m-txt-c"
                                      style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px"
                                    ><h1
                                        style="Margin:0;line-height:55px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#e94945"
                                      >${license}</h1></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table></td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="padding:0;Margin:0;padding-bottom:10px;padding-left:20px;padding-right:20px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding:0;Margin:0;width:560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px"
                                  role="presentation"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"
                                    ><span
                                        class="msohide es-button-border"
                                        style="border-style:solid;border-color:#2cb543;background:#03a9f4;border-width:0px;display:inline-block;border-radius:6px;width:auto;mso-hide:all"
                                      ><a
                                          href="https://mega.nz/file/VFsEEbzD#OpvEcrRlEo0fvFFSXGl3jDVmPA6Ujb26l6a8bMB-aQg"
                                          class="es-button"
                                          target="_blank"
                                          style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#03a9f4;border-width:10px 30px 10px 30px;display:inline-block;background:#03a9f4;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:30px;border-right-width:30px"
                                        >Download</a></span><!--<![endif]--></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table></td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="padding:0;Margin:0;padding-bottom:10px;padding-left:20px;padding-right:20px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding:0;Margin:0;width:560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="padding:0;Margin:0;display:none"
                                    ></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table></td>
                      </tr>
                    </table></td>
                </tr>
              </table></td>
          </tr>
        </table>
      </div>
    </body>
  </html>`;
}

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

  await transporter.sendMail({
    from: process.env.UMBLER_USER,
    to: user.email,
    subject: "Telegram Control License Key",
    html: buildHtmlTemplate(user.first_name, license),
  });
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

    var bodyRaw = await buffer(req);
    const bodyData = JSON.parse(bodyRaw.toString());

    if (!(await isAuthenticated(req, res, bodyRaw))) return;

    if (bodyData.event != "order.paid") {
      res.status(500).json({ error: "Unauthorized" });
      return;
    }

    const user = {
      full_name: bodyData.resource.customer.data.name,
      first_name: bodyData.resource.customer.data.first_name,
      email: bodyData.resource.customer.data.email,
      cpf: bodyData.resource.customer.data.cpf,
      phone: 55 + bodyData.resource.customer.data.phone.full_number,
    };

    const license = await createUser(res, user);
    if (!license) return;

    await sendEmail(user, "425897523478");
    res.status(200).json({ status: "Successfuly" });
  }
}
