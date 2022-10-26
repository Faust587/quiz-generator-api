import { model, Schema } from "mongoose";
import { ModelsName } from "../const/modelsName";

const QuizSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelsName.USER_MODEL,
      required: true,
      unique: true
    },
    quizCode: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: false
    },
    questionsIds: {
      type: [ {
        type: Schema.Types.ObjectId,
        ref: ModelsName.QUIZ_QUESTION_MODEL
      } ],
      required: true
    }
  }
);

export const QuizModel = model(ModelsName.QUIZ_MODEL, QuizSchema);
