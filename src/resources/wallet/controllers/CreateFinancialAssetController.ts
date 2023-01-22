import { Request, Response } from 'express';
import FinancialAsset from '../entities/FinancialAsset';
import { CreateFinancialAssetUsecaseError } from '../errors/CreateFinancialAssetError';
import { WalletModel } from '../models/FinancialAssetModel';
import CreateFinancialAssetUsecase from '../usecases/CreateFinancialAssetUsecase';
import DecodeTokenHelper from '../../../helpers/decode-token.helper';
import { v4 as uuidv4 } from 'uuid';

export default class CreateFinancialAssetController {
  constructor() {}

  async create(req: Request, res: Response) {
    const {
      name,
      tag,
      quantity,
      type,
      exchange,
      quotation,
      picture,
      rentability,
    } = req.body;

    const financialAsset = new FinancialAsset(
      name,
      tag,
      quantity,
      type,
      exchange,
      quotation,
      picture,
      rentability
    );

    const usecase = await new CreateFinancialAssetUsecase().execute(
      financialAsset
    );

    if (usecase instanceof CreateFinancialAssetUsecaseError) {
      return res.status(400).send({
        error: usecase.message,
        type: 'CreateFinancialAssetUsecaseError',
        status: 400,
      });
    }

    const userRef = DecodeTokenHelper.decode(req.headers.authorization ?? '')
      .user.id;

    const ref = await WalletModel.findOne({ userRef });

    const asset: FinancialAsset = {
      name,
      tag,
      quantity,
      type,
      exchange,
      quotation,
      picture,
      rentability,
    };

    let result;

    if (ref) {
      ref.financial_assets.push({ _id: uuidv4(), ...asset });
      result = await ref.save();
    } else {
      const newWallet = new WalletModel({ _id: uuidv4(), userRef });
      newWallet.financial_assets.push({ _id: uuidv4(), ...asset });
      result = await newWallet.save();
    }

    if (!result || result === null) {
      return res.status(400).send({
        error: 'It was not possible to create a financial asset',
        status: 400,
      });
    }

    return res.status(201).send({ data: result });
  }
}
