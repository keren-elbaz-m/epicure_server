import { Document, Model, UpdateQuery } from 'mongoose';
import { BaseRepository } from './base.repository';

export class BaseService<T extends Document> {
    constructor(private repo: BaseRepository<T>) {
    }

    async getAll(): Promise<T[]> {
        return this.repo.findAll();
    }

    async getById(id: string): Promise<T | null> {
        return this.repo.findById(id);
    }

    async create(data: T): Promise<T> {
        return this.repo.create(data);
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return this.repo.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return this.repo.delete(id);
    }
}
