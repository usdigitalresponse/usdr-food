import { FieldError, NestDataObject } from 'react-hook-form';
import { IAppState } from '../store/app';
import { Question, QuestionType } from '../common/types';
import { questionsSelector, useContent } from '../store/cms';
import { useSelector } from 'react-redux';
import CheckboxQuestion from './CheckboxQuestion';
import CheckboxesQuestion from './CheckboxesQuestion';
import React from 'react';
import SelectQuestion from './SelectQuestion';
import TextInputQuestion from './TextInputQuestion';

interface Props {
  register: any;
  errors: NestDataObject<any, FieldError>;
  questionClassName?: string;
  questions: Question[];
  clearError: (name?: string | string[] | undefined) => void
}

const Questions: React.FC<Props> = ({ register, errors, questionClassName, questions, clearError }) => {
  const contentFieldIsRequired = useContent('checkout_field_is_required') || 'Required field';

  return (
    <>
      {questions.map((question) => {
        switch (question.type) {
          case 'Text Input':
            return (
              <TextInputQuestion
                key={question.id}
                question={question}
                errors={errors}
                inputRef={register({
                  required: question.required ? contentFieldIsRequired.replace(/{name}/g, question.label) : undefined,
                })}
                className={questionClassName}
              />
            );
          case 'Single Checkbox':
            return (
              <CheckboxQuestion
                key={question.id}
                question={question}
                errors={errors}
                inputRef={register({
                  required: question.required ? contentFieldIsRequired.replace(/{name}/g, question.label) : undefined,
                })}
                className={questionClassName}
              />
            );
          case 'Multiple Checkboxes':
            return (
              <CheckboxesQuestion
                key={question.id}
                question={question}
                errors={errors}
                inputRef={register}
                className={questionClassName}
                contentFieldIsRequired={contentFieldIsRequired.replace(/{name}/g, question.label)}
                clearError={clearError}
              />
            );
          case 'Select':
            return (
              <SelectQuestion
                key={question.id}
                question={question}
                inputRef={register({
                  required: question.required ? contentFieldIsRequired.replace(/{name}/g, question.label) : undefined,
                })}
                errors={errors}
                className={questionClassName}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default Questions;
