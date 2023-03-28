const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adukalamapp@gmail.com',
        pass: 'rrkcgprvzoetcgrr'
    }
});

route.post('/text-mail', (req, res) => {
    const {to, subject, ownerName, coachName } = req.body;
    const mailData = {
        from: 'Adukalam Verification <adukalamapp@gmail.com>',
        to: to,
        subject: subject,
        html: `<p style="font-size: 16px;">Hi <b>${ownerName}</b>, A new coach <b>${coachName}</b> is requesting to add in your academy. Please verify and approve.</p>
                <br />
               <a href="https://kalam-in.web.app/login" style="background-color: orange;
               color: white;
               padding: 14px 25px;
               text-align: center;
               text-decoration: none;
               display: inline-block;"
               target="_blank">
               Click to approve
               </a>
            ` // email content in HTML
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});


route.post('/attachments-mail', (req, res) => {
    const {to, subject, text } = req.body;
    const mailData = {
        from: 'Adukalam Verification <adukalamapp@gmail.com>',
        to: to,
        subject: subject,
        text: text,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
        attachments: [
            {   // file on disk as an attachment
                filename: 'nodemailer.png',
                path: 'nodemailer.png'
            },
            {   // file on disk as an attachment
                filename: 'text_file.txt',
                path: 'text_file.txt'
            }
        ]
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});