import express, { Request, Response } from 'express';
import { stocksUrl } from '../constants/external-urls';

const fetch = require('node-fetch');

const stockRouter = express.Router();

const nasdaq = require('../stocks/nasdaq.json');

stockRouter.get('/get/:ticker', async (req: Request, res: Response) => {
  const ticker = req.params.ticker;

  console.log(ticker);

  // const encodedParams = new URLSearchParams();
  // encodedParams.append('symbol', '*');
  // encodedParams.append('period', '1d');

  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'X-RapidAPI-Key': '480a492f7dmsh94a55e3cfbe11f4p12d875jsn8df74373ce2f',
  //     'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com',
  //   },
  //   body: encodedParams,
  // };

  // const stocksResponse = await fetch(`${stocksUrl}/price`, options);
  // const json = await stocksResponse.json();
  // console.log(json);

  const index = nasdaq.findIndex((stock: any) => stock.Code === ticker);

  const stock = nasdaq[index];

  // nasdaq.forEach((stock: any) => console.log(stock.Code));

  return res.status(200).send({ stock: stock });
});

export { stockRouter };
