"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLookupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_lookup_dto_1 = require("./create-lookup.dto");
class UpdateLookupDto extends (0, swagger_1.PartialType)(create_lookup_dto_1.CreateLookupDto) {
}
exports.UpdateLookupDto = UpdateLookupDto;
//# sourceMappingURL=update-lookup.dto.js.map