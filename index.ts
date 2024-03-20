import puppeteer, { Browser } from "puppeteer";

const url =
  "https://www.skyscanner.net/transport/flights/laxa/lond/240401/240403/?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=1";
const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const data = await page.evaluate((url) => {
    const priceData = Array.from(
      document.querySelectorAll(".Price_mainPriceContainer__MDM3O")
    );
    const prices = priceData.map((price: any) => {
      console.log(price); // Log the price object
      const priceElement = price.querySelector(
        ".BpkText_bpk-text__MWZkY.BpkText_bpk-text--lg__NjNhN"
      );
      console.log(priceElement); // Log the selected element
      return {
        price: priceElement?.textContent,
      };
    });

    return prices;
  }, url);

  console.log(data);

  await browser.close();
};

main();
