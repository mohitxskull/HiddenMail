import React from 'react';
import { Center, Progress, SimpleGrid, Title } from '@mantine/core';
import { NextPage } from 'next';
import { useWorldContext } from '../lib/context/World';
import Home from '../component/Home/Home';
import MailViewer from '../component/MailViewer/MailViewer';
import { SkullFooter } from '../component/Footer';

const Index: NextPage = () => {
  const { LoadingCounter, ScreenState } = useWorldContext();

  return (
    <>
      <div className="layout">
        <div className="row content">
          {ScreenState === 'loading' && (
            <Center style={{ height: '100%' }}>
              <SimpleGrid spacing={0}>
                <Title>Hidden Mail</Title>

                <Progress size="xs" color="dark" value={LoadingCounter} />
              </SimpleGrid>
            </Center>
          )}

          <Center mt={200} mb={100}>
            {ScreenState === 'home' && <Home />}

            {ScreenState === 'mail' && <MailViewer />}
          </Center>
        </div>

        <div className="row footer">
          {ScreenState !== 'loading' && <SkullFooter />}
        </div>
      </div>
    </>
  );
};

export default Index;
