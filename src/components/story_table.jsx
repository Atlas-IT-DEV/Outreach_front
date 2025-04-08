import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Box,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import ModalImageTable from "./product_table_image_modal";
import ModalDeleteStory from "./modal_delete_story";
import ModalUpdateStory from "./modal_update_story";

const StoryTable = observer(() => {
  const { pageStore } = useStores();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortProducts = (products) => {
    if (!sortConfig.key) return products;

    return [...products].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const isSameKey = prev.key === key;
      return {
        key,
        direction: isSameKey && prev.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  const sortedProducts = sortProducts(pageStore.storys);

  return (
    <Box bg="rgb(33, 33, 52)" boxShadow="md" width={"100%"}>
      <TableContainer>
        <Table variant="unstyled">
          <Thead bg="rgb(33, 33, 52)" color={"rgb(149, 149, 158)"}>
            <Tr>
              <Tooltip label="Уникальный идентификатор">
                <Th
                  cursor="pointer"
                  onClick={() => handleSort("id")}
                  textDecoration={
                    sortConfig.key === "id" ? "underline" : "none"
                  }
                >
                  ID{" "}
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Th>
              </Tooltip>
              <Tooltip label="ID продукта к которому привязан сторис">
                <Th
                  cursor="pointer"
                  onClick={() => handleSort("product_id")}
                  textDecoration={
                    sortConfig.key === "product_id" ? "underline" : "none"
                  }
                >
                  ID продукта{" "}
                  {sortConfig.key === "product_id" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Th>
              </Tooltip>
              <Tooltip label="Изображение, главная картинка сториса, которая отображается на его карточке в продукте">
                <Th>Картинка</Th>
              </Tooltip>
              <Tooltip label="Ссылка, те куда пользователь переходит при нажатии на сторис в магазине">
                <Th>Ссылка</Th>
              </Tooltip>
              <Tooltip label="Нажми на иконку чтобы удалить либо изменить сторис">
                <Th>Действия</Th>
              </Tooltip>
            </Tr>
          </Thead>
          <Tbody bgColor={"rgb(33, 33, 52)"}>
            {sortedProducts.map((product) => (
              <Tr
                key={product.id}
                bgColor={"rgb(33, 33, 52)"}
                color={"rgb(149, 149, 158)"}
                border={"1px solid gray"}
              >
                <Td bgColor={"rgb(33, 33, 52)"}>{product.id}</Td>
                <Td>{product.product_id}</Td>
                <Td>
                  <ModalImageTable
                    url={"https://apbstore.ru:8008/public/" + product.image_url}
                  />
                </Td>
                <Td>
                  <a href={product?.link}>{product?.link}</a>
                </Td>
                <Td>
                  <HStack>
                    <ModalUpdateStory storisId={product?.id} />
                    <ModalDeleteStory story_id={product?.id} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
});

export default StoryTable;
