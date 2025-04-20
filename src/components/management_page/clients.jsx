import { Button, HStack, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import Searcher from "../searcher";
import { useStores } from "../../store/store_context";
import useWindowDimensions from "../../windowDimensions";
import ModalCreateClient from "./modal_create_client";
import TableClients from "./table_clients";

const Clients = () => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const options = {
    keys: [
      "name",
      "description",
      "director.username",
      "director.last_name",
      "director.first_name",
      "director.phone",
    ], // Поля для поиска
    threshold: 0, // 0 = точное совпадение, 1 = любые совпадения
  };
  return (
    <VStack w={"100%"}>
      <Searcher
        array={pageStore.clients}
        options={options}
        search_by="Поиск по клиентам"
        placeholder="НИКНЕЙМ, ФАМИЛИЯ, ИМЯ, НОМЕР ТЕЛЕФОНА, НАЗВАНИЕ КОМПАНИИ, ОПИСАНИЕ КОМПАНИИ"
      />

      <HStack width={"100%"} justify={"space-between"} marginTop={"10px"}>
        <ModalCreateClient />
      </HStack>

      <TableClients />
    </VStack>
  );
};

export default Clients;
