import { Model, Document } from "mongoose";

export class BaseRepository <T extends Document>{
    constructor(private model:Model<T>){}

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async create(data: T): Promise<T> {
        return this.model.create(data);
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        return result !== null;
    }
}