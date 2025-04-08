import {
  HStack,
  VStack,
  Text,
  Image,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { useEffect } from "react";

import { observer } from "mobx-react-lite";
import Greetings from "../components/greerings";
import CourseCard from "../components/course_card";
import { useNavigate } from "react-router";
import CoursesAccordion from "../components/courses_accordion";
import CreateCourseModal from "../components/create_course_modal";
import CourseKeys from "../components/keys_comp";

const AdminPage = observer(() => {
  const { pageStore, mainStore } = useStores();
  const navigate = useNavigate();
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      return "Доброе утро";
    } else if (hour >= 12 && hour < 18) {
      return "Добрый день";
    } else if (hour >= 18 && hour < 24) {
      return "Добрый вечер";
    } else {
      return "Доброй ночи";
    }
  }
  useEffect(() => {
    pageStore.getUserCourses();
    pageStore.getAllCourses();
    pageStore.get_all_views();
  }, []);
  return (
    <VStack
      width={"100%"}
      marginLeft={mainStore.isOpen ? "280px" : "0px"}
      p={["10px", "13px", "40px"]}
    >
      <HStack width={"100%"} justify={"flex-start"} gap={"20px"}></HStack>
      <VStack
        width={mainStore.isOpen ? "80%" : "100%"}
        alignSelf={"center"}
        marginTop={"30px"}
      >
        <VStack
          width={"100%"}
          boxShadow={"0px 0px 15px 4px rgba(0,0,0,0.08);"}
          backgroundColor={"white"}
          padding={["10px 10px", "20px 40px"]}
        >
          <Text
            fontSize={["20px", "28px"]}
            fontWeight={"500"}
            color={"black"}
            onClick={() => {
              console.log(pageStore.user_data);
            }}
            alignSelf={"flex-start"}
          >
            {getGreeting()}, {pageStore.user_data.first_name}
          </Text>
          <HStack width={"100%"} align={"flex-start"}>
            <VStack width={"100%"} align={"flex-start"}>
              <Text
                color={"#4682B4"}
                fontWeight={400}
                fontSize={["16px", "20px"]}
              >
                Текущая статистика для вас
              </Text>
              <HStack width={"100%"} justify={"space-between"}>
                <Text
                  fontSize={["16px", "20px"]}
                  fontWeight={400}
                  color={"#4682B4"}
                >
                  Кол-во студентов
                </Text>
                <Text fontSize={["14px", "20px"]}>
                  {pageStore.my_users.length}
                </Text>
              </HStack>
              <Divider />
              <HStack width={"100%"} justify={"space-between"}>
                <Text
                  fontSize={["16px", "20px"]}
                  fontWeight={400}
                  color={"#4682B4"}
                >
                  Курсов создано
                </Text>
                <Text fontSize={["14px", "20px"]}>
                  {pageStore.my_courses.length}
                </Text>
              </HStack>
              <Divider />
              <HStack width={"100%"} justify={"space-between"}>
                <Text
                  fontSize={["16px", "20px"]}
                  fontWeight={400}
                  color={"#4682B4"}
                >
                  Изучено вашими студентами
                </Text>
                <Text fontSize={["14px", "20px"]}>
                  {
                    Array.from(pageStore.all_views).filter((elem) =>
                      pageStore.my_courses
                        .flatMap((course) => course.id)
                        .includes(elem.course_id)
                    ).length
                  }
                </Text>
              </HStack>
              <Divider />
            </VStack>
          </HStack>
        </VStack>
        <VStack width={"100%"} spacing={4} marginTop={"30px"}>
          <CourseKeys />
          <HStack width={"100%"} justify={"space-between"}>
            <Text
              fontSize={["20px", "28px"]}
              fontWeight={"500"}
              color={"black"}
              onClick={() => {
                console.log(pageStore.user_data);
              }}
              alignSelf={"flex-start"}
            >
              Ваши курсы
            </Text>
            <CreateCourseModal />
          </HStack>

          {pageStore.my_courses.map((course) => (
            <CoursesAccordion course={course} />
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
});

export default AdminPage;
