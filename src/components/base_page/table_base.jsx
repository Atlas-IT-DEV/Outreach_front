import {
  Button,
  HStack,
  IconButton,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import useWindowDimensions from "../../windowDimensions";
import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const TableBase = observer(() => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const [selectedPage, setSelectedPage] = useState(pageStore.current_page);
  const [selectedSearchPage, setSelectedSearchPage] = useState(
    pageStore.current_page_base_search
  );

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
          <VStack width={"100%"} align={"flex-end"} marginTop={"20px"}>
            <Text>Показывать по:</Text>
            <HStack>
              <Input
                borderRadius={"8px"}
                border={"2px solid rgba(48, 141, 218, 1)"}
                value={pageStore.countRowsSearch}
                onChange={(e) =>
                  pageStore.updateCountRowsSearch(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />
              <Button
                width={"100%"}
                border={"2px solid rgba(48, 141, 218, 1)"}
                borderRadius={"8px"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                onClick={async () => {
                  pageStore.updateCurrentPageBaseSearch(0);
                  await pageStore.searchInBase(
                    pageStore.searchBaseValue,
                    pageStore.current_page_base_search,
                    pageStore.countRowsSearch
                  );
                }}
              >
                <Text fontSize={width >= 1000 ? "16px" : "14px"}>
                  Применить
                </Text>
              </Button>
            </HStack>
          </VStack>
          <Text color={"black"} fontWeight={"600"}>
            Результаты поиска: {pageStore.count_search_base_values}
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
                    <Text>Добавить в CRM</Text>
                  </Th>
                  {pageStore.headers_base?.map((item, index) => (
                    <Th color={"white"} key={index}>
                      <Text>{item}</Text>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {pageStore.search_elements?.length > 0
                  ? pageStore.search_elements?.map((item, index) => (
                      <Tr color={"black"} key={index}>
                        <Td
                          border={"1px solid rgba(200,200,200,1)"}
                          width={"170px"}
                        >
                          <Stack
                            gap={0}
                            margin={0}
                            padding={0}
                            alignItems={"center"}
                          >
                            <IconButton
                              icon={<FaPlus />}
                              border={"2px solid rgba(48, 141, 218, 1)"}
                              bg={"white"}
                              color="rgba(48, 141, 218, 1)"
                              _hover={{
                                bg: "rgba(48, 141, 218, 1)",
                                color: "white",
                              }}
                            />
                          </Stack>
                        </Td>
                        {item?.map((item2, index2) => (
                          <Td
                            key={index2}
                            border={"1px solid rgba(200,200,200,1)"}
                          >
                            {item2}
                          </Td>
                        ))}
                      </Tr>
                    ))
                  : null}
              </Tbody>
            </Table>
          </HStack>
          {pageStore.selected_name_base != "" ? (
            <Stack
              width={"100%"}
              flexDirection={width >= 1200 ? "row" : "column"}
              justify={"space-between"}
            >
              <VStack align={"flex-start"}>
                <Text>Перейти на страницу:</Text>
                <HStack>
                  <Tooltip
                    label={"Подсказка: отсчёт страниц начинается с нуля"}
                    bg={"rgba(48, 141, 218, 1)"}
                    color={"white"}
                    borderRadius={"10px"}
                    placement="bottom-start"
                  >
                    <Input
                      borderRadius={"8px"}
                      placeholder="Перейти на страницу"
                      border={"2px solid rgba(48, 141, 218, 1)"}
                      value={selectedSearchPage}
                      onChange={(e) =>
                        setSelectedSearchPage(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </Tooltip>

                  <Button
                    width={"100%"}
                    border={"2px solid rgba(48, 141, 218, 1)"}
                    borderRadius={"8px"}
                    bg={"white"}
                    color={"black"}
                    _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                    onClick={async () => {
                      pageStore.updateCurrentPageBaseSearch(selectedSearchPage);
                      await pageStore.searchInBase(
                        pageStore.searchBaseValue,
                        pageStore.current_page_base_search,
                        pageStore.countRowsSearch
                      );
                      setSelectedSearchPage("");
                    }}
                  >
                    <Text fontSize={width >= 1000 ? "16px" : "14px"}>
                      Применить
                    </Text>
                  </Button>
                </HStack>
              </VStack>

              {pageStore.selected_base?.length > 0 ? (
                <HStack justify={"center"} gap={"20px"}>
                  {pageStore.current_page_base_search >= 2 ? (
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      cursor={"pointer"}
                      onClick={async () => {
                        scrollTop();
                        pageStore.updateCurrentPageBaseSearch(0);
                        await pageStore.searchInBase(
                          pageStore.searchBaseValue,
                          pageStore.current_page_base_search,
                          pageStore.countRowsSearch
                        );
                      }}
                    >
                      В начало
                    </Text>
                  ) : null}
                  {pageStore.current_page_base_search == 0 ? null : (
                    <IconButton
                      icon={<MdNavigateBefore size={"30px"} />}
                      border={"2px solid rgba(48, 141, 218, 1)"}
                      bg={"white"}
                      color="rgba(48, 141, 218, 1)"
                      _hover={{
                        bg: "rgba(48, 141, 218, 1)",
                        color: "white",
                      }}
                      onClick={async () => {
                        scrollTop();
                        pageStore.updateCurrentPageBaseSearch(
                          Number(pageStore.current_page_base_search) - 1
                        );
                        pageStore.searchInBase(
                          pageStore.searchBaseValue,
                          pageStore.current_page_base_search,
                          pageStore.countRowsSearch
                        );
                      }}
                    />
                  )}
                  {pageStore.has_more_data_search &&
                  Number(pageStore.current_page_base_search) !=
                    parseInt(
                      pageStore.count_search_base_values /
                        pageStore.countRowsSearch
                    ) -
                      1 ? (
                    <IconButton
                      icon={<MdNavigateNext size={"30px"} />}
                      border={"2px solid rgba(48, 141, 218, 1)"}
                      bg={"white"}
                      color="rgba(48, 141, 218, 1)"
                      _hover={{
                        bg: "rgba(48, 141, 218, 1)",
                        color: "white",
                      }}
                      onClick={async () => {
                        scrollTop();
                        pageStore.updateCurrentPageBaseSearch(
                          Number(pageStore.current_page_base_search) + 1
                        );
                        pageStore.searchInBase(
                          pageStore.searchBaseValue,
                          pageStore.current_page_base_search,
                          pageStore.countRowsSearch
                        );
                      }}
                    />
                  ) : null}
                </HStack>
              ) : null}

              <Text
                width={width >= 1200 ? "auto" : "100%"}
                textAlign={width >= 1400 ? null : "end"}
              >
                Страница
                <br /> {Number(pageStore.current_page_base_search)} из{" "}
                {parseInt(
                  pageStore.count_search_base_values / pageStore.countRowsSearch
                ) - 1}
              </Text>
            </Stack>
          ) : null}
        </VStack>
      ) : pageStore.search_elements.length == 0 && pageStore.clickSearch ? (
        <Text color={"black"} fontWeight={"600"}>
          По Вашему запросу ничего не найдено
        </Text>
      ) : null}

      {pageStore.selected_name_base != "" ? (
        <VStack align={"flex-end"} width={"100%"} marginTop={"20px"}>
          <Text>Показывать по:</Text>
          <HStack>
            <Input
              borderRadius={"8px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              value={pageStore.countRows}
              onChange={(e) =>
                pageStore.updateCountRows(e.target.value.replace(/\D/g, ""))
              }
            />
            <Button
              width={"100%"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              borderRadius={"8px"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
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
              <Text fontSize={width >= 1000 ? "16px" : "14px"}>Применить</Text>
            </Button>
          </HStack>
        </VStack>
      ) : null}
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
                <Text>Добавить в CRM</Text>
              </Th>
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
                    <Td
                      border={"1px solid rgba(200,200,200,1)"}
                      width={"170px"}
                    >
                      <Stack
                        gap={0}
                        margin={0}
                        padding={0}
                        alignItems={"center"}
                      >
                        <IconButton
                          icon={<FaPlus />}
                          border={"2px solid rgba(48, 141, 218, 1)"}
                          bg={"white"}
                          color="rgba(48, 141, 218, 1)"
                          _hover={{
                            bg: "rgba(48, 141, 218, 1)",
                            color: "white",
                          }}
                        />
                      </Stack>
                    </Td>
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
      {pageStore.selected_name_base != "" ? (
        <Stack
          width={"100%"}
          flexDirection={width >= 1200 ? "row" : "column"}
          justify={"space-between"}
        >
          <VStack align={"flex-start"}>
            <Text>Перейти на страницу:</Text>
            <HStack>
              <Tooltip
                label={"Подсказка: отсчёт страниц начинается с нуля"}
                bg={"rgba(48, 141, 218, 1)"}
                color={"white"}
                borderRadius={"10px"}
                placement="bottom-start"
              >
                <Input
                  borderRadius={"8px"}
                  placeholder="Перейти на страницу"
                  border={"2px solid rgba(48, 141, 218, 1)"}
                  value={selectedPage}
                  onChange={(e) =>
                    setSelectedPage(e.target.value.replace(/\D/g, ""))
                  }
                />
              </Tooltip>

              <Button
                width={"100%"}
                border={"2px solid rgba(48, 141, 218, 1)"}
                borderRadius={"8px"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                onClick={async () => {
                  pageStore.updateCurrentPage(selectedPage);
                  await pageStore.getBaseByName(
                    pageStore.selected_name_base,
                    pageStore.selected_department,
                    pageStore.current_page,
                    pageStore.countRows
                  );
                  setSelectedPage("");
                }}
              >
                <Text fontSize={width >= 1000 ? "16px" : "14px"}>
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
                <IconButton
                  icon={<MdNavigateBefore size={"30px"} />}
                  border={"2px solid rgba(48, 141, 218, 1)"}
                  bg={"white"}
                  color="rgba(48, 141, 218, 1)"
                  _hover={{
                    bg: "rgba(48, 141, 218, 1)",
                    color: "white",
                  }}
                  onClick={async () => {
                    scrollTop();
                    pageStore.updateCurrentPage(
                      Number(pageStore.current_page) - 1
                    );
                    await pageStore.getBaseByName(
                      pageStore.selected_name_base,
                      pageStore.selected_department,
                      pageStore.current_page,
                      pageStore.countRows
                    );
                  }}
                />
              )}
              {pageStore.has_more_data &&
              Number(pageStore.current_page) !=
                parseInt(pageStore.countValues / pageStore.countRows) - 1 ? (
                <IconButton
                  icon={<MdNavigateNext size={"30px"} />}
                  border={"2px solid rgba(48, 141, 218, 1)"}
                  bg={"white"}
                  color="rgba(48, 141, 218, 1)"
                  _hover={{
                    bg: "rgba(48, 141, 218, 1)",
                    color: "white",
                  }}
                  onClick={async () => {
                    scrollTop();
                    pageStore.updateCurrentPage(
                      Number(pageStore.current_page) + 1
                    );
                    await pageStore.getBaseByName(
                      pageStore.selected_name_base,
                      pageStore.selected_department,
                      pageStore.current_page,
                      pageStore.countRows
                    );
                  }}
                />
              ) : null}
            </HStack>
          ) : null}

          <Text
            width={width >= 1200 ? "auto" : "100%"}
            textAlign={width >= 1400 ? null : "end"}
          >
            Страница
            <br /> {Number(pageStore.current_page)} из{" "}
            {parseInt(pageStore.countValues / pageStore.countRows) - 1}
          </Text>
        </Stack>
      ) : null}
    </>
  );
});

export default TableBase;
