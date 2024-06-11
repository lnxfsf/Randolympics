

npm i express cors dotenv nodemon mysql2 uuid jsonwebtoken bcryptjs

// treba mysql2. noviji je
npm i express mysql2



// register

curl -X POST \
  http://localhost:5000/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "igor@gmail.com",
    "password": "igor123"
}'



// login

curl -X POST \
  http://localhost:5000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "igor@gmail.com",
    "password": "igor123"
}'





curl -X POST http://localhost:5000/captcha/verify \
     -H "Content-Type: application/json" \
     -d '{"captchaValue": "your_captcha_value"}'




