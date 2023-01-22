import express from 'express';
import CreateFinancialAssetController from '../resources/wallet/controllers/CreateFinancialAssetController';
import DeleteFinancialAssetController from '../resources/wallet/controllers/DeleteFinancialAssetController';
import GetFinancialAssetController from '../resources/wallet/controllers/GetFinancialAssetController';
import UpdateFinancialAssetController from '../resources/wallet/controllers/UpdateFinancialAssetController';

const assetsRouter = express.Router();

assetsRouter.post('/create', new CreateFinancialAssetController().create);
assetsRouter.get('/get', new GetFinancialAssetController().get);
assetsRouter.delete('/delete/:id', new DeleteFinancialAssetController().delete);
assetsRouter.put('/update/:id', new UpdateFinancialAssetController().update);

export { assetsRouter };
