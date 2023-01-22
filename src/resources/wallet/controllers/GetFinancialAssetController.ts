import { Request, Response } from 'express';
import DecodeTokenHelper from '../../../helpers/decode-token.helper';
import { WalletModel } from '../models/FinancialAssetModel';

export default class GetFinancialAssetController {
  constructor() {}

  async get(req: Request, res: Response) {
    const userRef = DecodeTokenHelper.decode(req.headers.authorization ?? '')
      .user.id;

    const walletRef = await WalletModel.findOne({ userRef });

    if (!walletRef) {
      return res.status(404).send({
        error: 'Wallet not found',
        status: 404,
      });
    }

    return res.status(200).send({ data: walletRef });
  }
}
