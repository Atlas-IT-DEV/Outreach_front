import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Text,
  useToast,
  Spinner,
  VStack,
  Progress,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

const VideoUploadForm = observer(() => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();
  const { pageStore } = useStores();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      setLoading(true);
      setProgress(0);

      try {
        // Получаем presigned URL от сервера
        const res = await fetch(
          `https://me-course.com:8069/api/courses/video/upload?user_id=${pageStore.user_data.id}`,
          {
            method: "POST",
          }
        );
        const { upload_url, video_id, object_name } = await res.json();

        if (!upload_url) throw new Error("Ошибка получения presigned URL");

        // Загружаем файл в MinIO с отслеживанием прогресса
        await uploadFileWithProgress(upload_url, file, setProgress);

        // Запускаем обработку видео
        await fetch(
          `https://me-course.com:8069/api/courses/video/process?object_name=${object_name}&user_id=${pageStore.user_data.id}`,
          {
            method: "POST",
          }
        );

        toast({ title: "Видео загружено и обрабатывается", status: "success" });
      } catch (error) {
        toast({ title: error.message, status: "error" });
      } finally {
        setLoading(false);
        setProgress(0);
      }
    },
    [toast]
  );

  const uploadFileWithProgress = async (url, file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
      xhr.onload = () =>
        xhr.status === 200 ? resolve() : reject(new Error("Ошибка загрузки"));
      xhr.onerror = () => reject(new Error("Ошибка сети"));
      xhr.send(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*",
  });

  return (
    <VStack
      {...getRootProps()}
      p={6}
      border="2px dashed gray"
      borderRadius="lg"
      textAlign="center"
      cursor="pointer"
      _hover={{ borderColor: "#4682B4" }}
      alignSelf={"flex-start"}
    >
      <input {...getInputProps()} />
      <Text>Перетащите видео сюда или кликните для выбора</Text>
      {loading && (
        <Progress
          value={progress}
          size="sm"
          width="100%"
          sx={{ "& > div": { backgroundColor: "#4682B4" } }} // Прямое задание цвета
          color={"white"}
          mt={2}
        />
      )}
      <Button
        mt={4}
        backgroundColor={"#4682B4"}
        color={"white"}
        isLoading={loading}
      >
        {loading ? <Spinner size="sm" /> : "Выбрать файл"}
      </Button>
    </VStack>
  );
});

export default VideoUploadForm;
