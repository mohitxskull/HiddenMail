import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '../styles/world.css';
import { WorldProvider } from '../lib/context/World';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>HiddenMail</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <meta
          name="description"
          content="Get temp mail and keep your inbox free from spam mails!"
        />
      </Head>

      <WorldProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            primaryColor: 'dark',
            white: '#fffcf4',
            black: '#222222',
            fontFamily: 'Archiv-o, sans-serif',
            headings: { fontFamily: '"Apercu-b",sans-serif' },
            other: {
              light: '#fffcf4',
              dark: '#222222',
            },
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </WorldProvider>
    </>
  );
}
