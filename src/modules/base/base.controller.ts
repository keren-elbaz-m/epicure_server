import { Request, Response } from 'express';
import { BaseService } from './base.service';
import { Document, UpdateQuery } from 'mongoose';

export class BaseController<T extends Document> {
    constructor(private readonly service: BaseService<T>) {}

    getAll = async (req: Request, res: Response): Promise<void> => {
        try{
            const data = await this.service.getAll();
            if(!data) {
                res.status(404).send('Not Found');
                return;
            }
            res.json(data);
        } catch(e){
            res.status(404).json({ message: 'Failed to retrieve item',e});
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try{
            const data = await this.service.getById(req.params.id);
            if (!data){
                res.status(404).send('Not found');
                return;
            } 
            res.json(data);
        } catch(e){
            res.status(500).json({ message: 'Failed to create item', e });
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const created = await this.service.create(req.body as T);
            res.status(201).json(created);
        } catch (e) {
            res.status(500).json({ message: 'Failed to create item', e });
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const updated = await this.service.update(req.params.id, req.body as UpdateQuery<T>);
        if (!updated) {
            res.status(404).send('Not found');
            return;
        }
            res.json(updated);
        } catch (e) {
            res.status(500).json({ message: 'Failed to update item', e });
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const success = await this.service.delete(req.params.id);
            if (!success) {
                res.status(404).send('Not found');
                return;
            }
                res.status(204).send();
            } catch (e) {
                res.status(500).json({ message: 'Failed to delete item', e });
            }
  };
}
