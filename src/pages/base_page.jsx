import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Searcher from "../components/searcher";
import TableBase from "../components/base_page/table_base";
import { useStores } from "../store/store_context";
import { FaSearch } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import useWindowDimensions from "../windowDimensions";

const BasePage = observer(() => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const options = {
    keys: ["fullName", "company"], // Поля для поиска
    threshold: 0, // 0 = точное совпадение, 1 = любые совпадения
  };

  useEffect(() => {
    pageStore.getAllBases();
  }, []);

  return (
    <VStack
      width={"100%"}
      minHeight={"100vh"}
      height={"auto"}
      overflow={"hidden scroll"}
      align={"flex-start"}
      marginLeft={width >= 1400 ? "280px" : 0}
      padding={width >= 1400 ? "40px" : ["10px", "20px"]}
      marginTop={width >= 1400 ? "10px" : ["40px", "30px"]}
    >
      <Text fontWeight={"600"} color={"black"} w={"100%"}>
        Поиск по базе
      </Text>

      <Searcher
        array={pageStore.bases}
        options={options}
        placeholder="СЕГМЕНТ, ФИО, КОМПАНИЯ, ИНН, АВТОР ЗАГРУЗКИ, НОМЕР ТЕЛЕФОНА"
      />

      <Stack
        flexDirection={width >= 600 ? "row" : "column"}
        width={"100%"}
        justify={"flex-end"}
        gap={"10px"}
        marginTop={"20px"}
      >
        <Button
          boxShadow={"-2px 2px 0 0 #4682B4"}
          borderRadius={"0px"}
          border={"1px solid #4682B4"}
          bg={"white"}
          color={"black"}
          _hover={{ bg: "#4682B4", color: "white" }}
          flexShrink={0}
        >
          <Text>Импортировать базу</Text>
        </Button>
        <Button
          boxShadow={"-2px 2px 0 0 #4682B4"}
          borderRadius={"0px"}
          border={"1px solid #4682B4"}
          bg={"white"}
          color={"black"}
          _hover={{ bg: "#4682B4", color: "white" }}
          flexShrink={0}
        >
          <Text>Экспортировать базу</Text>
        </Button>
      </Stack>

      <TableBase />
    </VStack>
  );
});

export default BasePage;
