import puppeteer, { Browser } from "puppeteer";

const url =
  "https://www.google.com/travel/flights/search?tfs=CBwQAhpEEgoyMDI0LTA0LTAyIh8KA0pGSxIKMjAyNC0wNC0wMhoDTEdXKgJaMDIDNzAyagcIARIDSkZLcgwIAxIIL20vMDRqcGwaIxIKMjAyNC0wNC0wNGoMCAMSCC9tLzA0anBscgcIARIDSkZLQAFIAXABggELCP___________wGYAQE&tfu=EgIIASIDEgEw";
const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const priceElement = document.querySelector(
      'span[aria-label="71351 Kenyan shillings"]'
    );
    return priceElement ? (priceElement as HTMLElement).innerText.trim() : null;
  });

  console.log(data);

  await browser.close();
};

main();
