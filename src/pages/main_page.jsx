import { HStack, VStack } from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { useEffect } from "react";

import { observer } from "mobx-react-lite";
import Greetings from "../components/greerings";
import { useLocation } from "react-router";

const MainPage = observer(() => {
  const { pageStore, mainStore } = useStores();
  const location = useLocation();
  useEffect(() => {
    async function addUserToCourse(userId, courseId) {
      const url = "https://me-course.com:8069/api/users/curses/";
      const requestData = {
        id: 0, // Можно заменить на актуальный ID, если требуется
        user_id: userId,
        course_id: courseId,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.acc_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          console.log("Failed to add user to course");
        }

        const data = await response.json();
        pageStore.get_user_data(pageStore.user_data.id);
      } catch (error) {
        console.error("Error adding user to course:", error);
      }
    }

    async function fetchCourseKey(textKey) {
      const url = `https://me-course.com:8069/api/course/key/text/${textKey}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.acc_token}`,
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch data");
        }

        const data = await response.json();
        await addUserToCourse(pageStore.user_data.id, data.course_id);
      } catch (error) {
        console.error("Error fetching course key:", error);
      }
    }
    fetchCourseKey(location.state?.segment);
  });
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
        <Greetings />
      </VStack>
    </VStack>
  );
});

export default MainPage;
