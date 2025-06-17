import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

export interface IDish extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    imageUrl: string;
    price: number;
    ingredients: string[];
    type: {
        name: string;
        iconUrl: string;
    };
}

export const dishValidationSchema = {
    create: Joi.object({
        name: Joi.string().min(2).required(),
        imageUrl: Joi.string().uri().required(),
        price: Joi.number().positive().required(),
        ingredients: Joi.array().items(Joi.string().min(1)).required(),
        type: Joi.object({
            name: Joi.string().required(),
            iconUrl: Joi.string().uri().required(),
        }).required(),
    }),

    update: Joi.object({
        name: Joi.string().min(2),
        imageUrl: Joi.string().uri(),
        price: Joi.number().positive(),
        ingredients: Joi.array().items(Joi.string().min(1)),
        type: Joi.object({
            name: Joi.string(),
            iconUrl: Joi.string().uri(),
        }),
    }).min(1),
};

const dishSchema: Schema = new Schema<IDish>(
    {
        name: { type: String, required: true, unique: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        ingredients: { type: [String], required: true },
        type: {
            name: { type: String, required: true },
            iconUrl: { type: String, required: true },
        },
    },
    { timestamps: true }
);

export const DishModel = mongoose.model<IDish>("Dish", dishSchema);
