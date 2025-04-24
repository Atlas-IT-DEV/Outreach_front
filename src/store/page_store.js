import { makeAutoObservable } from "mobx";

const base_url = "http://158.255.7.7:8081";

class PageStore {
  isOpen = true;
  token = "";
  user_info = {};

  bases = [];

  users = [];
  clients = [];
  leads = [];
  scripts = [];
  works = [];
  call_works = [];
  mail_works = [];
  tasks = [];

  emailTemplates = [];
  selected_script = {};
  searchValue = "";
  search_elements = [];

  selected_department = null;

  selected_base = [];

  generateText = {};

  constructor() {
    makeAutoObservable(this);
  }

  resetData = () => {
    this.token = "";
    this.user_info = {};
  };

  updateSearchElement = (new_search) => {
    this.search_elements = new_search;
  };

  updateSelectedScript = (new_scr) => {
    this.selected_script = new_scr;
  };

  updateSearchValue = (newValue) => {
    this.searchValue = newValue;
  };

  setIsOpen = (new_is_open) => {
    this.isOpen = new_is_open;
  };

  updateSelectedDepartament = (new_dep) => {
    this.selected_department = new_dep;
  };

  updateCallWorks = (new_works) => {
    this.call_works = new_works;
  };

  updateMailWorks = (new_works) => {
    this.mail_works = new_works;
  };

  updateGenerateText = (new_text) => {
    this.generateText = new_text;
  };

  // авторизация
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

  // базы
  getAllBases = async () => {
    const response = await fetch(
      `${base_url}/api/bases/${this.selected_department}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${this.token}`,
        },
      }
    );
    const result = await response.json();
    this.bases = result;
  };
  getBaseByName = async (name, page, size) => {
    const response = await fetch(
      `${base_url}/api/bases/${this.selected_department}/${name}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${this.token}`,
        },
      }
    );
    const result = await response.json();
    this.selected_base = result;
    console.log("select base", result);
  };
  uploadBase = async (name, formData) => {
    const response = await fetch(
      `${base_url}/api/bases/upload/${this.selected_department}/${name}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `${this.token}`,
        },
        body: formData,
      }
    );
    return response.ok;
  };

  // компании
  createCompamy = async (values) => {
    const response = await fetch(`${base_url}/api/companies`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    console.log("val", values);
    return response.ok;
  };
  getAllCompanies = async () => {
    const response = await fetch(`${base_url}/api/companies`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    const result = await response.json();
    this.clients = result;
  };
  editCompany = async (id, values) => {
    const response = await fetch(`${base_url}/api/companies/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };

  // сотрудники
  editUser = async (id, values) => {
    const response = await fetch(`${base_url}/api/users/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };
  getAllUsers = async () => {
    const response = await fetch(`${base_url}/api/users`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    const result = await response.json();
    this.users = result;
  };
  createUser = async (values) => {
    const response = await fetch(`${base_url}/api/users`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };

  // клиенты
  createClient = async (values) => {
    const response = await fetch(`${base_url}/api/clients`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };
  editClient = async (id, values) => {
    const response = await fetch(`${base_url}/api/clients/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };
  getAllClients = async () => {
    const response = await fetch(`${base_url}/api/clients`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    const result = await response.json();
    this.leads = result;
  };

  // скрипты
  getAllScripts = async () => {
    const response = await fetch(`${base_url}/api/scripts`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    const result = await response.json();
    this.scripts = result;
    console.log("scripts", result);
  };
  createScript = async (values) => {
    const response = await fetch(`${base_url}/api/scripts`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };
  editScript = async (id, values) => {
    const response = await fetch(`${base_url}/api/scripts/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };

  // рассылки
  getAllWorks = async () => {
    const response = await fetch(`${base_url}/api/works`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    const result = await response.json();
    this.works = result;
    this.updateCallWorks(
      result?.length != 0
        ? result.filter(
            (item) =>
              item?.department_id == this.selected_department &&
              item?.obzvon == "1"
          )
        : null
    );
    this.updateMailWorks(
      result?.length != 0
        ? result.filter(
            (item) =>
              item?.department_id == this.selected_department &&
              item?.obzvon == "0"
          )
        : null
    );
    console.log("works", result);
  };
  createWork = async (values) => {
    const response = await fetch(`${base_url}/api/works`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };
  editWork = async (id, values) => {
    const response = await fetch(`${base_url}/api/works/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };

  // таски
  getAllTasks = async () => {
    const response = await fetch(`${base_url}/api/tasks`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    const result = await response.json();
    this.tasks = result;
  };
  createTask = async (values) => {
    const response = await fetch(`${base_url}/api/tasks`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };
  completeTask = async (id) => {
    const response = await fetch(`${base_url}/api/tasks/complete/${id}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `${this.token}`,
      },
    });
    return response.ok;
  };
  updateTask = async (id, values) => {
    const response = await fetch(`${base_url}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${this.token}`,
      },
      body: JSON.stringify(values),
    });
    return response.ok;
  };

  generateGPT = async (values) => {
    const response = await fetch(`https://i-panel.pro:8808/gpt`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: values }),
    });

    const result = await response.json();
    this.generateText = result;
    return response.ok;
  };
}

export default PageStore;
