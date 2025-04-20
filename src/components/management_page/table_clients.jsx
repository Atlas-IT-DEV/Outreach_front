import {
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import { useEffect } from "react";
import ModalDeleteClient from "./modal_delete_client";
import ModalEditClient from "./modal_edit_client";

const TableClients = observer(() => {
  const { pageStore } = useStores();
  useEffect(() => {
    pageStore.getAllCompanies();
  }, []);

  console.log("search", pageStore.search_elements);

  return (
    <>
      {pageStore.search_elements?.length != 0 && (
        <VStack width={"100%"} align={"flex-start"} marginTop={"20px"}>
          <Text color={"black"} fontWeight={"600"}>
            Результаты поиска
          </Text>
          <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
            <Thead bg={"#4682B4"} borderBottom={"none"}>
              <Tr borderBottom={"2px solid #4682B4"}>
                <Th color={"white"}>
                  <Text>Никнейм</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Фамилия</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Имя</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Номер телефона</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Название компании</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Описание компании</Text>
                </Th>
                <Th color={"white"}>
                  <Text></Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {pageStore.search_elements?.length > 0
                ? pageStore.search_elements?.map((item, index) => (
                    <Tr color={"black"} key={index}>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.director?.username}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.director?.last_name ?? "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.director?.first_name ?? "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.director?.phone ?? "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.name ?? "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Textarea
                          value={item?.description}
                          contentEditable={"false"}
                        />
                      </Td>
                      <Td
                        width={"min-content"}
                        border={"1px solid rgba(200,200,200,1)"}
                      >
                        <HStack justify={"center"}>
                          <ModalEditClient obj={item} />
                          <ModalDeleteClient obj={item} />
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </VStack>
      )}
      <Text
        width={"100%"}
        color={"black"}
        fontWeight={"600"}
        marginTop={"20px"}
      >
        Все результаты
      </Text>
      <HStack
        width={"100%"}
        overflow={"hidden"}
        overflowX={"scroll"}
        paddingBottom={"6px"}
      >
        <Table
          width={"100%"}
          padding={"10px"}
          border={"2px solid #4682B4"}
          align={"flex-start"}
        >
          <Thead bg={"#4682B4"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid #4682B4"}>
              <Th color={"white"}>
                <Text>Никнейм</Text>
              </Th>
              <Th color={"white"}>
                <Text>Фамилия</Text>
              </Th>
              <Th color={"white"}>
                <Text>Имя</Text>
              </Th>
              <Th color={"white"}>
                <Text>Номер телефона</Text>
              </Th>
              <Th color={"white"}>
                <Text>Название компании</Text>
              </Th>
              <Th color={"white"}>
                <Text>Описание компании</Text>
              </Th>
              <Th color={"white"}>
                <Text></Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageStore.clients?.length > 0
              ? pageStore.clients?.map((item, index) => (
                  <Tr color={"black"} key={index}>
                    {console.log("item", item)}
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.director?.username}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.director?.last_name ?? "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.director?.first_name ?? "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.director?.phone ?? "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Text>{item?.name ?? "-"}</Text>
                    </Td>
                    <Td border={"1px solid rgba(200,200,200,1)"}>
                      <Textarea
                        value={item?.description}
                        contentEditable={"false"}
                      />
                    </Td>
                    <Td
                      width={"min-content"}
                      border={"1px solid rgba(200,200,200,1)"}
                    >
                      <HStack justify={"center"}>
                        <ModalEditClient obj={item} />
                        <ModalDeleteClient obj={item} />
                      </HStack>
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

export default TableClients;
