import { Requests } from "./api.js"

export class Login {
    static makeLogin() {
        const email = document.querySelector(".form__inputLog--email")
        const password = document.querySelector(".form__inputLog--pass")
        const btnLogar = document.querySelector(".form__button--login")

        btnLogar.addEventListener("click", (e) => {
            e.preventDefault()
            const content =
            {
                "email": email.value,
                "password": password.value
            }
            Requests.login(content)
        })
    }
}

export class Cadastre {
    static makeCadastro() {
        const btnRegistrar = document.querySelector(".form__button--register")
        const email = document.querySelector(".form__inputCad--email")
        const pass = document.querySelector(".form__inputCad--pass")
        const name = document.querySelector(".form__inputCad--name")
        const work = document.querySelector(".form__inputCad--work")
        const url = document.querySelector(".form__inputCad--url")

        

        btnRegistrar.addEventListener("click", (e) => {
            e.preventDefault()
            const content = {
                "username": name.value,
                "email": email.value,
                "password": pass.value,
                "work_at": work.value,
                "image": url.value
            }
            Requests.cadastre(content)
            console.log(content)
        })
    }

}