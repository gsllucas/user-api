import FinancialAsset from '../entities/FinancialAsset';
import { CreateFinancialAssetUsecaseError } from '../errors/CreateFinancialAssetError';

export default class CreateFinancialAssetUsecase {
  constructor() {}

  async execute({ ...financialAsset }: FinancialAsset) {
    if (!financialAsset) {
      return new CreateFinancialAssetUsecaseError(
        'No Financial Asset was provided'
      );
    }

    if (
      !financialAsset.exchange ||
      !financialAsset.name ||
      !financialAsset.quantity ||
      !financialAsset.quotation ||
      !financialAsset.tag ||
      !financialAsset.type
    ) {
      return new CreateFinancialAssetUsecaseError('It is missing a field');
    }

    return new FinancialAsset(
      financialAsset.name,
      financialAsset.tag,
      financialAsset.quantity,
      financialAsset.type,
      financialAsset.exchange,
      financialAsset.quotation,
      financialAsset.picture,
      financialAsset.rentability
    );
  }
}
