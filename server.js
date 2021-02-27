const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const upload = multer();

router.get('/', async (ctx) => {
  ctx.set('Content-Type', 'text/html; charset=utf-8');
  ctx.body = fs.readFileSync('index.html');
});
var fileTypes = [
  ["json", "application/json"],
  ["js", "text/javascript"],
  ["coffee", "text/coffeescript"],
  ["html", "text/html"],
  ["txt", "text/plain"],
  ["csv", "text/csv"],
  ["png", "image/png"],
  ["jpg", "image/jpg"],
  ["jpeg", "image/jpeg"],
  ["gif", "image/gif"],
  ["tif", "image/tiff"],
  ["tiff", "image/tiff"],
  ["zip", "application/zip"],
  ["pdf", "application/pdf"],
  ["vcf", "text/vcard"],
  ["svg", "image/svg+xml"],
  ["xls", "application/vnd.ms-excel"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["mp3", "audio/mpeg"]
];

fileTypes.forEach(filetype => {
  router.put(`/upload-${filetype[0]}`, upload.single('file'), async (ctx) => {
    fs.writeFileSync(`downloads/${Date.now()}.${filetype[0]}`, ctx.file.buffer);
    ctx.body = 'Done!';
  })
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
