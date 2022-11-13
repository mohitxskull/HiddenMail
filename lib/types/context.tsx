import { Dispatch, SetStateAction } from 'react';
import { MailListObjectType, ScreenStatesType } from './world';

export interface WorldContextTypes {
  ScreenState: ScreenStatesType;
  LoadingCounter: number;
  Email: string;
  GettingMailList: boolean;
  MailList: MailListObjectType[];
  DomainList: string[];
  MailIdToView: number | null;
  AlertTxt: string | null;

  // ================================

  setMailIdToView: Dispatch<SetStateAction<number | null>>;
  setAlertTxt: Dispatch<SetStateAction<string | null>>;
  setScreenState: Dispatch<SetStateAction<ScreenStatesType>>;

  // ================================

  GenerateEmail: () => Promise<void>;
  UpdateMailBox: (EMAIL?: string) => Promise<void>;
}
