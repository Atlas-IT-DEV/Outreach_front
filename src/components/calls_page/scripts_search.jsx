import { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiFilter, FiSearch } from "react-icons/fi";

const ScriptsSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState({
    campaign: "",
    direction: "",
    author: "",
    searchQuery: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    console.log("Applied filters:", filters);
    onClose();
  };

  const resetFilters = () => {
    setFilters({
      campaign: "",
      direction: "",
      author: "",
      searchQuery: "",
    });
  };

  return (
    <>
      {/* Поле поиска с кнопкой фильтров */}
      <InputGroup width={"80%"}>
        <Input
          placeholder="Поиск по тексту скрипта..."
          pr="4.5rem"
          borderRadius="md"
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters({ ...filters, searchQuery: e.target.value })
          }
        />
        <InputRightElement width="auto">
          <HStack spacing={2} pr={2}>
            <Button
              leftIcon={<FiFilter />}
              size="sm"
              onClick={onOpen}
              variant="outline"
            >
              Фильтры
            </Button>
            <Button
              leftIcon={<FiSearch />}
              size="sm"
              colorScheme="blue"
              onClick={() => console.log("Search:", filters)}
            >
              Найти
            </Button>
          </HStack>
        </InputRightElement>
      </InputGroup>

      {/* Модальное окно с фильтрами */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Фильтры скриптов</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Кампания */}
              <HStack w="100%" align="center">
                <Text minW="120px">Кампания:</Text>
                <Select
                  placeholder="Все кампании"
                  name="campaign"
                  value={filters.campaign}
                  onChange={handleFilterChange}
                >
                  <option value="summer_sale">Летняя распродажа</option>
                  <option value="new_clients">
                    Привлечение новых клиентов
                  </option>
                  <option value="upselling">Допродажи</option>
                  <option value="retention">Удержание клиентов</option>
                </Select>
              </HStack>

              {/* Направление */}
              <HStack w="100%" align="center">
                <Text minW="120px">Направление:</Text>
                <Select
                  placeholder="Все направления"
                  name="direction"
                  value={filters.direction}
                  onChange={handleFilterChange}
                >
                  <option value="inbound">Входящие звонки</option>
                  <option value="outbound">Исходящие звонки</option>
                  <option value="chat">Онлайн-чаты</option>
                  <option value="email">Email-рассылки</option>
                </Select>
              </HStack>

              {/* Автор */}
              <HStack w="100%" align="center">
                <Text minW="120px">Автор:</Text>
                <Select
                  placeholder="Все авторы"
                  name="author"
                  value={filters.author}
                  onChange={handleFilterChange}
                >
                  <option value="marketing">Отдел маркетинга</option>
                  <option value="sales">Отдел продаж</option>
                  <option value="manager1">Иванов И.И.</option>
                  <option value="manager2">Петрова А.С.</option>
                </Select>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={resetFilters}>
              Сбросить
            </Button>
            <Button colorScheme="blue" onClick={applyFilters}>
              Применить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScriptsSearch;
