import { Request, Response } from 'express';
import DecodeTokenHelper from '../../../helpers/decode-token.helper';
import { WalletModel } from '../models/FinancialAssetModel';

export default class UpdateFinancialAssetController {
  constructor() {}

  async update(req: Request, res: Response) {
    const assetId = req.params.id;
    const userRef = DecodeTokenHelper.decode(req.headers.authorization!).user
      .id;

    const ref = await WalletModel.findOne({ userRef });

    if (!ref) {
      return res.status(404).send({ error: 'Could not locate the wallet' });
    }

    const assetIndex = ref.financial_assets.findIndex(
      (asset) => asset.id === assetId
    );

    if (assetIndex === -1) {
      return res.status(404).send({
        error:
          'Could not locate the financial asset, maybe it has been already deleted',
      });
    }

    ref.financial_assets[assetIndex] = {
      _id: ref.financial_assets[assetIndex].id,
      ...req.body,
    };

    const result = await ref.save();

    if (!result) {
      return res
        .status(400)
        .send({ error: 'It was not possible to update the asset' });
    }

    return res
      .status(200)
      .send({ message: 'The item has been succesfully updated' });
  }
}
