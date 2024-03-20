const puppeteer = require('puppeteer');
import * as cheerio from 'cheerio';
import { Browser } from 'puppeteer';

async function main(): Promise<void> {
  try {
    const browser: Browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const url = 'https://www.pointhound.com/flights?dateBuffer=false&flightClass=Business+%26+First+Class&originCode=DXB&originName=Dubai&destinationCode=JFK&destinationName=New+York&passengerCount=1&departureDate=2024-07-25'

    const html = await page.content();
    const $ = cheerio.load(html);

    const pointsDivs = $('.flex.flex-col.items-end');
    const points: string[] = [];

    pointsDivs.each((index: number, element: cheerio.Element) => {
      const pointsElement = $(element).find('h5.text-2xl.lg:text-xl.xl:text-2xl.font-semibold.sm:mb-1.whitespace-nowrap.text-leaf');
      const pointsText: string = pointsElement.text().trim();
      points.push(pointsText);
    });
    

    console.log('Scraped points:', points);
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
