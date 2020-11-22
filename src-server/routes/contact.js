const express = require('express');
const { check, validationResult } = require('express-validator/check');
const nodemailer = require('nodemailer');
const request = require('request');

const router = express.Router();
const validations = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('must be specified'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('must be specified')
    .isEmail()
    .withMessage('must be a valid email'),
  check('subject')
    .exists({ checkFalsy: true })
    .withMessage('must be specified'),
  check('message')
    .exists({ checkFalsy: true })
    .withMessage('must be specified'),
];

// eslint-disable-next-line consistent-return
router.post('/', validations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // eslint-disable-next-line object-curly-newline
  const { name, email, subject, message, token } = req.body;

  const options = {
    url: 'https://www.google.com/recaptcha/api/siteverify',
    form: {
      secret: process.env.RECAPTCHA_TOKEN_SERVER,
      response: token,
    },
  };
  request.post(options, async (err, response, body) => {
    try {
      const result = JSON.parse(body);
      if (!result.success) {
        return res.status(400).json({ 'google-captcha-errors': result['error-codes'] });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `${name} <${email}>`,
        to: 'maikel@vaize.studio',
        subject: `Contact formulier ingevuld, onderwerp: ${subject}`,
        html: `<p><b>${name} heeft het contactformulier ingevuld.</b><br />${message}</p>`,
      });

      return res.end();
    } catch (error) {
      return res.status(400).end();
    }
  });
});

module.exports = router;
