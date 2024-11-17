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


import * as middleWares from "./services/middleWares";
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




export let registratedUsers: User[];

app.get("/registration-page", async (req: Request, res: Response) => {
  res.set("Content-Type", "text/html").status(200);

  res.send(await readFilePromise("../webApp/registration-page.html"));
});

app.get("/enter-page", async (req: Request, res: Response) => {
  res.set("Content-Type", "text/html").status(200);

  res.send(await readFilePromise("../webApp/enter-page.html"));
});

app.get("/index", async (req: Request, res: Response) => {
  res.set("Content-Type", "text/html").status(200);

  res.send(await readFilePromise("../webApp/index.html"));
});



app.post('/upload', upload.single('file'), (req: Request, res: Response) => {

  if (!req.file) {
    res.status(400).send('No file uploaded.');
  } else {
    const fileName: string = req.file.filename;
    console.log(fileName);
    let findUser: User | undefined = registratedUsers.find(registratedUser => registratedUser.token === authorizatedUser.token);
    if (findUser) {
      registratedUsers.find(registratedUser => registratedUser.token === authorizatedUser.token)?.listOfFiles.push({ name: fileName });
      writeFilePromise('../db/userData.json', JSON.stringify(registratedUsers, null, 2));
      res.send('Файл успешно загружен!');
    }
    else {
      res.end('Ошибка!')
    }
  }
});


let authorizatedUser: User;
app.get("/", middleWares.checkCookies, (req: Request, res: Response) => {
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
  middleWares.checkRegisteredUsers,
  express.urlencoded({ extended: true }),
  async (req: Request, res: Response) => {
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
          .send(await readFilePromise("..webApp/enter-page.html"));
      });
  }
);

app.post("/login", middleWares.validateUser, async (req: Request, res: Response) => {
  res.status(201).send({
    status: 201,
    message: 'success'
  });
});

app.get("/documents", async (req: Request, res: Response) => {
  let files: { name: string }[] = authorizatedUser.listOfFiles;

  res.render('availableFiles', {
    files
  });

  res.render('main', {
    title: 'Домашняя страница'
  });
});

app.listen(3000, () => {
  readFilePromise("../db/userData.json").then((data: string) => {
    registratedUsers = JSON.parse(data);

    console.log("Server running on port 3000");
  });
});

// function createToken(value: number): string {
//   const tockenString: string =
//     "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//   let tocken: string = "";
//   let counter: number = 0;
//   for (let i = 0; i < value; i++) {
//     if (counter === 8) {
//       tocken += "-";
//       counter = 0;
//       continue;
//     }

//     tocken += tockenString[Math.floor(Math.random() * (61 - 0 + 1)) + 0];
//     counter++;
//   }
//   return tocken;
// }



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
