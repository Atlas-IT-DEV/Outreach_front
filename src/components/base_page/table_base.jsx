import {
  Button,
  HStack,
  Input,
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
import useWindowDimensions from "../../windowDimensions";
import { useState } from "react";

const TableBase = observer(() => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const [selectedPage, setSelectedPage] = useState(pageStore.current_page);

  const scrollTop = () => {
    window.scrollTo({
      top: 0, // пиксели от верха страницы
      left: 0,
      behavior: "smooth", // плавная анимация
    });
  };

  console.log(pageStore.current_page, selectedPage);

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
      <VStack align={"flex-end"} width={"100%"} marginTop={"20px"}>
        <Text>Показывать по:</Text>
        <HStack>
          <Input
            borderRadius={"0px"}
            border={"2px solid #4682B4"}
            value={pageStore.countRows}
            onChange={(e) => pageStore.updateCountRows(e.target.value)}
          />
          <Button
            width={"100%"}
            border={"2px solid #4682B4"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            bg={"white"}
            color={"black"}
            _hover={{ bg: "#4682B4", color: "white" }}
          >
            <Text
              fontSize={width >= 1000 ? "16px" : "14px"}
              onClick={async () => {
                pageStore.updateCurrentPage(0);
                await pageStore.getBaseByName(
                  pageStore.selected_name_base,
                  pageStore.selected_department,
                  pageStore.current_page,
                  pageStore.countRows
                );
              }}
            >
              Применить
            </Text>
          </Button>
        </HStack>
      </VStack>
      <Text
        color={"black"}
        fontWeight={"600"}
        width={"100%"}
        marginTop={"10px"}
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
      <HStack width={"100%"} justify={"space-between"}>
        <VStack align={"flex-start"}>
          <Text>Перейти на страницу:</Text>
          <HStack>
            <Input
              borderRadius={"0px"}
              border={"2px solid #4682B4"}
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
            />
            <Button
              width={"100%"}
              border={"2px solid #4682B4"}
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "#4682B4", color: "white" }}
            >
              <Text
                fontSize={width >= 1000 ? "16px" : "14px"}
                onClick={async () => {
                  pageStore.updateCurrentPage(selectedPage);
                  await pageStore.getBaseByName(
                    pageStore.selected_name_base,
                    pageStore.selected_department,
                    pageStore.current_page,
                    pageStore.countRows
                  );
                }}
              >
                Применить
              </Text>
            </Button>
          </HStack>
        </VStack>

        {pageStore.selected_base?.length > 0 ? (
          <HStack justify={"center"} gap={"20px"}>
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
                    pageStore.countRows
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
                    pageStore.countRows
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
                    pageStore.countRows
                  );
                }}
              >
                Следующая страница
              </Text>
            ) : null}
          </HStack>
        ) : null}

        <Text>
          Страница
          <br /> {pageStore.current_page + 1} из 999
        </Text>
      </HStack>
    </>
  );
});

export default TableBase;
