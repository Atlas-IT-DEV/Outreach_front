import { HStack, VStack, Text } from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";

import { observer } from "mobx-react-lite";
import Greetings from "../components/greerings";
import VideoInfo from "../components/video_info";
import VideoUploadForm from "../components/video_upload";

const VideoPage = observer(() => {
  const { pageStore, mainStore } = useStores();
  useEffect(() => {
    pageStore.get_videos();
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
            Ваши видео
          </Text>
          <HStack width={"100%"} align={"flex-start"}>
            <VStack width={"100%"} align={"flex-start"}>
              <Text
                color={"#4682B4"}
                fontWeight={500}
                fontSize={["16px", "20px"]}
              >
                Важно знать
              </Text>
              <Text>
                В этом разделе вы можете загружать свои видео на сервер, чтобы
                мы обработали их в нужный формат и обеспечили полную защиту от
                незаконного скачивания материала. Для вставки видео в
                определенный урок найдите название вашего видео в заголовке
                одного из блоков и нажмите "Скопировать url". Дальше просто
                вставьте этот url в нужное поле при создании или обновлении
                урока в разделе "Управление".
              </Text>
              <Text
                marginTop={"30px"}
                color={"#4682B4"}
                fontWeight={500}
                fontSize={["16px", "20px"]}
              >
                Загрузить свои видео
              </Text>
              <VideoUploadForm />
            </VStack>
          </HStack>
        </VStack>
        <VStack align={"flex-start"}></VStack>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          width={"100%"}
          spacing={4}
          onClick={() => console.log(pageStore.videos)}
        >
          {pageStore.videos.map((video) => (
            <VideoInfo video={video} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
});

export default VideoPage;
