'use client';

import { FC, PropsWithChildren } from 'react';

import Head from 'next/head';

import { NavBar } from '../ui';

interface Props extends PropsWithChildren {
  title?: string;
  name?: string;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<Props> = ({ title, name, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Ángel Cuervo'></meta>
        <meta
          name='description'
          content={`Encuentra información sobre ${name || 'Pokemons'} en Pokemon App` }
        ></meta>
        <meta
          name='keywords'
          content={`pokemon, pokedex, anime, manga, ${name || 'pokemons'}`}
        ></meta>
        <meta property='og:title' content={`Información sobre ${name || 'Pokemons'}`}/>
        <meta
          property='og:description'
          content={`Encuentra información sobre ${name || 'Pokemons'} en Pokemon App` }
        />
        <meta property='og:image' content={`${origin}/img/banner.png`} />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={`${origin}/apple-touch-icon.png`}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={`${origin}/favicon-32x32.png`}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={`${origin}/favicon-16x16.png`}
        />
        <link rel='manifest' href={`${origin}/site.webmanifest`} />
        <link rel='mask-icon' href={`${origin}/safari-pinned-tab.svg`} color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <NavBar />
      <main style={{ padding: '0px 20px' }}>{children}</main>
    </>
  );
};
