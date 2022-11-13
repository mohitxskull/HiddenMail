import React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Paper,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { At, Mailbox } from 'tabler-icons-react';
import { useClipboard } from '@mantine/hooks';
import { useWorldContext } from '../../lib/context/World';
import useOwnMedia from '../../lib/hooks/useOwnMedia';

const Home = () => {
  const {
    GettingMailList,
    MailList,
    DomainList,
    Email,
    AlertTxt,

    GenerateEmail,
    UpdateMailBox,

    setMailIdToView,
    setScreenState,
    setAlertTxt,
  } = useWorldContext();

  const theme = useMantineTheme();

  const EmailClipboard = useClipboard({ timeout: 500 });

  const { BigThan540 } = useOwnMedia();

  return (
    <>
      <Paper
        style={{
          minWidth: '400px',
          maxWidth: '600px',
          width: '100%',
          height: '50%',
        }}
        mx="md"
      >
        <SimpleGrid>
          {AlertTxt && (
            <Alert
              color="red"
              withCloseButton
              onClose={() => setAlertTxt(null)}
            >
              {AlertTxt}
            </Alert>
          )}

          <Box style={{ display: 'flex' }}>
            <TextInput
              style={{
                backgroundColor: '#e6e3dc',
                borderRadius: '4px',
                flexGrow: 1,
              }}
              px="xs"
              variant="unstyled"
              placeholder="0htzyr02te"
              readOnly
              value={Email.split('@')[0]}
            />
            <Box style={{ flexShrink: 1 }} mx="xs" mt="xs">
              <At size={18} />
            </Box>
            <Select
              placeholder="Domains"
              px="xs"
              variant="unstyled"
              style={{
                backgroundColor: '#e6e3dc',
                borderRadius: '4px',
                flexGrow: 1,
              }}
              readOnly
              value={Email.split('@')[1]}
              data={DomainList}
            />
          </Box>

          <Group grow spacing="xs">
            <Button variant="outline" onClick={GenerateEmail}>
              Generate
            </Button>
            <Button variant="outline" onClick={() => UpdateMailBox()}>
              Refresh
            </Button>
            <Button
              variant="filled"
              onClick={() => {
                EmailClipboard.copy(Email);

                if (EmailClipboard.error) {
                  setAlertTxt(EmailClipboard.error.toString());
                }
              }}
            >
              {EmailClipboard.copied ? 'Copied' : 'Copy'}
            </Button>
          </Group>

          <SimpleGrid mt="md" style={{ userSelect: 'none' }}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Title style={{ flexShrink: 1 }}>Mail Box</Title>

              <Divider mt={6} ml="xs" style={{ flexGrow: 1 }} />
            </Box>

            <SimpleGrid spacing={3}>
              <Card
                p="sm"
                px="xs"
                style={{
                  border: `1px solid ${theme.other.dark}`,
                  width: '100%',
                  userSelect: 'none',
                }}
              >
                {MailList.length > 0 ? (
                  <>
                    <SimpleGrid>
                      {React.Children.toArray(
                        MailList.map((MAILOBJ) => (
                          <Card
                            p={3}
                            px="xs"
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: theme.other.dark,
                                color: theme.other.light,
                              },
                            }}
                            onClick={() => {
                              setMailIdToView(MAILOBJ.id);
                              setScreenState('mail');
                            }}
                          >
                            <SimpleGrid spacing={2}>
                              <Group position="apart">
                                <Text
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '200px',
                                  }}
                                  weight="bold"
                                >
                                  {MAILOBJ.from}
                                </Text>

                                <Text size="sm" weight="bold">
                                  {MAILOBJ.date.substring(5)}
                                </Text>
                              </Group>

                              <Text
                                style={{
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxWidth: BigThan540 ? '400px' : '300px',
                                }}
                                size="sm"
                              >
                                {MAILOBJ.subject}
                              </Text>
                            </SimpleGrid>
                          </Card>
                        ))
                      )}
                    </SimpleGrid>
                  </>
                ) : (
                  <Center style={{ minHeight: '100px' }}>
                    <SimpleGrid spacing={5} style={{ justifyItems: 'center' }}>
                      <Mailbox />
                      <Text weight="bold" size="sm">
                        Mailbox is empty
                      </Text>
                    </SimpleGrid>
                  </Center>
                )}
              </Card>

              <Group spacing="xs">
                <Text size="xs">
                  Mailbox content is refreshed automatically every 5 seconds
                </Text>

                {GettingMailList && <Loader variant="dots" size={20} />}
              </Group>
            </SimpleGrid>
          </SimpleGrid>
        </SimpleGrid>
      </Paper>
    </>
  );
};

export default Home;
