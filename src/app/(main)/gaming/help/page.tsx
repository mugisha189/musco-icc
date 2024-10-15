'use client';
import GamingLayout from '@/layouts/GamingLayout';
import { List } from '@mantine/core';

import { ScrollArea, Table } from '@mantine/core';

import { Accordion, Container, Title } from '@mantine/core';

const FantasyHelpPage = () => {
  const data = [
    {
      action: 'Man of The Match',
      bonusPoint: 10,
    },
    {
      action: 'Highest scoring player (Basketball)',
      bonusPoint: 10,
    },
    {
      action: 'First Team to Score (Football)',
      bonusPoint: 6,
    },
    {
      action: 'Away score ',
      bonusPoint: '6 ( 4 in volleyball)',
    },
    {
      action: 'Home score',
      bonusPoint: '6  ( 4 in volleyball)',
    },
    {
      action: 'Match Outcome Prediction (Winner, Draw)',
      bonusPoint: 5,
    },
    {
      action: 'Bonus Point for correct home and away score (High Precision 🙌)',
      bonusPoint: 3,
    },
  ];
  const pointsData = [
    {
      pointsAway: 'Exact score',
      scoreDifference: 6,
    },
    {
      pointsAway: '1 point away',
      scoreDifference: 4,
    },
    {
      pointsAway: '2 point away',
      scoreDifference: 3,
    },
    {
      pointsAway: '3 point away',
      scoreDifference: 2,
    },
    {
      pointsAway: '4 point away',
      scoreDifference: 1,
    },
  ];

  const rows = data.map((row) => (
    <Table.Tr key={row.action}>
      <Table.Td>{row.action}</Table.Td>
      <Table.Td>{row.bonusPoint}</Table.Td>
    </Table.Tr>
  ));
  const listRows = pointsData.map((row) => (
    <Table.Tr key={row.pointsAway}>
      <Table.Td>{row.pointsAway}</Table.Td>
      <Table.Td>{row.scoreDifference}</Table.Td>
    </Table.Tr>
  ));
  return (
    <GamingLayout title="Fantasy - Help" isGeneral>
      <div className="p-6">
        <h1 className="font-bold text-3xl">Help</h1>
        <Container size="sm" className="">
          <Title ta="center" className="">
            FAQs
          </Title>

          <Accordion variant="separated" className="mt-4">
            <Accordion.Item className="" value="scoring">
              <Accordion.Control>Score allocation</Accordion.Control>
              <Accordion.Panel>
                <ScrollArea h={200}>
                  <Table miw={600}>
                    <Table.Thead className="">
                      <Table.Tr>
                        <Table.Th>Action</Table.Th>
                        <Table.Th>Points</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                  <h1 className=" text-sm mt-5">
                    <strong className="mr-2">Note:</strong>
                    home/Away Score (sets) in volleyball is 4 points because the score is not as high as football or
                    basketball. So it is easy to predict sets in volleyball
                  </h1>
                </ScrollArea>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className="" value="rules">
              <Accordion.Control>Rules</Accordion.Control>
              <Accordion.Panel>
                <List type="ordered" withPadding listStyleType="disc">
                  <List.Item>
                    First Login using your <span className="font-bold">RCA-MIS</span> credentials for identification
                  </List.Item>
                  <List.Item>
                    You can check your ranking on the ICC predictor by checking the{' '}
                    <span className="font-bold">Standings</span> page on your sidebar
                  </List.Item>
                  <List.Item>You are allowed to update your prediction once the match has not started yet</List.Item>
                  <List.Item>No predictions will be made once the match has started</List.Item>
                  <List.Item>
                    Concerning Basketball score points allocation the points will be allocated as follows:
                    <ScrollArea h={200}>
                      <Table miw={600}>
                        <Table.Thead className="">
                          <Table.Tr>
                            <Table.Th>Points away from score</Table.Th>
                            <Table.Th>Points allocated</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{listRows}</Table.Tbody>
                      </Table>
                    </ScrollArea>
                  </List.Item>
                </List>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className="" value="awards">
              <Accordion.Control>Awards</Accordion.Control>
              <Accordion.Panel>
                At the end of the 2024 ICC the winner of the ICC predictor will be awarded in the closing ceremony, and
                will be called upon with the winning teams celebrations.
                <span className="font-bold">Predict and shine</span>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </GamingLayout>
  );
};

export default FantasyHelpPage;
