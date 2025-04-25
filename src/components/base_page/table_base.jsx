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

  const scrollTop = () => {
    window.scrollTo({
      top: 0, // пиксели от верха страницы
      left: 0,
      behavior: "smooth", // плавная анимация
    });
  };

  return (
    <>
      {pageStore.search_elements?.length > 0 ? (
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
                  {pageStore.headers_base?.map((item, index) => (
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
      ) : pageStore.search_elements.length == 0 &&
        pageStore.searchValue != "" ? (
        <Text color={"black"} fontWeight={"600"}>
          По Вашему запросу ничего не найдено
        </Text>
      ) : null}
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
        paddingBottom={"8px"}
      >
        <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
          <Thead bg={"#4682B4"} borderBottom={"none"}>
            <Tr borderBottom={"2px solid #4682B4"}>
              {pageStore.headers_base?.map((item, index) => (
                <Th color={"white"} key={index}>
                  <Text>{item}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {pageStore.selected_base?.length > 0
              ? pageStore.selected_base?.map((item, index) => (
                  <Tr color={"black"} key={index}>
                    {item?.map((item2, index2) => (
                      <Td key={index2} border={"1px solid rgba(200,200,200,1)"}>
                        {item2}
                      </Td>
                    ))}
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </HStack>
      {pageStore.selected_base?.length > 0 ? (
        <HStack width={"100%"} justify={"center"} gap={"20px"}>
          {pageStore.current_page >= 2 ? (
            <Text
              _hover={{ textDecoration: "underline" }}
              cursor={"pointer"}
              onClick={async () => {
                scrollTop();
                pageStore.updateCurrentPage(0);
                await pageStore.getBaseByName(
                  pageStore.selected_name_base,
                  pageStore.selected_department,
                  pageStore.current_page,
                  20
                );
              }}
            >
              В начало
            </Text>
          ) : null}
          {pageStore.current_page == 0 ? null : (
            <Text
              _hover={{ textDecoration: "underline" }}
              cursor={"pointer"}
              onClick={async () => {
                scrollTop();
                pageStore.updateCurrentPage(pageStore.current_page - 1);
                await pageStore.getBaseByName(
                  pageStore.selected_name_base,
                  pageStore.selected_department,
                  pageStore.current_page,
                  20
                );
              }}
            >
              Предыдущая страница
            </Text>
          )}
          {pageStore.has_more_data ? (
            <Text
              _hover={{ textDecoration: "underline" }}
              cursor={"pointer"}
              onClick={async () => {
                scrollTop();
                pageStore.updateCurrentPage(pageStore.current_page + 1);
                await pageStore.getBaseByName(
                  pageStore.selected_name_base,
                  pageStore.selected_department,
                  pageStore.current_page,
                  20
                );
              }}
            >
              Следующая страница
            </Text>
          ) : null}
        </HStack>
      ) : null}
    </>
  );
});

export default TableBase;
