/* eslint-disable react-hooks/exhaustive-deps */
import { useInterval, useListState } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { WorldContextTypes } from '../types/context';
import { MailListObjectType } from '../types/world';
import SecMail from '../wrapper/SecMail.wrapper';
import { createGenericContext } from './CreateContext';

const [useWorldContext, WorldContextProvider] =
  createGenericContext<WorldContextTypes>();

const WorldProvider = ({ children }: { children: React.ReactNode }) => {
  const [ScreenState, setScreenState] = useState<'loading' | 'home' | 'mail'>(
    'loading'
  );

  const [LoadingCounter, setLoadingCounter] = useState(0);

  const LoadingInterval = useInterval(
    () =>
      setLoadingCounter(
        (s) => s + (Math.floor(Math.random() * (50 - 10 + 1)) + 10)
      ),
    1000
  );

  useEffect(() => {
    if (LoadingCounter > 100) {
      LoadingInterval.stop();
      setScreenState('home');
    }
  }, [LoadingCounter]);

  //----------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------

  const [GettingMailList, setGettingMailList] = useState(true);

  const [Email, setEmail] = useState('');

  const [MailList, MailListHandler] = useListState<MailListObjectType>([]);

  const [DomainList, DomainListHandler] = useListState<string>([]);

  const [MailIdToView, setMailIdToView] = useState<number | null>(null);

  const [AlertTxt, setAlertTxt] = useState<string | null>(null);

  // =============================================================================================

  const UpdateMailBox = async (EMAIL: string = Email) => {
    setGettingMailList(true);

    const MailListRes = await SecMail.GetMailList(EMAIL);

    MailListHandler.setState(MailListRes);

    setGettingMailList(false);
  };

  const GenerateEmail = async () => {
    SecMail.GenRandomMail({}).then((EMAIL) => {
      setEmail(EMAIL[0]);
      UpdateMailBox(EMAIL[0]);
    });
  };

  const UpdateMailBoxInterval = useInterval(() => UpdateMailBox(), 5000);

  useEffect(() => {
    LoadingInterval.start();

    SecMail.GetDomainList().then((DOMAINLIST) =>
      DomainListHandler.setState(DOMAINLIST)
    );

    GenerateEmail();

    return () => {
      LoadingInterval.stop();
    };
  }, []);

  useEffect(() => {
    UpdateMailBoxInterval.start();

    return () => {
      UpdateMailBoxInterval.stop();
    };
  }, [Email]);

  //----------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------

  return (
    <WorldContextProvider
      value={{
        ScreenState,
        LoadingCounter,
        Email,
        GettingMailList,
        MailList,
        DomainList,
        MailIdToView,
        AlertTxt,

        setMailIdToView,
        setScreenState,
        setAlertTxt,

        GenerateEmail,
        UpdateMailBox,
      }}
    >
      {children}
    </WorldContextProvider>
  );
};

export { useWorldContext, WorldProvider };
