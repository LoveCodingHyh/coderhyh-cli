#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs'),
  path = require('path'),
  ejs = require('ejs');
var stat = fs.stat;
inquirer.prompt([
  {
    name: 'projectName',
    default: 'demo',
    message: 'projectName'
  }

]).then(res => {
  // console.log(res); // ejs的输入
  const templateDir = path.join(__dirname, 'templates'),
    distDir = process.cwd();
  fs.mkdir(path.join(distDir, res.projectName), (err, mkdirRes) => {
    if (err) throw err;
    // console.log(mkdirRes, 'mkdirRes') // create dir
  })
  fs.readdir(templateDir, (err, files) => {
    if (err) throw err;
    if (files && files.length) {
      // console.log(files); // 读取所有文件
      files.forEach(file => {
        let path_ = path.join(distDir, res.projectName, file);
        let dirPath = __dirname + '/templates/' + file;
        let stat = fs.lstatSync(dirPath)
        if (stat.isDirectory()) {
          exists(dirPath, path_, copy)
        } else {
          ejs.renderFile(path.join(templateDir, file), res, (err, fileRes) => {
            if (err) throw err;
            fs.writeFileSync(path_, fileRes)
          })
        }
        console.log(file);
      })
      console.log(res.projectName, '创建完成');
    }
  })
})


var copy = function (src, dst) {
  //读取目录
  fs.readdir(src, function (err, paths) {
    // console.log(paths)
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      var _src = src + '/' + path;
      var _dst = dst + '/' + path;
      var readable;
      var writable;
      stat(_src, function (err, st) {
        if (err) {
          throw err;
        }

        if (st.isFile()) {
          readable = fs.createReadStream(_src); //创建读取流
          writable = fs.createWriteStream(_dst); //创建写入流
          readable.pipe(writable);
        } else if (st.isDirectory()) {
          exists(_src, _dst, copy);
        }
      });
    });
  });
}

var exists = function (src, dst, callback) {
  //测试某个路径下文件是否存在
  fs.exists(dst, function (exists) {
    if (exists) {
      callback(src, dst);
    } else {
      fs.mkdir(dst, function () { //创建目录
        callback(src, dst)
      })
    }
  })
}