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
  Textarea,
} from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import ModalImageMultiple from "./multiple_image_modal_table";
import ModalDeleteComment from "./modal_delete_comment";

const CommentsTable = observer(() => {
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

  const sortedProducts = sortProducts(pageStore.comments);

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
              <Tooltip label="Дата создания">
                <Th
                  cursor="pointer"
                  onClick={() => handleSort("created_at")}
                  textDecoration={
                    sortConfig.key === "created_at" ? "underline" : "none"
                  }
                >
                  Дата создания{" "}
                  {sortConfig.key === "created_at" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </Th>
              </Tooltip>
              <Tooltip label="Изображение, первая картинка комментария, которая отображается на его карточке">
                <Th>Картинка</Th>
              </Tooltip>
              <Tooltip label="Имя создателяя которое показывается в комменте">
                <Th>Имя создателя комментария</Th>
              </Tooltip>
              <Tooltip label="Текст который отображается в комментарии">
                <Th>Комментарий</Th>
              </Tooltip>
              <Tooltip label="Нажми на иконку чтобы удалить либо изменить комментарий">
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
                <Td>{product.created_at}</Td>
                <Td>
                  <ModalImageMultiple urls={product.urls} />
                </Td>
                <Td>{product.user.name}</Td>
                <Td>
                  <Textarea
                    maxW={"200px"}
                    contentEditable={"false"}
                    disabled
                    defaultValue={product.comment}
                  ></Textarea>
                </Td>
                <Td>
                  <ModalDeleteComment comment_id={product?.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
});

export default CommentsTable;
