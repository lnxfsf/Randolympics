






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

BASE_URL=http://localhost:3000/
SERVICE=yahoo
EMAIL_PORT=587
SECURE=true

USER_email="@yahoo.com"  //here, you put your yahoo email
PASS_email="xxxxxxxxxxx"  // and use app_passwords, yahoo gives you



```




## MySQL scheduler



- Deleting all rows from Traffic table, every 24 hours. We do this directly in MySQL query. So MySQL executes this for us... (not on backend nodejs)



```
SET GLOBAL event_scheduler = ON;



CREATE EVENT delete_all_rows_event
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM randolympics.traffic;
  
  
  
-- verify, it's there.. event that will run every 1 hour.. 
SELECT * FROM information_schema.EVENTS WHERE EVENT_NAME = 'delete_all_rows_event';
```















---------------

# Imports

npm i express cors dotenv nodemon mysql2 uuid jsonwebtoken bcryptjs

// treba mysql2. noviji je
npm i express mysql2
npm i nodemailer
npm i multer
npm i sequelize
npm i @sequelize/mysql  (so mysql with sequelize could work)





