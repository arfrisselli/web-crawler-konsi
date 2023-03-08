const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

server.get('/', async (req, res) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // page.setDefaultNavigationTimeout( 90000 );

  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto('http://extratoclube.com.br/', {
    waitUntil: ['networkidle0', 'load'],
  });

  let elementHandle = await page.waitForSelector('frameset frame', {
    waitUntil: ['networkidle0', 'load'],
  });
  const frame = await elementHandle.contentFrame();

  // wait for #user selector and type username
  await frame.waitForSelector('#user');
  const username = await frame.$('#user');
  await username.type('testekonsi');

  // type password
  const password = await frame.$('#pass');
  await password.type('testekonsi');

  // click login button
  await frame.click('#botao');

  await frame.waitForSelector('button > span');
  await frame.click('button > span');

  //await browser.close();
  console.log('Done!');
});

const port = 3000;
server.listen(port, () => {
  console.log(`
    Servidor online!
    http://localhost:${port}`);
});
