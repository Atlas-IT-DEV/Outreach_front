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

const CallsSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState({
    callDate: "",
    campaign: "",
    successRate: "",
    author: "",
    phoneNumber: "",
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
      callDate: "",
      campaign: "",
      successRate: "",
      author: "",
      phoneNumber: "",
    });
  };

  return (
    <>
      {/* Поле поиска с кнопкой фильтров */}
      <InputGroup width={"80%"}>
        <Input placeholder="Поиск..." pr="4.5rem" borderRadius="md" />
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
            <Button leftIcon={<FiSearch />} size="sm" colorScheme="blue">
              Найти
            </Button>
          </HStack>
        </InputRightElement>
      </InputGroup>

      {/* Модальное окно с фильтрами */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Фильтры</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Дата звонка */}
              <HStack w="100%" align="center">
                <Text minW="120px">Дата звонка:</Text>
                <Input
                  type="date"
                  name="callDate"
                  value={filters.callDate}
                  onChange={handleFilterChange}
                />
              </HStack>

              {/* Кампания */}
              <HStack w="100%" align="center">
                <Text minW="120px">Кампания:</Text>
                <Select
                  placeholder="Выберите кампанию"
                  name="campaign"
                  value={filters.campaign}
                  onChange={handleFilterChange}
                >
                  <option value="campaign1">Кампания 1</option>
                  <option value="campaign2">Кампания 2</option>
                  <option value="campaign3">Кампания 3</option>
                </Select>
              </HStack>

              {/* % успеха */}
              <HStack w="100%" align="center">
                <Text minW="120px">% успеха:</Text>
                <Select
                  placeholder="Выберите диапазон"
                  name="successRate"
                  value={filters.successRate}
                  onChange={handleFilterChange}
                >
                  <option value="0-20">0-20%</option>
                  <option value="21-50">21-50%</option>
                  <option value="51-80">51-80%</option>
                  <option value="81-100">81-100%</option>
                </Select>
              </HStack>

              {/* Автор */}
              <HStack w="100%" align="center">
                <Text minW="120px">Автор:</Text>
                <Input
                  placeholder="Введите автора"
                  name="author"
                  value={filters.author}
                  onChange={handleFilterChange}
                />
              </HStack>

              {/* Номер */}
              <HStack w="100%" align="center">
                <Text minW="120px">Номер:</Text>
                <Input
                  placeholder="Введите номер"
                  name="phoneNumber"
                  value={filters.phoneNumber}
                  onChange={handleFilterChange}
                />
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

export default CallsSearch;
