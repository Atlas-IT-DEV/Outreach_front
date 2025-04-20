import { makeAutoObservable } from "mobx";

const base_url = "http://158.255.7.7:8081";

class PageStore {
  isOpen = true;
  token = "";
  user_info = {};

  bases = [];

  clients = [];
  leads = [];
  scripts = [];
  works = [];

  emailTemplates = [];
  selected_script = {};
  search_elements = [];

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
  };
}

export default PageStore;
