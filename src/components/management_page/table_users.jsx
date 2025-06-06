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
import ModalEditClient from "./modal_edit_client";
import ModalDeleteUser from "./modal_delete_user";
import ModalEditUser from "./modal_edit_user";

const TableUsers = observer(() => {
  const { pageStore } = useStores();
  useEffect(() => {
    pageStore.getAllCompanies();
  }, []);

  return (
    <>
      {pageStore.search_elements?.length > 0 ? (
        <VStack width={"100%"} align={"flex-start"} marginTop={"20px"}>
          <Text color={"black"} fontWeight={"600"}>
            Результаты поиска
          </Text>
          <HStack
            width={"100%"}
            overflow={"hidden"}
            overflowX={"scroll"}
            paddingBottom={"8px"}
            borderRadius={"8px"}
          >
            <Table
              width={"100%"}
              padding={"10px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
            >
              <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
                <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
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
                    <Text>Почта</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text>Номер телефона</Text>
                  </Th>
                  <Th color={"white"}>
                    <Text></Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {pageStore.search_elements
                  ?.filter((item) => item?.ID != pageStore.user_info?.ID)
                  ?.map((item, index) => (
                    <Tr color={"black"} key={index}>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.username}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.last_name || "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.first_name || "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.email || "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.phone || "-"}</Text>
                      </Td>
                      <Td
                        width={"min-content"}
                        border={"1px solid rgba(200,200,200,1)"}
                      >
                        <HStack justify={"center"}>
                          <ModalEditUser obj={item} />
                          <ModalDeleteUser obj={item} />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </HStack>
        </VStack>
      ) : pageStore.search_elements?.length == 0 &&
        pageStore.searchValue != "" ? (
        <Text
          color={"black"}
          fontWeight={"600"}
          width={"100%"}
          marginTop={"20px"}
        >
          По Вашему запросу ничего не найдено
        </Text>
      ) : null}

      <Text
        width={"100%"}
        color={"black"}
        fontWeight={"600"}
        marginTop={"20px"}
      >
        Все данные
      </Text>
      <HStack
        width={"100%"}
        overflow={"hidden"}
        overflowX={"scroll"}
        paddingBottom={"8px"}
        borderRadius={"8px"}
      >
        <Table
          width={"100%"}
          padding={"10px"}
          border={"2px solid rgba(48, 141, 218, 1)"}
          align={"flex-start"}
        >
          <Thead bg={"rgba(48, 141, 218, 1)"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid rgba(48, 141, 218, 1)"}>
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
                <Text>Почта</Text>
              </Th>
              <Th color={"white"}>
                <Text>Номер телефона</Text>
              </Th>
              <Th color={"white"}>
                <Text></Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageStore.users?.length > 0
              ? pageStore.users
                  ?.filter((item) => item?.ID != pageStore.user_info?.ID)
                  ?.map((item, index) => (
                    <Tr color={"black"} key={index}>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.username}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.last_name || "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.first_name || "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.email || "-"}</Text>
                      </Td>
                      <Td border={"1px solid rgba(200,200,200,1)"}>
                        <Text>{item?.phone || "-"}</Text>
                      </Td>
                      <Td
                        width={"min-content"}
                        border={"1px solid rgba(200,200,200,1)"}
                      >
                        <HStack justify={"center"}>
                          <ModalEditUser obj={item} />
                          <ModalDeleteUser obj={item} />
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

export default TableUsers;
