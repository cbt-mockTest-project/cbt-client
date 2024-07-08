import * as Types from '../../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SendMessageToAlramChannelOfTelegramMutationVariables = Types.Exact<{
  input: Types.SendMessageToAlramChannelOfTelegramInput;
}>;


export type SendMessageToAlramChannelOfTelegramMutation = { __typename?: 'Mutation', sendMessageToAlramChannelOfTelegram: { __typename?: 'SendMessageToAlramChannelOfTelegramOutput', error?: string | null, ok: boolean } };


export const SendMessageToAlramChannelOfTelegramDocument = gql`
    mutation SendMessageToAlramChannelOfTelegram($input: SendMessageToAlramChannelOfTelegramInput!) {
  sendMessageToAlramChannelOfTelegram(input: $input) {
    error
    ok
  }
}
    `;

export function useSendMessageToAlramChannelOfTelegramMutation() {
  return Urql.useMutation<SendMessageToAlramChannelOfTelegramMutation, SendMessageToAlramChannelOfTelegramMutationVariables>(SendMessageToAlramChannelOfTelegramDocument);
};