import { gql } from '@apollo/client';

export const PUSH_TO_TELEGRAM = gql`
  mutation SendMessageToAlramChannelOfTelegram(
    $input: SendMessageToAlramChannelOfTelegramInput!
  ) {
    sendMessageToAlramChannelOfTelegram(input: $input) {
      error
      ok
    }
  }
`;
