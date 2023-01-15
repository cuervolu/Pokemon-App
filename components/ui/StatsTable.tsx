import { Progress, Table, Tooltip } from '@nextui-org/react';
import { Pokemon, Stat } from '../../interfaces';

interface Props {
  stats: Stat[];
}

export const StatsTable = ({ stats }: Props) => {
  return (
    <Table
      sticked
      aria-label='Estadísticas'
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
      lined
      headerLined
      selectionMode='single'
      striped
    >
      <Table.Header>
        <Table.Column>ESTADÍSTICA BASE</Table.Column>
        <Table.Column>ESFUERZO</Table.Column>
        <Table.Column>ESTADÍSTICA</Table.Column>
      </Table.Header>
      <Table.Body>
        {stats.map((poke, i) => (
          <Table.Row key={i}>
            <Table.Cell>{poke.base_stat}</Table.Cell>
              <Table.Cell>
                <Progress
                  color='gradient'
                  shadow
                  value={poke.effort}
                  min={0}
                  max={10}
                />
              </Table.Cell>
            <Table.Cell>{poke.stat.name.toLocaleUpperCase()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination shadow noMargin align='center' rowsPerPage={5} />
    </Table>
  );
};
