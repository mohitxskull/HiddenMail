import { APIURL } from '../const';
import Fetcher from '../helper/Fetcher';
import { MailBodyObjectType, MailListObjectType } from '../types/world';

const SecMail = {
  GenRandomMail: async ({
    count: COUNT = 1,
  }: {
    count?: number;
  }): Promise<string[]> => {
    const FetchRes = await Fetcher(
      `${APIURL}/?action=genRandomMailbox&count=${COUNT}`
    );

    return FetchRes;
  },

  GetDomainList: async (): Promise<string[]> => {
    const FetchRes = await Fetcher(`${APIURL}/?action=getDomainList`);

    return FetchRes;
  },

  GetMailList: async (EMAIL: string): Promise<MailListObjectType[]> => {
    const FetchRes = await Fetcher(
      `${APIURL}/?action=getMessages&login=${EMAIL.split('@')[0]}&domain=${
        EMAIL.split('@')[1]
      }`
    );

    return FetchRes;
  },

  GetMail: async ({
    email: EMAIL,
    id: MAILID,
  }: {
    email: string;
    id: number;
  }): Promise<MailBodyObjectType> => {
    const FetchRes = await Fetcher(
      `${APIURL}/?action=readMessage&login=${EMAIL.split('@')[0]}&domain=${
        EMAIL.split('@')[1]
      }&id=${MAILID}`
    );

    return FetchRes;
  },

  GetAttachment: async ({
    login: LOGIN,
    domain: DOMAIN,
    id: MAILID,
    file: FILE,
  }: {
    login: string;
    domain: string;
    id: string;
    file: string;
  }): Promise<string[]> => {
    const FetchRes = await Fetcher(
      `${APIURL}/?action=download&login=${LOGIN}&domain=${DOMAIN}&id=${MAILID}&file=${FILE}`
    );

    return FetchRes;
  },
};

export default SecMail;
