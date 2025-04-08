import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Heading,
  HStack,
  Card,
  CardBody,
  useColorModeValue,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Регистрируем компоненты ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CampaignAnalytics = () => {
  // Данные кампании
  const campaignData = {
    name: "Летняя распродажа",
    totalCalls: 1248,
    leads: 342,
    answered: 876,
    dropped: 372,
  };

  // Цвета для светлой/темной темы
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  // Данные для гистограммы
  const chartData = {
    labels: ["Всего звонков", "Лиды", "Ответили", "Сбросили"],
    datasets: [
      {
        label: "Количество",
        data: [
          campaignData.totalCalls,
          campaignData.leads,
          campaignData.answered,
          campaignData.dropped,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 200,
        },
      },
    },
  };

  return (
    <Box p={1} marginTop={"20px"}>
      <HStack
        spacing={6}
        align="stretch"
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* Таблица с аналитикой */}
        <Card flex={1} bg={cardBg}>
          <CardBody>
            <Text
              mb={4}
              color={"#4682B4"}
              fontWeight={500}
              fontSize={["14px", "18px"]}
              alignSelf={"center"}
            >
              {campaignData.name}
            </Text>

            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Метрика</Th>
                  <Th isNumeric>Значение</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Всего звонков</Td>
                  <Td isNumeric>{campaignData.totalCalls}</Td>
                </Tr>
                <Tr>
                  <Td>Лиды</Td>
                  <Td isNumeric>{campaignData.leads}</Td>
                </Tr>
                <Tr>
                  <Td>Ответили</Td>
                  <Td isNumeric>{campaignData.answered}</Td>
                </Tr>
                <Tr>
                  <Td>Сбросили</Td>
                  <Td isNumeric>{campaignData.dropped}</Td>
                </Tr>
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Гистограмма */}
        <Card flex={2} bg={cardBg}>
          <CardBody>
            <Box h="100%" minH="300px">
              <Bar data={chartData} options={chartOptions} />
            </Box>
          </CardBody>
        </Card>
      </HStack>
    </Box>
  );
};

export default CampaignAnalytics;
