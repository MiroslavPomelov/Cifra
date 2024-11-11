import express, { Request, Response, NextFunction } from "express";
import { readFilePromise, writeFilePromise } from "./file-operator_module";
import { User } from "./User";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as HandleBars from "handlebars";
import * as fileSystem from "fs";
import { engine } from "express-handlebars";
import path from "path";
import multer from "multer";
//---------------------------------------------------------
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join("../dist/uploads/", authorizatedUser.username);
    fileSystem.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload: any = multer({
  storage: storage,
  limits: { fieldSize: 1000000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file: any, cb: any): void {
  // Разрешенные типы файлов
  const filetypes: any = /jpeg|jpg|png|gif/;
  // Проверка расширения файла
  const extName: any = path.extname(file.originalname).toLowerCase();
  const extname: any = filetypes.test(extName);
  // Проверка mime-типа
  const mimetype: any = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Ошибка: Только изображения!");
  }
}

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../public/views/layouts"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../public/views"));

let registratedUsers: User[];

app.get("/registration-page", async (req: Request, res: Response) => {
  res.set("Content-Type", "text/html").status(200);

  res.send(await readFilePromise("../registration-page.html"));
});

app.get("/enter-page", async (req: Request, res: Response) => {
  res.set("Content-Type", "text/html").status(200);

  res.send(await readFilePromise("../enter-page.html"));
});

app.get("/index", async (req: Request, res: Response) => {
  res.set("Content-Type", "text/html").status(200);

  res.send(await readFilePromise("../index.html"));
});

//---------------------------------------
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.send("Файл успешно загружен!");
  } catch (err) {
    res.sendStatus(400);
  }
});

let authorizatedUser: User;
app.get("/", checkCookies, (req: Request, res: Response) => {
  console.log("11111");

  for (let i = 0; i < registratedUsers.length; i++) {
    if (req.cookies.token === registratedUsers[i].token) {
      authorizatedUser = registratedUsers[i];
    }
  }

  res.render("user", {
    username: authorizatedUser.username,
    firstname: authorizatedUser.firstname,
    lastname: authorizatedUser.lastname,
    email: authorizatedUser.email,
    password: authorizatedUser.password,
  });
});

app.post(
  "/registration-page",
  checkRegisteredUsers,
  express.urlencoded({ extended: true }),
  async (req: Request, res: Response) => {
    console.log(req.body);
    let user: User = new User(req.body.user);
    registratedUsers.push(user);

    writeFilePromise(
      "../db/userData.json",
      JSON.stringify(registratedUsers, null, 2)
    )
      .then(() => {
        return replaceTemplateValues(user);
      })
      .then(async (page) => {
        res
          .set("Content-Type", "text/html")
          .status(201)
          .send(await readFilePromise("../enter-page.html"));
      });
  }
);

app.post("/login", validateUser, async (req: Request, res: Response) => {
  console.log(createToken(64));

  res.status(201);
  res.send({
    status: 201,
    message: "ass",
  });
});

app.listen(3000, () => {
  readFilePromise("../db/userData.json").then((data: string) => {
    registratedUsers = JSON.parse(data);

    console.log("Server running on port 3000");
  });
});

function createToken(value: number): string {
  const tockenString: string =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let tocken: string = "";
  let counter: number = 0;
  for (let i = 0; i < value; i++) {
    if (counter === 8) {
      tocken += "-";
      counter = 0;
      continue;
    }

    tocken += tockenString[Math.floor(Math.random() * (61 - 0 + 1)) + 0];
    counter++;
  }
  return tocken;
}

function checkCookies(req: Request, res: Response, next: NextFunction) {
  let token: string | undefined = req.cookies.token;
  console.log(token);
  if (token != undefined) {
    for (let i = 0; i < registratedUsers.length; i++) {
      if (registratedUsers[i].token == token) {
        console.log("Кукис чекед");
        next();
        return;
      }
    }
  }
  console.log("плохо");
  res.writeHead(302, { Location: "/enter-page" });
  res.end();
}

function checkRegisteredUsers(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  let user: User = new User(req.body.userPinegun);

  if (!req.body.user) {
    res.status(404).send("Ошибка запроса");
  }

  let findUserByEmail = registratedUsers.find(
    (registratedUser) => registratedUser.email === user.email
  );

  if (findUserByEmail) {
    res.status(401).send("Пользователь с таким email уже зарегистрирован");
    return;
  }
  next();
}

function validateUser(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  let user: User = new User(req.body.user);

  console.log(user);
  if (!req.body.user) {
    res.status(400).send("Ошибка запроса");
  }

  let foundUser = registratedUsers.find(
    (registratedUser) => registratedUser.username === user.username
  );

  if (foundUser) {
    console.log("findUserByUsername");
    if (user.password === foundUser.password) {
      // req.body.user = findUserByUsername;
      let token: string = createToken(256);
      foundUser.token = token;

      writeFilePromise(
        "../db/userData.json",
        JSON.stringify(registratedUsers, null, 2)
      ).then((data: string) => {
        console.log(data);
      });

      res.cookie("token", token, { httpOnly: true });
      next();
    } else {
      res.status(403).send({ message: "Неправильный пароль!" });
      return;
    }
  } else {
    res.status(403).send({ message: "Неправильный логин!" });
    return;
  }
}

function replaceTemplateValues(userData: User): Promise<string> {
  return new Promise((resolve, reject) => {
    readFilePromise("../index.html").then((data: string) => {
      data = data
        .replace("%username%", userData.username)
        .replace("%firstname%", userData.firstname)
        .replace("%lastname%", userData.lastname)
        .replace("%email%", userData.email)
        .replace("%password%", userData.password);
      resolve(data);
    });
  });
}

//TODO
// Перенести все middlewares в папку services/middlewares
// export function
