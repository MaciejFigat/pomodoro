# Full stack Pomodoro/Training timer 

> Built with MERN stack and Redux.

You can view project deployed at Heroku: [KuTimer](https://kutimer.herokuapp.com/) 

![screenshot](https://github.com/MaciejFigat/pomodoro/blob/main/backend/data/uploads/screenshot2.png)

![screenshot](https://github.com/MaciejFigat/pomodoro/blob/main/backend/data/uploads/screenshotPomodoro.png)

![screenshot](https://github.com/MaciejFigat/pomodoro/blob/main/backend/data/uploads/screenshotTraining.png)



## Structure
```
├── backend
|   ├── config (configuration file for mongoose, for connecting to DB )
|   ├── controllers (to simplify routes)
|   ├── data (for seeding DB with data and assets folder)
│   │   ├── uploads (assets)
|   ├── utilities (generateToken - jsonWebToken utility)
|   ├── README.md (backlog for my backend activity (partial))
|   ├── seeder.js (script for seeding the DB)
|   ├── server.js (server )
├── frontend
|   ├── build
|   ├── node_modules
|   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   ├── src
│   │   ├── actions (Redux)
│   │   ├── components (some reusable components)
│   │   ├── assets (photos, graphics etc.)
|   │   ├── constants (for action types in Redux)
|   │   ├── reducers (Redux)
|   │   ├── screens
|   │   ├── layout (Burger, Footer, Nav) 
|   │   ├── pages (I import the layout and have it as a wrapper for each of the pages)
|   |   ├── package-lock.json
|   |   ├── package.json
|   ├──App.js
|   ├──bootstrap.min.css (for all styles -imported)
|   ├──index.css
|   ├──index.js
|   ├──store.js (Redux)
├── node_modules
├── .env (environmental variables)
├── .gitignore
├── package-lock.json
├── package.json
├── Procfile (needed for Heroku deployment)
├── README.md
```

### ES Modules in Node - use at least Node v14.6+ or add the "--experimental-modules" flag

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = '123aaa'

```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
## Special thanks to Brad Traversy
This project is heavily influenced by his way of writing and designing MERN projects and especially BE side. 

## License

The MIT License

Copyright (c) 2021 Maciej Figat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.