import { Model, Document, UpdateQuery } from "mongoose";

export class BaseRepository<T extends Document> {
    constructor(private readonly model: Model<T>) {}

    async getAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async getById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async create(data: T): Promise<T> {
        return this.model.create(data);
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        return result !== null;
    }
}
