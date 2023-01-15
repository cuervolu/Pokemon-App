import { Table } from '@nextui-org/react';
import { Move, Pokemon } from '../../interfaces';

interface Props {
  moves: Move[];
}

export const MovesTable = ({ moves }: Props) => {
  return (
    <Table
      sticked
      aria-label='Tabla de Habilidades'
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
        <Table.Column>HABILIDADES</Table.Column>
        <Table.Column>MÉTODO DE APRENDIZAJE DE MOVIMIENTO</Table.Column>
      </Table.Header>
      <Table.Body>
        {moves.map((m, i) => (
          <Table.Row key={i}>
            <Table.Cell>{m.move.name.toLocaleUpperCase()}</Table.Cell>
            <Table.Cell>
              {m.version_group_details[0].move_learn_method.name.toLocaleUpperCase()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination shadow noMargin align='center' rowsPerPage={5} />
    </Table>
  );
};
