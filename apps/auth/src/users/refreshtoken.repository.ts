import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RefreshTokenDocument } from "./models/refreshtoken.schema";

@Injectable()
export class RefreshTokenRepository extends AbstractRepository<RefreshTokenDocument> {
    protected readonly logger = new Logger(RefreshTokenRepository.name);

    constructor (
        @InjectModel(RefreshTokenDocument.name) refreshTokenModel: Model<RefreshTokenDocument>
    ) {
        super(refreshTokenModel);
    }
}