import dayjs from "dayjs";




const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  const formatDateTime = (dateString) => {
    if(dateString){
      return dayjs(dateString).format("DD/MM/YYYY HH:mm:ss");

    }
    return "";
  };
  const generateUID = () => {
    const timestamp = Date.now(); 
    const randomNum = Math.floor(Math.random() * 1000000); 
    return `${timestamp}-${randomNum}`;
  };
   function encodeUrlSafe(str) {
    // Chuyển string sang Uint8Array
    const bytes = new TextEncoder().encode(str);
    // Chuyển Uint8Array sang base64
    let base64 = btoa(String.fromCharCode(...bytes));
    // Thay đổi để url-safe
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const pad = (n) => n.toString().padStart(2, '0');
  
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  function formatForDisplay(msTimestamp) {
    const date = new Date(msTimestamp);
  
    const pad = (n) => n.toString().padStart(2, '0');
  
    const day = pad(date.getDate());
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
  
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  }
  function formatTodayVn(){
    const now = new Date();
    const formatted =
    `Ngày ${now.getDate().toString().padStart(2, "0")} Tháng ${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")} Năm ${now.getFullYear()} \u00A0 ` +
    `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    return formatted;
  }
  function formatTodayInternational() {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(now);
  }
  function convertDevice(userAgent){
     // Gộp thống kê thiết bị theo userAgent
     let stats = "";
  
    const ua = userAgent || "";
  
      if (/iPhone|iPad|iOS/i.test(ua)) {
        stats="IOS";
      } else if (/Android/i.test(ua)) {
  
        stats="Android";
      } else if (/Windows NT/i.test(ua)) {
       
        stats="Windows";
      } else if (/Macintosh|Mac OS/i.test(ua)) {
      
        stats="macOS";

      } else {
        stats="other";

      }
  return stats;
  }

  const deleteCookie = (name, path = "/") => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  };
  function setCookie(name, value, days=365) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
  }
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }
  const setPromtRegister = () => {
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 phút sau
    const data = {
      value: true,
      expiresAt,
    };
    localStorage.setItem('promtRegister', JSON.stringify(data));
  };
  const getPromtRegister = () => {
    const item = localStorage.getItem('promtRegister');
    if (!item) return false;
  
    try {
      const data = JSON.parse(item);
      if (Date.now() > data.expiresAt) {
        localStorage.removeItem('promtRegister'); // Hết hạn thì xoá
        return false;
      }
      return data.value === true;
    } catch  {
      localStorage.removeItem('promtRegister'); // lỗi format
      return false;
    }
  };
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    return { userAgent, platform };
  };
  function checkIsMobile() {
    if (typeof window === "undefined") return false; // để SSR an toàn
  
    const ua = navigator.userAgent || navigator.vendor || (window).opera || "";
    return /Android|iPhone|iPad|Mobile/i.test(ua);
  }
  function decodeUrlSafe(base64) {
    // Chuyển ký tự URL-safe về chuẩn Base64
    let str = base64.replace(/-/g, '+').replace(/_/g, '/');
  
    // padding về chuẩn Base64
    while (str.length % 4) {
      str += '=';
    }
  
    try {
      return decodeURIComponent(
        atob(str)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (e) {
      console.error("decodeUrlSafe error:", e);
      return null;
    }
  }
  export {formatPrice,formatDateTime,generateUID,encodeUrlSafe,formatTimestamp,formatForDisplay,convertDevice,formatTodayVn,formatTodayInternational,setCookie,getCookie,setPromtRegister,getPromtRegister,getDeviceInfo,deleteCookie,checkIsMobile,decodeUrlSafe}