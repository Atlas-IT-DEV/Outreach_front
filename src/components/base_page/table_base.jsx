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

  const filterRows = pageStore.selected_base
    ? pageStore.selected_base.slice(1, -1)
    : null;
  console.log("spl", filterRows);

  return (
    <>
      {pageStore.search_elements?.length != 0 && (
        <VStack width={"100%"} align={"flex-start"}>
          <Text color={"black"} fontWeight={"600"}>
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
                  {pageStore.selected_base[0]?.map((item, index) => (
                    <Th color={"white"} key={index}>
                      <Text>{item}</Text>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {pageStore.search_elements.map((item, index) => (
                  <Tr color={"black"} key={index}>
                    {item.map((item2, index2) => (
                      <Td key={index2} border={"1px solid rgba(200,200,200,1)"}>
                        {item2}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </HStack>
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
              {pageStore.selected_base[0]?.map((item, index) => (
                <Th color={"white"} key={index}>
                  <Text>{item}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filterRows.map((item, index) => (
              <Tr color={"black"} key={index}>
                {item.map((item2, index2) => (
                  <Td key={index2} border={"1px solid rgba(200,200,200,1)"}>
                    {item2}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </HStack>
    </>
  );
});

export default TableBase;
