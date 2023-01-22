export default class FinancialAsset {
  constructor(
    public name: string,
    public tag: string,
    public quantity: string,
    public type: string,
    public exchange: string,
    public quotation: string,
    public picture?: string,
    public rentability?: string
  ) {}
}
