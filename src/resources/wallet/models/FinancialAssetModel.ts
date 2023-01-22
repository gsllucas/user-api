import mongoose from 'mongoose';

const FinancialAssetSchema = new mongoose.Schema(
  {
    _id: { type: String, require: true },
    name: { type: String, require: true },
    tag: { type: String, require: true },
    quantity: { type: String, require: true },
    type: { type: String, require: true },
    exchange: { type: String, require: true },
    quotation: { type: String, require: true },
    picture: { type: String, require: false },
    rentability: { type: String, require: false },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        (ret.id = ret._id), delete ret._id, delete ret.__v;
      },
    },
  }
);

const FinancialAssetModel = mongoose.model(
  'financial_asset',
  FinancialAssetSchema
);

const WalletSchema = new mongoose.Schema(
  {
    _id: { type: String, require: true },
    userRef: { type: String, require: true, unique: true },
    financial_assets: [FinancialAssetSchema],
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        (ret.id = ret._id), delete ret._id, delete ret.__v, delete ret.password;
      },
    },
  }
);

const WalletModel = mongoose.model('Wallet', WalletSchema);

export { FinancialAssetModel, WalletModel };
