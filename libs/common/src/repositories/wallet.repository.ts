import { AbstractRepository, WalletDocument,  } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class WalletRepository extends AbstractRepository<WalletDocument> {
    protected readonly logger = new Logger(WalletRepository.name);

    constructor (
        @InjectModel(WalletDocument.name) walletModel: Model<WalletDocument>
    ) {
        super(walletModel);
    }

}