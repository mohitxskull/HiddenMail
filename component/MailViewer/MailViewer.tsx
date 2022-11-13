import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Mark,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import HTMLReactParser from 'html-react-parser';
import { useWorldContext } from '../../lib/context/World';
import SecMail from '../../lib/wrapper/SecMail.wrapper';
import { MailBodyObjectType } from '../../lib/types/world';
import useOwnMedia from '../../lib/hooks/useOwnMedia';

const MailViewer = () => {
  const {
    Email,
    MailIdToView,

    setMailIdToView,
    setScreenState,
  } = useWorldContext();

  const { BigThan540 } = useOwnMedia();

  const [MailBody, setMailBody] = useState<MailBodyObjectType | null>(null);

  const GetMail = async (EMAIL: string = Email) => {
    if (MailIdToView && EMAIL) {
      const GetMailRes = await SecMail.GetMail({
        email: EMAIL,
        id: MailIdToView,
      });

      setMailBody(GetMailRes);

      console.info(GetMailRes);
    }
  };

  useEffect(() => {
    GetMail();
  }, []);

  return (
    <>
      <Paper
        style={{
          minWidth: '400px',
          maxWidth: '700px',
          width: '100%',
          height: '50%',
        }}
        mx="md"
      >
        <SimpleGrid spacing="xs">
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Title style={{ flexShrink: 1 }}>Mail Viewer</Title>

            <Divider mt={6} ml="xs" style={{ flexGrow: 1 }} />
          </Box>
          <Group position="apart">
            <Text weight="bold">
              {MailBody ? MailBody?.date : 'Loading...'}
            </Text>

            <Button
              compact
              onClick={() => {
                setMailIdToView(null);
                setScreenState('home');
              }}
            >
              Back
            </Button>
          </Group>

          {MailBody && (
            <>
              <Group>
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: BigThan540 ? '500px' : '400px',
                  }}
                  weight="bold"
                >
                  <Mark>From:</Mark> {MailBody?.from}
                </Text>
              </Group>

              <Group>
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: BigThan540 ? '500px' : '400px',
                  }}
                  weight="bold"
                >
                  <Mark>Sub:</Mark> {MailBody?.subject}
                </Text>
              </Group>
            </>
          )}

          <Card withBorder p="md" mt="xs">
            {MailBody ? (
              HTMLReactParser(MailBody.htmlBody)
            ) : (
              <Center my="xl">
                <Loader variant="dots" size={20} />
              </Center>
            )}
          </Card>
        </SimpleGrid>
      </Paper>
    </>
  );
};

export default MailViewer;
