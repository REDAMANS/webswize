import { NextRequest, NextResponse } from "next/server";
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "webswize@gmail.com",
        pass: process.env.NODEMAILER_PWD
    }
})

export async function POST(req: NextRequest) {
    try {
        const {
            name,
            familyName,
            email,
            comment
        } = await req.json()

        const mailOptions = {
            from: email,
            to: 'webswize@gmail.com',
            subject: 'Client service',
            text: `First name : ${name}\n
            Last name : ${familyName}\n
            email : ${email}\n
            comment: \n${comment}`,
            html: `
                <div style="padding: 20px; border-radius: 25px; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    <div style="display: flex; flex-direction: row; gap: 10px;">
                        <ul style="list-style-type:none;font-weight:700;">
                            <li style="margin: 8px 0;">First name</li>
                            <li style="margin: 8px 0;">Last name</li>
                            <li style="margin: 8px 0;">Email</li>
                            <li style="margin: 8px 0;">Comment</li>
                        </ul>
                        <ul style="list-style-type:none;">
                            <li style="margin: 8px 0;">: ${name}</li>
                            <li style="margin: 8px 0;">: ${familyName}</li>
                            <li style="margin: 8px 0;">: ${email}</li>
                            <li style="margin: 8px 0;">: ${comment}</li>
                        </ul>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: "true", message: "Email sent successfully !"})
    }catch(e) {
        console.error(e);
        return NextResponse.json({ success: "false", message: "Server is not responding."})
    }
}