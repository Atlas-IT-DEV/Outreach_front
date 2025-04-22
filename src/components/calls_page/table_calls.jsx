import {
  Button,
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
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";
import ModalEditWork from "./modal_edit_work";
import ModalDeleteWork from "./modal_delete_work";

const TableCalls = observer(() => {
  const { pageStore } = useStores();
  return (
    <>
      {pageStore.search_elements?.length > 0 ? (
        <>
          <Text fontWeight={"600"} color={"black"}>
            Результаты поиска
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
                    <Text>Название</Text>
                  </Th>

                  <Th color={"white"}>
                    <Text>Описание</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text>Дата начала</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text>Время работы</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text>Транскрибация</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text>% успеха</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text>Добавить в СРМ</Text>
                  </Th>
                  <Th color={"white"}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {pageStore.search_elements.map((item, index) => (
                  <Tr color={"black"} key={index}>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.name}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.description}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>
                        {new Date(item?.date_start).toLocaleDateString()}
                      </Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>
                        С {item?.time_start}:00 до {item?.time_finish}
                        :00
                      </Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Button
                        bg={"black"}
                        color={"white"}
                        _hover={{
                          bg: "rgba(200,200,200,1)",
                          color: "black",
                        }}
                      >
                        <Text>Транскрибировать</Text>
                      </Button>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>Диалог состоялся</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      {/* временный VStack */}
                      <VStack>
                        <Stack
                          cursor={"pointer"}
                          color={"black"}
                          bg={"rgba(121, 228, 155, 1)"}
                          borderRadius={"4px"}
                          padding={"4px 10px"}
                        >
                          <Text>Добавлено в СРМ</Text>
                        </Stack>
                        <Stack
                          cursor={"pointer"}
                          color={"white"}
                          bg={"rgba(89, 89, 89, 1)"}
                          borderRadius={"4px"}
                          padding={"4px 10px"}
                        >
                          <Text>Добавить в СРМ</Text>
                        </Stack>
                      </VStack>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <HStack>
                        <ModalEditWork obj={item} />
                        {/* <ModalDeleteWork obj={item} /> */}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </HStack>
        </>
      ) : null}
      <Text fontWeight={"600"} color={"black"}>
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
                <Text>Название</Text>
              </Th>

              <Th color={"white"}>
                <Text>Описание</Text>
              </Th>
              <Th color={"white"}>
                <Text>Дата начала</Text>
              </Th>
              <Th color={"white"}>
                <Text>Время работы</Text>
              </Th>
              <Th color={"white"}>
                <Text>Транскрибация</Text>
              </Th>
              <Th color={"white"}>
                <Text>% успеха</Text>
              </Th>
              <Th color={"white"}>
                <Text>Добавить в СРМ</Text>
              </Th>
              <Th color={"white"}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageStore.works.length > 0 &&
              pageStore.works
                .filter(
                  (item) =>
                    item?.department_id == pageStore.selected_department &&
                    item?.obzvon == "1"
                )
                .map((item, index) => (
                  <Tr color={"black"} key={index}>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.name}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.description}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>
                        {new Date(item?.date_start).toLocaleDateString()}
                      </Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>
                        С {item?.time_start}:00 до {item?.time_finish}:00
                      </Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Button
                        bg={"black"}
                        color={"white"}
                        _hover={{ bg: "rgba(200,200,200,1)", color: "black" }}
                      >
                        <Text>Транскрибировать</Text>
                      </Button>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>Диалог состоялся</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      {/* временный VStack */}
                      <VStack>
                        <Stack
                          cursor={"pointer"}
                          color={"black"}
                          bg={"rgba(121, 228, 155, 1)"}
                          borderRadius={"4px"}
                          padding={"4px 10px"}
                        >
                          <Text>Добавлено в СРМ</Text>
                        </Stack>
                        <Stack
                          cursor={"pointer"}
                          color={"white"}
                          bg={"rgba(89, 89, 89, 1)"}
                          borderRadius={"4px"}
                          padding={"4px 10px"}
                        >
                          <Text>Добавить в СРМ</Text>
                        </Stack>
                      </VStack>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <HStack>
                        <ModalEditWork obj={item} />
                        {/* <ModalDeleteWork obj={item} /> */}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </HStack>
    </>
  );
});

export default TableCalls;
