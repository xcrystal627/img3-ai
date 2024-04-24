export const contactTemplate = ({
  name,
  email,
  phoneNumber,
  message,
}: {
  name: string
  email: string
  phoneNumber: string
  message: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 24px;
      color: #333333;
      margin-bottom: 20px;
    }

    .content {
      margin-bottom: 20px;
    }

    .label {
      font-weight: bold;
    }

    .footer {
      font-size: 12px;
      color: #777777;
    }

    .content p {
      margin: 0;
      line-height: 1.5;
      white-space: pre-line;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${name}様から問い合わせが来ています。</h1>
    <div class="content">
      <p class="label">お名前:</p>
      <p>${name}</p>
      <br>
      <p class="label">メールアドレス:</p>
      <p>${email}</p>
      <p class="label">電話番号:</p>
      <p>${phoneNumber}</p>
      <br>
      <p class="label">内容:</p>
      <p>${message}</p>
    </div>
    <hr>
  </div>
</body>
</html>

`
