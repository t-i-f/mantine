const hb = require('handlebars')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')

console.log("=============1==============");
const yml = process.env.TISF_CONFIG
console.dir(yml[0], {depth: null});
const loc = path.resolve(yml.meta.loc);
console.log(loc);
const tpth = path.resolve(process.cwd(), "templates");
console.log(tpth);

const root = fs.readFileSync(path.resolve(tpth, 'HeaderMegaMenu.tsx'), 'utf8')
const temp = fs.readFileSync(path.resolve(tpth, 'MegaMenu.tsx'), 'utf8')

function sculptSingle(k, v) {
    const template = hb.compile(temp);
    const icons = [];
    const description = v[0];
    v.shift();
    _.forEach(v, function(value) {
        icons.push(value.icon);
    });
    const o = {title: k, description, nav: v, icons};

    const output = template(o);
    const fil = path.resolve(loc, k+".tsx");
    fs.writeFileSync(fil, output);
}

function sculpt() {
    if (!fs.existsSync(loc)) {
        fs.mkdirSync(loc);
    }
    const top = [];
    _.forOwn(yml.data.nav, function(value, key) {
        top.push(key);
    });
    fs.copyFileSync(path.resolve(tpth, "HeaderMegaMenu.module.css"), loc);
    const template = hb.compile(root);
    const r = template({top});
    const fil = path.resolve(loc, "HeaderMegaMenu.tsx");
    fs.writeFileSync(fil, r);
    _.forEach(top, function(value) {
        sculptSingle(value, yml.data.nav[value]);
    });
}

sculpt();
