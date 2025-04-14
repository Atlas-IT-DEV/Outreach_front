import { makeAutoObservable } from "mobx";

const base_url = "http://158.255.7.7:8081";

class PageStore {
  isOpen = true;
  token = "";
  user_info = {};

  bases = [];

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

  search_elements = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateSearchElement = (new_search) => {
    this.search_elements = new_search;
  };

  updateSelectedScript = (new_scr) => {
    this.selected_script = new_scr;
  };

  setIsOpen = (new_is_open) => {
    this.isOpen = new_is_open;
  };

  login = async (values) => {
    const response = await fetch(`${base_url}/auth/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const result = await response.json();
      this.token = result.jwt_token;
      await this.getMe();
    }
    return response.ok;
  };

  getMe = async () => {
    const response = await fetch(`${base_url}/api/me`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    const result = await response.json();
    this.user_info = result.me;
    console.log("me", result.me);
  };

  getAllBases = async () => {
    const response = await fetch(`${base_url}/api/bases/`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    const result = await response.json();
    this.bases = result.data;
    console.log("getAllBases", response);
  };
}

export default PageStore;
