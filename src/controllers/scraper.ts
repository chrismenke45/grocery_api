import { Request, Response, NextFunction } from "express"
import axios from "axios"
import puppeteer from "puppeteer"

class scraperController {
  static scrapeAll(req: Request, res: Response, next: NextFunction) {
    puppeteer.launch({headless: "new"}).then(async function (browser) {
      const page = await browser.newPage()
      await page.goto("http://digidb.io/digimon-list/")

      // Targeting the DOM Nodes that contain the Digimon names
      const digimonNames = await page.$$eval(
        "#digiList tbody tr td:nth-child(2) a",
        function (digimons) {
          // Mapping each Digimon name to an array
          return digimons.map(function (digimon) {
            return digimon.innerText
          })
        }
      )

      // Closing the Puppeteer controlled headless browser
      await browser.close()

      // Sending the Digimon names to Postman
      res.send(digimonNames)
    })
  }
}

export default scraperController
