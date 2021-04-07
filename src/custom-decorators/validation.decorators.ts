import { isValidObjectId } from 'mongoose';
import { buildMessage, ValidateBy } from 'class-validator';

export const IsObjectId = (validationOptions?) => {
  return ValidateBy(
    {
      name: 'isObjectId',
      validator: {
        validate: (value) => isValidObjectId(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a BSON objectId',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
};
