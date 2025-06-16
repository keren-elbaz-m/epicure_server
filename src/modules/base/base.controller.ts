import { Request, Response } from "express";
import { BaseService } from "./base.service";
import { Document, UpdateQuery } from "mongoose";
import { count } from "console";

export class BaseController<T extends Document> {
    constructor(private readonly service: BaseService<T>) {}

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.service.getAll();
            res.status(200).json({
                success: true,
                data,
                count: data.length,
            });
        } catch (e) {
            console.error("Error in getAll:", e);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve data",
                error: e instanceof Error ? e.message : "Unknown error",
            });
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.service.getById(req.params.id);
            if (!data) {
                res.status(404).json({
                    success: false,
                    message: "Item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data,
            });
        } catch (e) {
            console.error("Error in getById:", e);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve item",
                error: e instanceof Error ? e.message : "Unknown error",
            });
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const created = await this.service.create(req.body as T);
            res.status(201).json({
                success: true,
                data: created,
            });
        } catch (e) {
            console.error("Error in create:", e);
            res.status(500).json({
                success: false,
                message: "Failed to create item",
                error: e instanceof Error ? e.message : "Unknown error",
            });
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const updated = await this.service.update(
                req.params.id,
                req.body as UpdateQuery<T>
            );
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: "Item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: updated,
            });
        } catch (e) {
            console.error("Error in update:", e);
            res.status(500).json({
                success: false,
                message: "Failed to update item",
                error: e instanceof Error ? e.message : "Unknown error",
            });
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const success = await this.service.delete(req.params.id);
            if (!success) {
                res.status(404).json({
                    success: false,
                    message: "Item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Item deleted successfully",
            });
        } catch (e) {
            console.error("Error in delete:", e);
            res.status(500).json({
                success: false,
                message: "Failed to delete item",
                error: e instanceof Error ? e.message : "Unexpected error",
            });
        }
    };
}
