import QuestionModel from '../../models/questions.model';
import { saveComment, addComment } from '../../services/comment.service';
import { Answer, Question, Comment } from '../../types/types';
import AnswerModel from '../../models/answers.model';
import { QUESTIONS, ans1, com1 } from '../mockData.models';

const mockingoose = require('mockingoose');

describe('Comment model', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });
  describe('saveComment', () => {
    test('saveComment should return the saved comment', async () => {
      const result = (await saveComment(com1)) as Comment;

      expect(result._id).toBeDefined();
      expect(result.text).toEqual(com1.text);
      expect(result.commentBy).toEqual(com1.commentBy);
      expect(result.commentDateTime).toEqual(com1.commentDateTime);
    });
  });

  describe('addComment', () => {
    test('addComment should return the updated question when given `question`', async () => {
      // copy the question to avoid modifying the original
      const question = { ...QUESTIONS[0], comments: [com1] };
      mockingoose(QuestionModel).toReturn(question, 'findOneAndUpdate');

      const result = (await addComment(
        question._id?.toString() as string,
        'question',
        com1,
      )) as Question;

      expect(result.comments.length).toEqual(1);
      expect(result.comments).toContain(com1._id);
    });

    test('addComment should return the updated answer when given `answer`', async () => {
      // copy the answer to avoid modifying the original
      const answer: Answer = { ...ans1 };
      (answer.comments as Comment[]).push(com1);
      mockingoose(AnswerModel).toReturn(answer, 'findOneAndUpdate');

      const result = (await addComment(answer._id?.toString() as string, 'answer', com1)) as Answer;

      expect(result.comments.length).toEqual(1);
      expect(result.comments).toContain(com1._id);
    });

    test('addComment should return an object with error if findOneAndUpdate throws an error', async () => {
      const question = QUESTIONS[0];
      mockingoose(QuestionModel).toReturn(
        new Error('Error from findOneAndUpdate'),
        'findOneAndUpdate',
      );
      const result = await addComment(question._id?.toString() as string, 'question', com1);
      expect(result).toEqual({ error: 'Error when adding comment: Error from findOneAndUpdate' });
    });

    test('addComment should return an object with error if findOneAndUpdate returns null', async () => {
      const answer: Answer = { ...ans1 };
      mockingoose(AnswerModel).toReturn(null, 'findOneAndUpdate');
      const result = await addComment(answer._id?.toString() as string, 'answer', com1);
      expect(result).toEqual({ error: 'Error when adding comment: Failed to add comment' });
    });

    test('addComment should throw an error if a required field is missing in the comment', async () => {
      const invalidComment: Partial<Comment> = {
        text: 'This is an answer text',
        commentBy: 'user123', // Missing commentDateTime
      };

      const qid = 'validQuestionId';

      try {
        await addComment(qid, 'question', invalidComment as Comment);
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(Error);
        if (err instanceof Error) expect(err.message).toBe('Invalid comment');
      }
    });
  });
});
