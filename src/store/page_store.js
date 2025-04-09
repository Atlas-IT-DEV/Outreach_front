import { makeAutoObservable } from "mobx";

class PageStore {
  isOpen = true;

  user_data = {};
  acc_token = null;
  refresh_token = null;
  views = [];
  user_courses = [];
  my_users = [];
  courses = [];
  my_courses = [];
  all_views = [];
  videos = [];

  leads = [
    {
      number: "+78005553535",
      callType: "Входящий",
      callStatus: "Пропущен",
      stage: "",
      createDate: "22.02.2022",
      responsible: "Иван Иванов",
    },
    {
      number: "+79999999999",
      callType: "Исходящий",
      callStatus: "Завершен",
      stage: "",
      createDate: "11.11.2025",
      responsible: "Петр Петров",
    },
    {
      number: "+89998887766",
      callType: "Входящий",
      callStatus: "Пропущен",
      stage: "",
      createDate: "22.02.2022",
      responsible: "Алексей Алексеев",
    },
    {
      number: "+79990001122",
      callType: "Исходящий",
      callStatus: "Завершен",
      stage: "",
      createDate: "23.05.2024",
      responsible: "John Doe",
    },
    {
      number: "+79876543210",
      callType: "Входящий",
      callStatus: "Пропущен",
      stage: "",
      createDate: "22.02.2022",
      responsible: "No Name",
    },
  ];

  crm_contacts = [
    {
      id: 1,
      fullName: "Иванов Иван Иванович",
      phoneNumber: "+7 (123) 456-78-90",
      company: "ООО 'Ромашка'",
      email: "ivanov@example.com",
      inn: "123456789012",
    },
    {
      id: 2,
      fullName: "Петрова Анна Сергеевна",
      phoneNumber: "+7 (987) 654-32-10",
      company: "АО 'Технологии'",
      email: "petrova@example.com",
      inn: "987654321098",
    },
    {
      id: 3,
      fullName: "Сидоров Алексей Дмитриевич",
      phoneNumber: "+7 (555) 123-45-67",
      company: "ПАО 'Нефтегаз'",
      email: "sidorov@example.com",
      inn: "456789012345",
    },
    {
      id: 4,
      fullName: "Кузнецова Елена Викторовна",
      phoneNumber: "+7 (777) 888-99-00",
      company: "ЗАО 'Стройинвест'",
      email: "kuznetsova@example.com",
      inn: "789012345678",
    },
    {
      id: 5,
      fullName: "Смирнов Денис Олегович",
      phoneNumber: "+7 (999) 111-22-33",
      company: "ИП Смирнов",
      email: "smirnov@example.com",
      inn: "345678901234",
    },
  ];

  database = [
    {
      date: "2024-03-15",
      segment: "База данных B2B",
      fullName: "Иванов Иван Иванович",
      company: "ООО 'Ромашка'",
      inn: "123456789012",
      addedToCRM: true,
      uploadAuthor: "Петрова А.С.",
      phoneNumber: "+7 (123) 456-78-90",
    },
    {
      date: "2024-03-16",
      segment: "База данных партнеров",
      fullName: "Петрова Анна Сергеевна",
      company: "АО 'Технологии'",
      inn: "987654321098",
      addedToCRM: false,
      uploadAuthor: "Сидоров А.Д.",
      phoneNumber: "+7 (987) 654-32-10",
    },
    {
      date: "2024-03-17",
      segment: "База данных клиентов",
      fullName: "Сидоров Алексей Дмитриевич",
      company: "ПАО 'Нефтегаз'",
      inn: "456789012345",
      addedToCRM: true,
      uploadAuthor: "Кузнецова Е.В.",
      phoneNumber: "+7 (555) 123-45-67",
    },
    {
      date: "2024-03-18",
      segment: "База данных поставщиков",
      fullName: "Кузнецова Елена Викторовна",
      company: "ЗАО 'Стройинвест'",
      inn: "789012345678",
      addedToCRM: true,
      uploadAuthor: "Смирнов Д.О.",
      phoneNumber: "+7 (777) 888-99-00",
    },
    {
      date: "2024-03-19",
      segment: "База данных ИП",
      fullName: "Смирнов Денис Олегович",
      company: "ИП Смирнов",
      inn: "345678901234",
      addedToCRM: false,
      uploadAuthor: "Иванов И.И.",
      phoneNumber: "+7 (999) 111-22-33",
    },
  ];

  emailTemplates = [
    {
      id: 1,
      is_fav: false,
      templateName: "Приветственное письмо новым клиентам",
      purpose: "Знакомство с компанией",
      targetAudience: "Новые клиенты, оформившие заказ",
      targetAction: "Повышение лояльности, повторные покупки",
      authorImage: "Менеджер по работе с клиентами",
      message:
        "Добрый день, {Имя}! Рады приветствовать вас среди наших клиентов. Хотим рассказать о ключевых преимуществах работы с нами...",
    },
    {
      id: 2,
      is_fav: false,
      templateName: "Акция для постоянных клиентов",
      purpose: "Стимулирование повторных покупок",
      targetAudience: "Клиенты с 2+ заказами",
      targetAction: "Покупка по акции",
      authorImage: "Руководитель отдела продаж",
      message:
        "Уважаемый {Имя}! Благодарим за доверие. Специально для вас — скидка 15% на следующий заказ до {дата}. Перейдите в каталог...",
    },
    {
      id: 3,
      is_fav: false,
      templateName: "Восстановление брошенной корзины",
      purpose: "Возврат потерянных продаж",
      targetAudience: "Пользователи, не завершившие заказ",
      targetAction: "Завершение покупки",
      authorImage: "Автоматизированная рассылка",
      message:
        "Вы забыли кое-что в корзине! Товары ждут вас: {список}. Для удобства сохранили вашу корзину. Оформите заказ за 2 клика!",
    },
    {
      id: 4,
      is_fav: true,
      templateName: "Приглашение на вебинар",
      purpose: "Привлечение потенциальных клиентов",
      targetAudience: "Подписчики рассылки",
      targetAction: "Регистрация на мероприятие",
      authorImage: "Эксперт компании",
      message:
        "Как увеличить продажи в 2024 году? Приглашаем на бесплатный вебинар {дата}. Спикер — {имя эксперта}. Зарегистрируйтесь сейчас!",
    },
    {
      id: 5,
      is_fav: true,
      templateName: "Обратная связь после покупки",
      purpose: "Сбор отзывов",
      targetAudience: "Клиенты, получившие заказ",
      targetAction: "Оставление отзыва",
      authorImage: "Служба заботы о клиентах",
      message:
        "{Имя}, надеемся, вы довольны покупкой! Поделитесь впечатлениями — это поможет нам стать лучше. Оставить отзыв можно здесь: {ссылка}.",
    },
  ];

  selected_script = {};

  constructor() {
    makeAutoObservable(this);
  }

  updateSelectedScript = (new_scr) => {
    this.selected_script = new_scr;
  };

  setIsOpen = (new_is_open) => {
    this.isOpen = new_is_open;
  };

  get_videos = async () => {
    const response = await fetch(
      `https://me-course.com:8069/api/courses/video/user-videos?user_id=${this.user_data.id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    const result = await response.json();
    this.videos = result.videos;
  };
  get_all_views = async () => {
    const response = await fetch(
      `https://me-course.com:8069/api/users/video/views/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.acc_token}`,
        },
      }
    );
    const result = await response.json();
    this.all_views = result;
  };
  getAllCourses = async () => {
    const response = await fetch(`https://me-course.com:8069/api/courses/`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.acc_token}`,
      },
    });
    const result = await response.json();
    const courses = [];

    // Проходим по массиву и собираем user_data.id для курсов с нужным creator_id
    result.forEach((item) => {
      if (item.creator_id == this.user_data.id) {
        courses.push(item);
      }
    });

    this.my_courses = courses;
    console.log(courses);
    this.courses = result;
  };
  getUserCourses = async () => {
    const response = await fetch(
      `https://me-course.com:8069/api/users/curses/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.acc_token}`,
        },
      }
    );
    const result = await response.json();

    // Set для хранения уникальных user_data.id
    const uniqueUserIds = [];

    // Проходим по массиву и собираем user_data.id для курсов с нужным creator_id
    result.forEach((item) => {
      if (
        item.course_data.creator_id === this.user_data.id &&
        item.user_data.id != this.user_data.id &&
        !uniqueUserIds.some((elem) => elem.id == item.user_data.id)
      ) {
        uniqueUserIds.push(item.user_data);
      }
    });

    this.user_courses = result;
    console.log(uniqueUserIds);
    this.my_users = uniqueUserIds;
  };
  get_user_data = async (sub) => {
    const response = await fetch(
      `https://me-course.com:8069/api/users/${sub}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.acc_token}`,
        },
      }
    );
    const result = await response.json();
    this.user_data = result;
  };
  get_video_views = async () => {
    const response = await fetch(
      `https://me-course.com:8069/api/users/video/views/user/{id}?user_id=${this.user_data?.id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.acc_token}`,
        },
      }
    );
    const result = await response.json();
    if (response.status == 404) {
      this.views = [];
    } else {
      this.views = result;
    }
  };
  createUser = async (values) => {
    const response = await fetch("https://me-course.com:8069/api/users/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    if (response.ok) {
      this.user_data = result.data;
      this.acc_token = result.access_token;
      this.refresh_token = result.refresh_token;
    }
    return response;
  };
  try_login = async (gmail, sub) => {
    let data_try_login = new URLSearchParams();
    data_try_login.append("client_id", "string");
    data_try_login.append("client_secret", "string");
    data_try_login.append("scope", null);
    data_try_login.append("grant_type", "password");
    data_try_login.append("username", `${gmail}`);
    data_try_login.append("password", `${sub}`);
    const response_try_login = await fetch(
      "https://me-course.com:8069/api/users/token",
      {
        method: "POST",
        headers: { accept: "application/json" },
        body: data_try_login,
      }
    );
    const result = await response_try_login.json();
    this.acc_token = result.access_token;
    return response_try_login;
  };
}

export default PageStore;
