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
  //     'content-type': 'application/x-www-form-urlencoded'
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
