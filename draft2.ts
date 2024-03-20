const puppeteer = require('puppeteer');
import {Browser} from 'puppeteer';

const url = 'https://www.pointhound.com/flights?dateBuffer=false&flightClass=Business+%26+First+Class&originCode=DXB&originName=Dubai&destinationCode=JFK&destinationName=New+York&passengerCount=1&departureDate=2024-07-25';

const main = async () => { 
  const browser: Browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url);
  await browser.close();
}

main();