import {
  HStack,
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

const TableContacts = observer(() => {
  const { pageStore } = useStores();
  return (
    <>
      {pageStore.search_elements?.length != 0 && (
        <VStack width={"100%"} align={"flex-start"}>
          <Text color={"black"} fontWeight={"600"}>
            Результаты поиска
          </Text>
          <Table width={"100%"} padding={"10px"} border={"2px solid rgba(48, 141, 218, 1)"}>
            <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
              <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
                <Th color={"white"}>
                  <Text>ID</Text>
                </Th>
                <Th color={"white"}>
                  <Text>ФИО</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Телефон</Text>
                </Th>
                <Th color={"white"}>
                  <Text>Компания</Text>
                </Th>
                <Th color={"white"}>
                  <Text>email</Text>
                </Th>
                <Th color={"white"}>
                  <Text>ИНН</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {pageStore.search_elements.length > 0 ? (
                pageStore.search_elements?.map((item, index) => {
                  return (
                    <Tr color={"black"} key={index}>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.id}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.fullName}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.phoneNumber}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.company}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.email}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.inn}</Text>
                      </Td>
                    </Tr>
                  );
                })
              ) : pageStore.search_elements.length == 0 &&
                pageStore.searchValue != "" ? (
                <Text color={"black"} fontWeight={"600"}>
                  По Вашему запросу ничего не найдено
                </Text>
              ) : null}
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
        Все данные
      </Text>
      <HStack
        width={"100%"}
        overflow={"hidden"}
        overflowX={"scroll"}
        paddingBottom={"6px"}
      >
        <Table width={"100%"} padding={"10px"} border={"2px solid rgba(48, 141, 218, 1)"}>
          <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
              <Th color={"white"}>
                <Text>ID</Text>
              </Th>
              <Th color={"white"}>
                <Text>ФИО</Text>
              </Th>
              <Th color={"white"}>
                <Text>Телефон</Text>
              </Th>
              <Th color={"white"}>
                <Text>Компания</Text>
              </Th>
              <Th color={"white"}>
                <Text>email</Text>
              </Th>
              <Th color={"white"}>
                <Text>ИНН</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageStore.crm_contacts.length > 0
              ? pageStore.crm_contacts?.map((item, index) => {
                  return (
                    <Tr color={"black"} key={index}>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.id}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.fullName}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.phoneNumber}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.company}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.email}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.inn}</Text>
                      </Td>
                    </Tr>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </HStack>
    </>
  );
});

export default TableContacts;
