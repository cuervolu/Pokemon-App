import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Image,
  Text,
} from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';
import pokeApi from '../../api/pokeApi';
import { Pokemon } from '../../interfaces';
import { MovesTable, StatsTable } from '../../components/ui';
import { getPokemonInfo, localFavorites } from '../../utils';
import { PokeAPIResponse } from '../../interfaces/pokemon-list';

interface Props {
  pokemon: Pokemon;
}

type Colors =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';

export default function PokemonByNamePage({ pokemon }: Props) {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
  }, [pokemon.id]);

  const colors: Colors[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
  ];

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  const capitalize = (): string => {
    return (
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()
    );
  };

  return (
    <Layout title={`${capitalize()} - Pokemon App`} name={capitalize()}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                width='100%'
                height={200}
              />
              <StatsTable stats={pokemon.stats} />
            </Card.Body>
            <Card.Footer>
              {pokemon.abilities.map((poke, i) => (
                <Badge
                  key={i}
                  color={colors[Math.floor(Math.random() * colors.length)]}
                >
                  {poke.ability.name}
                </Badge>
              ))}
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>
              <Button
                color='gradient'
                bordered={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text h4>Experiencia Base: {pokemon.base_experience}</Text>
              <Text h6>Peso: {pokemon.weight}hg</Text>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
              <MovesTable moves={pokemon.moves} />
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokeAPIResponse>('/pokemon?limit=500');
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};
