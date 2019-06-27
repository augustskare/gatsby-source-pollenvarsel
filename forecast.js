const fetch = require("node-fetch");
const fastXmlParser = require("fast-xml-parser");

const { lowerCaseObjectKeys, normalizeForecast } = require("./utils.js");

async function getForecast(API_KEY) {
  if (API_KEY === undefined) {
    throw new Error("API Key is requred");
  }

  const response = await fetch(
    `http://xml.pollenvarslingen.no/pollenvarsel.asmx/GetAllRegions?userKey=${API_KEY}`
  );

  const xml = await response.text();
  const data = fastXmlParser.parse(xml).RegionForecast.Days.RegionDay;

  return normalizeForecast(
    data.map(day => {
      return {
        date: day.Date,
        regions: day.Regions.Region.map(region => {
          return {
            ...lowerCaseObjectKeys(region),
            pollen: region.PollenTypes.Pollen.map(lowerCaseObjectKeys),
          };
        }),
      };
    })
  );
}

module.exports = getForecast;
