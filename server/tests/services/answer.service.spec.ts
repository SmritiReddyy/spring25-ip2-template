import QuestionModel from '../../models/questions.model';
import { saveAnswer, addAnswerToQuestion } from '../../services/answer.service';
import { Answer, Question } from '../../types/types';
import { QUESTIONS, ans1, ans4 } from '../mockData.models';

const mockingoose = require('mockingoose');

describe('Answer model', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });
  describe('saveAnswer', () => {
    test('saveAnswer should return the saved answer', async () => {
      const mockAnswer = {
        text: 'This is a test answer',
        ansBy: 'dummyUserId',
        ansDateTime: new Date('2024-06-06'),
        comments: [],
      };

      const result = (await saveAnswer(mockAnswer)) as Answer;

      expect(result._id).toBeDefined();
      expect(result.text).toEqual(mockAnswer.text);
      expect(result.ansBy).toEqual(mockAnswer.ansBy);
      expect(result.ansDateTime).toEqual(mockAnswer.ansDateTime);
    });
  });

  describe('addAnswerToQuestion', () => {
    test('addAnswerToQuestion should return the updated question', async () => {
      const question = QUESTIONS.filter(
        q => q._id && q._id.toString() === '65e9b5a995b6c7045a30d823',
      )[0];
      (question.answers as Answer[]).push(ans4);
      jest.spyOn(QuestionModel, 'findOneAndUpdate').mockResolvedValueOnce(question);

      const result = (await addAnswerToQuestion('65e9b5a995b6c7045a30d823', ans1)) as Question;

      expect(result.answers.length).toEqual(4);
      expect(result.answers).toContain(ans4);
    });

    test('addAnswerToQuestion should return an object with error if findOneAndUpdate throws an error', async () => {
      mockingoose(QuestionModel).toReturn(new Error('error'), 'findOneAndUpdate');

      const result = await addAnswerToQuestion('65e9b5a995b6c7045a30d823', ans1);

      if (result && 'error' in result) {
        expect(true).toBeTruthy();
      } else {
        expect(false).toBeTruthy();
      }
    });

    test('addAnswerToQuestion should return an object with error if findOneAndUpdate returns null', async () => {
      mockingoose(QuestionModel).toReturn(null, 'findOneAndUpdate');

      const result = await addAnswerToQuestion('65e9b5a995b6c7045a30d823', ans1);

      if (result && 'error' in result) {
        expect(true).toBeTruthy();
      } else {
        expect(false).toBeTruthy();
      }
    });

    test('addAnswerToQuestion should throw an error if a required field is missing in the answer', async () => {
      const invalidAnswer: Partial<Answer> = {
        text: 'This is an answer text',
        ansBy: 'user123', // Missing ansDateTime
      };

      const qid = 'validQuestionId';

      try {
        await addAnswerToQuestion(qid, invalidAnswer as Answer);
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(Error);
        if (err instanceof Error) expect(err.message).toBe('Invalid answer');
      }
    });
  });
});
