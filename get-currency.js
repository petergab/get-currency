const fetch = require("node-fetch");
const jsdom = require("jsdom");

async function getStockPrice(stockSymbol) {
  const url = `https://in.finance.yahoo.com/lookup?s=$${stockSymbol}`;
  const response = await fetch(url);
  const pageBody = await response.text();
  const dom = new jsdom.JSDOM(pageBody, "text/html");
  return parseFloat(dom.window.document.querySelectorAll("td")[2].textContent.replace(/,/g, ""));
}

async function main() {
  await getStockPrice("USDPLN").then((response) => console.log(`USDPLN price: ${response}`));
  await getStockPrice("EURPLN").then((response) => console.log(`EURPLN price: ${response}`));
  await getStockPrice("GBPPLN").then((response) => console.log(`GBPPLN price: ${response}`));
}

main();
