import { Model, Schema } from "mongoose";
import { ModelsName } from "../const/modelsName";

const QuestionTypeSchema = new Schema(
  {
    typeName: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    versionKey: false
  }
);

export const QuestionTypeModel = new Model(ModelsName.QUESTION_TYPE_MODEL, QuestionTypeSchema);
