import mongoose, { Schema, Document, Types } from "mongoose";
import Joi, { isSchema } from "joi";

const objectId = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
}, "ObjectId Validation");

export interface IChef extends Document {
    _id: mongoose.Types.ObjectId;
    imageUrl: string;
    name: string;
    description: string;
    restaurants: Types.ObjectId[];
    chefOfTheWeek: boolean;
}

export const chefValidationSchema = {
    create: Joi.object({
        imageUrl: Joi.string().uri().required(),
        name: Joi.string().min(2).required(),
        description: Joi.string().min(5).required(),
        restaurants: Joi.array().items(objectId).required(),
        chefOfTheWeek: Joi.boolean().default(false),
    }),

    update: Joi.object({
        imageUrl: Joi.string().uri(),
        name: Joi.string().min(2),
        description: Joi.string().min(5),
        isNewRestaurant: Joi.boolean(),
        isPopular: Joi.boolean(),
        restaurants: Joi.array().items(objectId),
        chefOfTheWeek: Joi.boolean(),
    }),
};

const ChefSchema: Schema = new Schema<IChef>({
    imageUrl: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    restaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
    ],
    chefOfTheWeek: { type: Boolean, default: false },
});
export const ChefModel = mongoose.model<IChef>("Chef", ChefSchema);
