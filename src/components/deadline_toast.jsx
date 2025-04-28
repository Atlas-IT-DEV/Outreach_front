import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

// Компонент для отслеживания приближающихся дедлайнов
const DeadlineNotifier = ({ items }) => {
  const toast = useToast();
  const [notifiedDeadlines, setNotifiedDeadlines] = useState(new Set());

  useEffect(() => {
    const checkDeadlines = () => {
      const now = new Date();
      const newNotifications = [];

      items.forEach((item) => {
        if (!item.date_finish) return;

        const finishDate = new Date(item.date_finish);
        const timeDiff = finishDate.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        // Если осталось меньше 1 часа и ещё не уведомляли
        if (
          hoursDiff <= 1 &&
          hoursDiff > 0 &&
          !notifiedDeadlines.has(item.date_finish)
        ) {
          newNotifications.push(item.date_finish);
        }
      });

      // Показываем toast для новых уведомлений
      newNotifications.forEach((date) => {
        toast({
          title: "Внимание!",
          description: `До окончания задачи осталось менее часа (${new Date(
            date
          ).toLocaleString()})`,
          status: "warning",
          duration: null,
          isClosable: true,
          position: "bottom",
        });

        // Добавляем в множество уведомлённых
        setNotifiedDeadlines((prev) => new Set(prev).add(date));
      });
    };

    // Проверяем сразу при монтировании
    checkDeadlines();

    // Устанавливаем интервал для проверки каждую минуту
    const interval = setInterval(checkDeadlines, 1000);

    return () => clearInterval(interval);
  }, [items, notifiedDeadlines, toast]);

  return null; // Компонент ничего не рендерит
};

export default DeadlineNotifier;
