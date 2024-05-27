import { optionCategory } from "./const";

const JsCoreHelper = {
  convertToSlug(str) {
    let slug = str.toLowerCase();
 
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra textbox có id “slug”

    return slug;
  },
  convertSelectToString (selectMuti) {
    let str = '';
    selectMuti.forEach((selectObj, index) => {
      if ((selectMuti.length - 1) == index) {
        str += `${selectObj.value}`
      } else {
        str += `${selectObj.value}, `
      }
    });
    return str;
  },
  convertStringToSelect (selectStr) {
    let arr = selectStr.split(", ");
    let catArr = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < optionCategory.length; j++) {
        if (arr[i] == optionCategory[j].value) {
          catArr.push(optionCategory[j])
        }
      }
    }
    return catArr;
  },
  getCatBySlug (slug) {
    for (let j = 0; j < optionCategory.length; j++) {
      if (slug == optionCategory[j].slug) {
        return optionCategory[j];
      }
    }
    return false;
  },
  showBootstrapModal(modalId, canClose) {
    const body = document.querySelector("body");

    const modal = document.getElementById(modalId);
    modal.classList.add("show");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("style", "display: block;");

    const modalBackDrop = document.createElement("div");
    modalBackDrop.className = "modal-backdrop fade show";
    body.appendChild(modalBackDrop);
    modal
      .querySelector(".btn-close")
      .addEventListener("click", function (event) {
        JsCoreHelper.hideModal(modalId);
      });
    if (canClose !== false) {
      modal.addEventListener("click", function (event) {
        const target = event.target;
        if (target.querySelector(".modal-body")) {
          JsCoreHelper.hideModal(modalId);
        }
      });
    }
  },
  hideBootstrapModal(modalId) {
    const body = document.querySelector("body");
    body.classList.remove("modal-open");
    body.style.cssText = "";

    const modal = document.getElementById(modalId);
    modal.classList.remove("show");
    modal.removeAttribute("aria-modal");
    modal.removeAttribute("role");
    modal.removeAttribute("style");

    const modalBackDrop = document.getElementsByClassName("modal-backdrop");
    if (modalBackDrop.length) {
      modalBackDrop[0].remove();
    }
  },
  clearModal() {
    const elements = document.getElementsByClassName("modal-backdrop");
    if (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    document.querySelectorAll(".modal.modal-origin.show").forEach((element) => {
      element.classList.remove("show");
      element.style.display = "none";
      element.removeAttribute("aria-modal");
      element.removeAttribute("role");
    });

    document.body.removeAttribute("style");
  },
  showMsg(msg, type = "success") {
    if (process.browser) {
      if (!msg) {
        return false;
      }
      try {
        if (typeof window === "undefined") return;
        window.$nuxt.$store.commit("alert/add", { message: msg, type: type });
        setTimeout(function () {
          window.$nuxt.$store.commit("alert/toggle");
        }, 3000);
      } catch (error) {
        console.log("push message", error);
      }
    }
  },
  showErrorMsg(msg) {
    return this.showMsg(msg, "error");
  },
  showModalMessage(message, title = "") {
    if (typeof window === "undefined") return;
    window.$nuxt.$store.commit("modal/set", {
      message: message,
      status: true,
      title: title,
    });
  },
};

export default JsCoreHelper;
