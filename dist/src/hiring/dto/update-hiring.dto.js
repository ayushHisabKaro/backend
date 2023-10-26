"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHiringDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_hiring_dto_1 = require("./create-hiring.dto");
class UpdateHiringDto extends (0, swagger_1.PartialType)(create_hiring_dto_1.CreateHiringDto) {
}
exports.UpdateHiringDto = UpdateHiringDto;
//# sourceMappingURL=update-hiring.dto.js.map