import { Model, Schema } from "mongoose";
import { ModelsName } from "../const/modelsName";

const QuestionStructureSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true
    },
    variants: {
      type: [ String ],
      required: true
    }
  }
);

export const QuestionStructureModel = new Model(ModelsName.QUESTION_STRUCTURE_MODEL, QuestionStructureSchema);
