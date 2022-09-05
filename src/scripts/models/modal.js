export class Modal {
        static openCloseModal () {
        const loginBtn = document.querySelector(".nav__btnLogin")
        const modalLogin = document.querySelector(".modal__login")
        const btnCadastro = document.querySelector(".nav__btnCadastro")
        const modalCadastro = document.querySelector(".modal__cadastro")
        loginBtn.classList.add("buttonGrey1")


        btnCadastro.addEventListener("click", (e) => {
            e.preventDefault()
            modalCadastro.classList.toggle("showModal")
            modalLogin.classList.toggle("closeModal")
            modalCadastro.classList.remove("closeModal")
            modalLogin.classList.remove("closeModal")
            btnCadastro.classList.add("buttonGrey1")
            loginBtn.classList.remove("buttonGrey1")
        })

        const span = document.querySelector(".form__button--cadastreLog")
        span.addEventListener("click", (e) => {
            e.preventDefault()
            modalCadastro.classList.add("closeModal")
            modalCadastro.classList.remove("showModal")
            modalLogin.classList.remove("closeModal")
            modalLogin.classList.add("showModal")
            btnCadastro.classList.remove("buttonGrey1")
            loginBtn.classList.add("buttonGrey1")

        })

        const callCadastre = document.querySelector(".form__button--cadastre")
        callCadastre.addEventListener("click", (e) => {
            e.preventDefault()
            modalCadastro.classList.toggle("showModal")
            modalLogin.classList.remove("showModal")
            modalLogin.classList.add("closeModal")
            modalCadastro.classList.remove("closeModal")
            btnCadastro.classList.add("buttonGrey1")
            loginBtn.classList.remove("buttonGrey1")
        })
    }
}