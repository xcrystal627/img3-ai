import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { contactTemplate } from './template'

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, phoneNumber, message } = req.body

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: email,
      to: process.env.DEST_EMAIL,
      subject: `見積もり上手の齋藤さんから連絡が来てます。`,
      html: contactTemplate({
        name,
        email,
        phoneNumber,
        message,
      }),
    })

    res.status(200).json({ message: 'success' })
  }
}

export default contact
