






# How to run, setup locally 


- Install MySQL (use standard authentication type (old one) , )

- Open this folder in VSCode, then on Terminal 
- `npm install`
- `npm run server`


we don't access directly backend link in browser, we use frontend for that, now go on frontend folder, and start (run) frontend.




- You'll also need  `.env` file:

```
PORT=5000
HOST=localhost

USER=    // put here, credentials for your MySQL database, you created
PASSWORD=   // put here, credentials for your MySQL database, you created

DATABASE=randolympics


SITE_SECRET= xxxxxxxxxxxx   // this is for captcha..


# -----

#BASE_URL_BACKEND=http://localhost   // this one should be in prod
BASE_URL_BACKEND=http://localhost:5000

SERVICE=yahoo
EMAIL_PORT=587
SECURE=true

USER_email="@yahoo.com"  //here, you put your yahoo email
PASS_email="xxxxxxxxxxx"  // and use app_passwords, yahoo gives you



```




## MySQL scheduler



- Deleting all rows from Traffic table, every 24 hours. We do this directly in MySQL query. So MySQL executes this for us... (not on backend nodejs)





# Deletes logins, every 1 day

```
SET GLOBAL event_scheduler = ON; // in case you don't have it enabled



CREATE EVENT delete_all_rows_event
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM randolympics.traffic;
  
  
  
-- verify, it's there.. event that will run every 1 hour..  (so, we select ? )
SELECT * FROM information_schema.EVENTS WHERE EVENT_NAME = 'delete_all_rows_event';
```



### This is for deleting old campaigns that weren't paid, after 7 days.

```

SET GLOBAL event_scheduler = ON;  // in case you don't have it enabled



CREATE EVENT delete_old_unpaid_campaigns
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM campaign
  WHERE payment_status = 'unpaid'
  AND createdAt < NOW() - INTERVAL 7 DAY;




-- verify, it's there.. event that will run every 1 hour..  (so, we select ? )
SELECT * FROM information_schema.EVENTS WHERE EVENT_NAME = 'delete_old_unpaid_campaigns';
```




----------


# Bulk create users

Execute this script:


https://drive.google.com/file/d/1PtTckmNHA0VttthXWS5Z9k7NSo6ALguP/view?usp=sharing












---------------

# Imports

npm i express cors dotenv nodemon mysql2 uuid jsonwebtoken bcryptjs

// treba mysql2. noviji je
npm i express mysql2
npm i nodemailer
npm i multer
npm i sequelize
npm i @sequelize/mysql  (so mysql with sequelize could work)

npm i body-parser jsdom

npm install stripe

npm install jest
npm install supertest
npm install chai

npm install superagent

npm install date-fns


npm install @paypal/paypal-server-sdk@0.5.1

npm i cookie-parser


npm install aws-sdk multer-s3

npm install @aws-sdk/client-s3


npm i log-timestamp
npm install sharp


npm install i18next i18next-http-middleware i18next-fs-backend

-----------


##### register
```
curl -X POST \
  http://localhost:5000/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "igor@gmail.com",
    "password": "igor123"  
}'
```


##### login
```
curl -X POST \
  http://localhost:5000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "igor@gmail.com",
    "password": "igor123"
}'
```



```
curl -X POST http://localhost:5000/captcha/verify \
     -H "Content-Type: application/json" \
     -d '{"captchaValue": "your_captcha_value"}'
```



hello


