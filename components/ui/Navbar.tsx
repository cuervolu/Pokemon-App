'use client';

import { Link as NUI, Navbar, Text } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <Navbar isBordered variant='sticky' maxWidth='fluid'>
      <Navbar.Toggle showIn='xs' />
      <Navbar.Brand
        css={{
          '@xs': {
            w: '12%',
          },
        }}
      >
        <Link href='/' passHref legacyBehavior>
          <Image
            src={
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/447.png'
            }
            alt='Icono de la aplicación'
            width={70}
            height={70}
          />
        </Link>
        <Link href='/' passHref legacyBehavior>
          <NUI>
            <Text b color='white' hideIn='xs' h2>
              P
            </Text>
            <Text color='white' hideIn='xs' h3>
              okémon
            </Text>
          </NUI>
        </Link>
      </Navbar.Brand>
      <Navbar.Content hideIn='xs' enableCursorHighlight variant='underline'>
        <Link href='/favorites' passHref legacyBehavior>
          <Navbar.Link>Favoritos</Navbar.Link>
        </Link>
      </Navbar.Content>
      <Navbar.Collapse>
        <Navbar.CollapseItem activeColor='warning'>
          <Link href='/favorites' passHref legacyBehavior>
            <NUI
              color='inherit'
              style={{
                minWidth: '100%',
              }}
              href='/favorites'
            >
              Favoritos
            </NUI>
          </Link>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
};
