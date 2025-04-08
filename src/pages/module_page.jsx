import {
  HStack,
  VStack,
  Text,
  Image,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { useLocation, useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { observer } from "mobx-react-lite";
import redact from "../redact";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import useWindowDimensions from "../windowDimensions";
import LessonDropdown from "../components/lesson_card";
import { useEffect, useState } from "react";

const ModulePage = observer(() => {
  const { pageStore, mainStore } = useStores();
  const { width, height } = useWindowDimensions();
  const navigate = useNavigate();
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const createVideoView = async (video_id) => {
    const response = await fetch(
      `https://me-course.com:8069/api/users/video/views/`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${pageStore.acc_token}`,
        },
        body: JSON.stringify({
          id: 0,
          user_id: pageStore.user_data.id,
          video_id: video_id,
          module_id: location.state.id,
          course_id: location.state.course_id,
        }),
      }
    );
  };
  useEffect(() => {
    setVideos(
      location.state.videos.map((video) => ({
        ...video,
        was_view: pageStore.views.some(
          (w) => w.module_id == location.state.id && w.video_id == video.id
        ),
      }))
    );
  }, [pageStore.views]);
  useEffect(() => {
    pageStore.get_video_views();
  }, []);

  return (
    <VStack
      width={"100%"}
      marginLeft={mainStore.isOpen ? "280px" : "0px"}
      p={["10px", "13px", "40px"]}
    >
      <VStack
        width={mainStore.isOpen ? "80%" : "100%"}
        alignSelf={"center"}
        spacing={10}
        marginTop={"30px"}
      >
        <Button
          backgroundColor={"#4682B4"}
          boxShadow={"0px 0px 15px 4px rgba(0,0,0,0.08);"}
          color={"white"}
          alignSelf={"flex-start"}
          position={"fixed"}
          top={5}
          right={5}
          onClick={() => {
            navigate("/course", { state: location.state.course });
          }}
          zIndex={9999}
        >
          {mainStore.isOpen ? "Обратно к курсу" : "Обратно"}
        </Button>
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
            alignSelf={"flex-start"}
          ></Text>
          <HStack width={"100%"} align={"flex-start"}>
            <VStack width={"80%"} align={"flex-start"}>
              <Text
                color={"#4682B4"}
                fontWeight={500}
                fontSize={["16px", "20px"]}
              >
                {location.state.title}
              </Text>
              <Text>{redact(location.state.description)}</Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack width={"100%"}>
          {videos.map((video) => (
            <LessonDropdown
              title={video.title}
              position={video.position}
              description={video.description}
              videoUrl={video.video_url}
              isCompleted={video.was_view}
              onComplete={async () => {
                await createVideoView(video.id);
                pageStore.get_video_views();
              }}
            />
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
});

export default ModulePage;
