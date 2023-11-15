document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form-user')
    document.getElementById("form-user").addEventListener("submit", () => {
      const inputUser = document.getElementById('inputUser')
      let num = /^[A-Za-z\s]*$/;
      if (!num.test(inputUser.value)) {
        alert("NAMA TIDAK BOLEH BERISI ANGKA");
        document.getElementById("form-user").removeAttribute("action");
        return;
      }
      localStorage.setItem('USER', inputUser.value)
      form.action = 'page-2.html'
    });

});
export const user = localStorage.getItem('USER')