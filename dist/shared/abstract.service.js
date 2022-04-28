"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class AbstractService {
    constructor(repository) {
        this.repository = repository;
    }
    async save(options) {
        return this.repository.save(options);
    }
    async find(options = {}) {
        return this.repository.find(options);
    }
    async findOne(options) {
        return this.repository.findOne(options);
    }
    async update(id, options) {
        return this.repository.update(id, options);
    }
    async delete(id) {
        return this.repository.delete(id);
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map