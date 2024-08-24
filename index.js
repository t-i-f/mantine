const hb = require("handlebars");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");

const yml = JSON.parse(process.env.TISF_CONFIG);
const loc = path.resolve("../", yml.meta.loc);
const tpth = path.resolve(process.cwd(), "templates");

const root = fs.readFileSync(path.resolve(tpth, "HeaderMegaMenu.tsx"), "utf8");
const temp = fs.readFileSync(path.resolve(tpth, "MegaMenu.tsx"), "utf8");
const dtmp = fs.readFileSync(path.resolve(tpth, "data.ts"), "utf8");
const etmp = fs.readFileSync(path.resolve(tpth, "util.tsx"), "utf8");

function sculptData(data) {
  let icons = [];
  _.forOwn(data, function (v, k) {
    _.forEach(v, function (value) {
      if (typeof value !== "string") {
        icons.push(value.icon);
      }
    });
  });
  icons = _.uniq(icons);
  const template = hb.compile(dtmp);
  const r = template({ data, icons });
  const fil = path.resolve(loc, "data.ts");
  fs.writeFileSync(fil, r);
}

function sculptSingle(data) {
  const template = hb.compile(etmp);
  const r = template({ data });
  const fil = path.resolve(loc, "util.tsx");
  fs.writeFileSync(fil, r);
}

function sculptMain(top) {
  const template = hb.compile(root);
  const r = template({ top, vars: yml.vars });
  const fil = path.resolve(loc, "HeaderMegaMenu.tsx");
  fs.writeFileSync(fil, r);
}

function sculpt() {
  if (fs.existsSync(loc)) {
    fs.rmdirSync(loc, { recursive: true, force: true });
  }
  fs.mkdirSync(loc);
  sculptData(yml.data);
  const top = [];
  _.forOwn(yml.data, function (value, key) {
    top.push(key);
  });
  fs.copyFileSync(
    path.resolve(tpth, "HeaderMegaMenu.module.css"),
    path.resolve(loc, "HeaderMegaMenu.module.css")
  );
  fs.copyFileSync(
    path.resolve(tpth, "MegaMenu.tsx"),
    path.resolve(loc, "MegaMenu.tsx")
  );
  sculptSingle(top);
  sculptMain(top);
}

sculpt();

process.exit();
