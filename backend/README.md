## log history of backend setup 

1. installed express -> created server.js - npm init in the root, 
in package.json (in the root) I added 3 scripts

2. installed axios, bcryptjs, colors, dotenv, express-async-handler, jsonwebtoken, mongoose

3. created folder config/db.js
4. created .env in the root, added .env in gitignore
5. folder models/userModel.js
6. installed morgan
7. added MONGO_URI in .env
8. npm install -g nodemon
9. ES modules setup - in package.json "type": "module",
10. server runs, colors added
11. data with users.js - seeder script, seeder scripts in package.json
12. utilities/generateToken.js -added JWT_SECRET in .env
13. controllers/userController.js - controller for authentication of the user  
_authUser_ -
14. middleware folder - >authMiddleware.js and errorMiddleware.js
15. userRoutes.js
16. database connected, Postman userRoutes testing - authUser works


## backend 
17. added morgan in server.js - to show me GET PUT POST DELETE calls I make to my API when in development mode
for example- when I login: POST /api/users/login 200 207.800 ms - 280
18. npm i nodemon
19. npm i concurrently

