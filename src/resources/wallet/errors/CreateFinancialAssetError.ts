abstract class CreateFinancialAssetError extends Error {}

export class CreateFinancialAssetUsecaseError extends CreateFinancialAssetError {
  constructor(message?: string) {
    super(message);
  }
}
