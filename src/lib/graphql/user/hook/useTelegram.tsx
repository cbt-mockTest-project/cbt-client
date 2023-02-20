import { useMutation } from '@apollo/client';
import { SendMessageToAlramChannelOfTelegramInput } from 'types';
import { PUSH_TO_TELEGRAM } from '../query/telegramQuery';
import {
  SendMessageToAlramChannelOfTelegramMutation,
  SendMessageToAlramChannelOfTelegramMutationVariables,
} from '../query/telegramQuery.generated';

export const usePushTelegram = () =>
  useMutation<
    SendMessageToAlramChannelOfTelegramInput,
    SendMessageToAlramChannelOfTelegramMutationVariables
  >(PUSH_TO_TELEGRAM);
