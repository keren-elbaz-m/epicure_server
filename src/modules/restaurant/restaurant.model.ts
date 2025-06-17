import mongoose, { Schema, Types, Document } from "mongoose";
import Joi from "joi";

export interface IRestaurant extends Document {
    _id: mongoose.Types.ObjectId;
    imageUrl: string;
    name: string;
    chefName: string;
    isOpen: boolean;
    rating: number;
    isNewRestaurant: boolean;
    isPopular: boolean;
    priceRange: {
        min: number;
        max: number;
    };
    menu: {
        breakfast: Types.ObjectId[];
        lunch: Types.ObjectId[];
        dinner: Types.ObjectId[];
    };
}

export const restaurantValidationSchema = {
    create: Joi.object({
        imageUrl: Joi.string().uri().required(),
        name: Joi.string().required(),
        chefName: Joi.string().required(),
        isOpen: Joi.boolean().default(true),
        rating: Joi.number().min(0).max(5).required(),
        isNewRestaurant: Joi.boolean().default(true),
        isPopular: Joi.boolean().default(false),
        priceRange: Joi.object({
            min: Joi.number().required(),
            max: Joi.number().required(),
        }).required(),
        menu: Joi.object({
            breakfast: Joi.array().items(Joi.string()).default([]),
            lunch: Joi.array().items(Joi.string()).default([]),
            dinner: Joi.array().items(Joi.string()).default([]),
        }).default({}),
    }),

    update: Joi.object({
        imageUrl: Joi.string().uri(),
        name: Joi.string(),
        chefName: Joi.string(),
        isOpen: Joi.boolean(),
        rating: Joi.number().min(0).max(5),
        isNewRestaurant: Joi.boolean(),
        isPopular: Joi.boolean(),
        priceRange: Joi.object({
            min: Joi.number(),
            max: Joi.number(),
        }),
        menu: Joi.object({
            breakfast: Joi.array().items(Joi.string()),
            lunch: Joi.array().items(Joi.string()),
            dinner: Joi.array().items(Joi.string()),
        }),
    }).min(1),
};

const RestaurantSchema: Schema = new Schema<IRestaurant>(
    {
        imageUrl: { type: String, required: true },
        name: { type: String, required: true, unique: true },
        chefName: { type: String, required: true },
        isOpen: { type: Boolean, default: true },
        rating: { type: Number, min: 0, max: 5 },
        isNewRestaurant: { type: Boolean, default: true },
        isPopular: { type: Boolean, default: false },
        priceRange: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
        },
        menu: {
            type: {
                breakfast: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
                ],
                lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
                dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
            },
            default: () => ({ breakfast: [], lunch: [], dinner: [] }),
        },
    },
    { timestamps: true }
);

export const RestaurantModel = mongoose.model<IRestaurant>(
    "Restaurant",
    RestaurantSchema
);
