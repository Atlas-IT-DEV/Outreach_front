import { makeAutoObservable } from "mobx";

class PageStore {
  products = [];
  storys = [];
  comments = [];
  user_data = {}
  acc_token = null
  refresh_token = null
  views = []
  user_courses = []
  my_users = []
  courses = []
  my_courses = []
  all_views = []
  videos = []

  constructor() {
    makeAutoObservable(this);
  }
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
    this.videos = result.videos
  }
  get_all_views = async () => {
    const response = await fetch(
      `https://me-course.com:8069/api/users/video/views/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Authorization": `Bearer ${this.acc_token}`
        },
      }
    );
    const result = await response.json();
    this.all_views = result
  }
  getAllCourses = async () => {
    const response = await fetch(
      `https://me-course.com:8069/api/courses/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Authorization": `Bearer ${this.acc_token}`
        },
      }
    );
    const result = await response.json();
    const courses = [];

    // Проходим по массиву и собираем user_data.id для курсов с нужным creator_id
    result.forEach(item => {
      if (item.creator_id == this.user_data.id) {
        courses.push(item);
      }
    });

    this.my_courses = courses
    console.log(courses)
    this.courses = result
  }
  getUserCourses = async () => {
    const response = await fetch(
      `https://me-course.com:8069/api/users/curses/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Authorization": `Bearer ${this.acc_token}`
        },
      }
    );
    const result = await response.json();

    // Set для хранения уникальных user_data.id
    const uniqueUserIds = [];

    // Проходим по массиву и собираем user_data.id для курсов с нужным creator_id
    result.forEach(item => {
      if (item.course_data.creator_id === this.user_data.id && item.user_data.id != this.user_data.id && !uniqueUserIds.some((elem) => elem.id == item.user_data.id)) {
        uniqueUserIds.push(item.user_data);
      }
    });

    this.user_courses = result
    console.log(uniqueUserIds)
    this.my_users = uniqueUserIds

  }
  get_user_data = async (sub) => {
    const response = await fetch(
      `https://me-course.com:8069/api/users/${sub}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Authorization": `Bearer ${this.acc_token}`
        },
      }
    );
    const result = await response.json();
    this.user_data = result
  }
  get_video_views = async () => {
    const response = await fetch(`https://me-course.com:8069/api/users/video/views/user/{id}?user_id=${this.user_data?.id}`, { method: 'GET', headers: { 'accept': 'application/json', "Authorization": `Bearer ${this.acc_token}` } })
    const result = await response.json()
    if (response.status == 404) {
      this.views = []
    } else {
      this.views = result
    }
  }
  createUser = async (values) => {
    const response = await fetch('https://me-course.com:8069/api/users/', {
      method: "POST", headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify(values)
    })
    const result = await response.json()
    if (response.ok) {
      this.user_data = result.data
      this.acc_token = result.access_token
      this.refresh_token = result.refresh_token
    }
    return response
  }
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
    const result = await response_try_login.json()
    this.acc_token = result.access_token
    return response_try_login
  }

  getProducts = async () => {
    const response = await fetch(
      "https://apbstore.ru:8008/products/?dirs=true",
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    const result = await response.json();
    this.products = result;
  };
  getStorys = async () => {
    const response = await fetch("https://apbstore.ru:8008/storis/", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const result = await response.json();
    this.storys = result;
  };
  getComments = async () => {
    const response = await fetch(
      "https://apbstore.ru:8008/product_comments/?dirs=true",
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    const result = await response.json();
    this.comments = result;
  };
}

export default PageStore;
