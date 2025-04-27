import { Button, HStack, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import Searcher from "../searcher";
import { useStores } from "../../store/store_context";
import useWindowDimensions from "../../windowDimensions";
import ModalCreateClient from "./modal_create_client";
import TableClients from "./table_clients";
import ModalCreateUser from "./modal_create_user";
import TableUsers from "./table_users";

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
    threshold: 0.5, // 0 = точное совпадение, 1 = любые совпадения
  };
  const optionsUser = {
    keys: ["username", "last_name", "first_name", "phone", "email"],
    threshold: 0.5,
  };
  return (
    <VStack w={"100%"}>
      <Searcher
        array={
          pageStore.user_info?.role == "1" ? pageStore.users : pageStore.clients
        }
        options={pageStore.user_info?.role == "1" ? optionsUser : options}
        search_by={
          pageStore.user_info?.role == "1"
            ? "Поиск по сотрудникам"
            : "Поиск по клиентам"
        }
      />

      <HStack width={"100%"} justify={"space-between"} marginTop={"10px"}>
        {pageStore.user_info?.role == "1" ? (
          <ModalCreateUser />
        ) : (
          <ModalCreateClient />
        )}
      </HStack>
      {pageStore.user_info?.role == "1" ? <TableUsers /> : <TableClients />}
    </VStack>
  );
};

export default Clients;
