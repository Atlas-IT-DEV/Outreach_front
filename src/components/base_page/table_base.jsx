import {
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";

const TableBase = observer(() => {
  const { pageStore } = useStores();
  return (
    <>
      {pageStore.search_elements?.length != 0 && (
        <VStack width={"100%"} align={"flex-start"}>
          <Text color={"black"} fontWeight={"600"}>
            Результаты поиска
          </Text>
          <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
            <Thead bg={"#4682B4"} borderBottom={"none"}>
              <Tr borderBottom={"2px solid #4682B4"}>
                <Th color={"white"}>
                  <Text>Дата</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Сегмент</Text>
                </Th>
                <Th color={"white"}>
                  <Text>ФИО</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Компания</Text>
                </Th>
                <Th color={"white"}>
                  <Text>ИНН</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Добавить в СРМ</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Автор загрузки</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Номер телефона</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {pageStore.search_elements?.length > 0
                ? pageStore.search_elements.map((item, index) => (
                    <Tr color={"black"} key={index}>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.date}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.segment}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.fullName}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.company}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.inn}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        {item?.addedToCRM ? (
                          <Stack
                            cursor={"pointer"}
                            color={"white"}
                            bg={"rgba(89, 89, 89, 1)"}
                            borderRadius={"4px"}
                            padding={"4px 10px"}
                            width={"max-content"}
                          >
                            <Text>Добавить в СРМ</Text>
                          </Stack>
                        ) : (
                          <Stack
                            cursor={"pointer"}
                            color={"black"}
                            bg={"rgba(121, 228, 155, 1)"}
                            borderRadius={"4px"}
                            padding={"4px 10px"}
                            width={"max-content"}
                          >
                            <Text>Добавлено в СРМ</Text>
                          </Stack>
                        )}
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.uploadAuthor}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text width={"max-content"}>{item?.phoneNumber}</Text>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </VStack>
      )}
      <Text
        color={"black"}
        fontWeight={"600"}
        width={"100%"}
        marginTop={"20px"}
      >
        Все результаты
      </Text>
      <HStack
        width={"100%"}
        overflow={"hidden"}
        overflowX={"scroll"}
        paddingBottom={"8px"}
      >
        <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
          <Thead bg={"#4682B4"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid #4682B4"}>
              <Th color={"white"}>
                <Text>Дата</Text>
              </Th>
              <Th color={"white"}>
                <Text>Сегмент</Text>
              </Th>
              <Th color={"white"}>
                <Text>ФИО</Text>
              </Th>
              <Th color={"white"}>
                <Text>Компания</Text>
              </Th>
              <Th color={"white"}>
                <Text>ИНН</Text>
              </Th>
              <Th color={"white"}>
                <Text>Добавить в СРМ</Text>
              </Th>
              <Th color={"white"}>
                <Text>Автор загрузки</Text>
              </Th>
              <Th color={"white"}>
                <Text>Номер телефона</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageStore.bases?.length > 0
              ? pageStore.bases.map((item, index) => (
                  <Tr color={"black"} key={index}>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.date}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.segment}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.fullName}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.company}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.inn}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      {item?.addedToCRM ? (
                        <Stack
                          cursor={"pointer"}
                          color={"white"}
                          bg={"rgba(89, 89, 89, 1)"}
                          borderRadius={"4px"}
                          padding={"4px 10px"}
                          width={"max-content"}
                        >
                          <Text>Добавить в СРМ</Text>
                        </Stack>
                      ) : (
                        <Stack
                          cursor={"pointer"}
                          color={"black"}
                          bg={"rgba(121, 228, 155, 1)"}
                          borderRadius={"4px"}
                          padding={"4px 10px"}
                          width={"max-content"}
                        >
                          <Text>Добавлено в СРМ</Text>
                        </Stack>
                      )}
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.uploadAuthor}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text width={"max-content"}>{item?.phoneNumber}</Text>
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </HStack>
    </>
  );
});

export default TableBase;
