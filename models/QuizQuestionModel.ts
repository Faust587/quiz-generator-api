import { Model, Schema } from "mongoose";
import { ModelsName } from "../const/modelsName";

const QuizQuestionSchema = new Schema(
  {
    typeId: {
      type: Schema.Types.ObjectId,
      ref: "Question Type",
      required: true
    },
    questionStructureId: {
      type: Schema.Types.ObjectId,
      ref: ModelsName.QUESTION_STRUCTURE_MODEL,
      required: true
    }
  },
  {
    versionKey: false
  }
);


export const QuizQuestionModel = new Model(ModelsName.QUIZ_QUESTION_MODEL, QuizQuestionSchema);
