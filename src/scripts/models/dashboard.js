import { Requests } from "./api.js"

export class RenderDash {
    static token = localStorage.getItem("brenoGram@token")
    static myId = localStorage.getItem("brenoGram@userId")

    static async postCamp(response) {
        const main = document.querySelector(".main__dashboard")
        const divPostagemInfo = document.createElement("div")
        divPostagemInfo.classList.add("main__postagem--info")

        const divPostagemImg = document.createElement("div")
        divPostagemImg.classList.add("main__postagem--img")
        const imgPerfil = document.createElement("img")

        const divPostagemTitles = document.createElement("div")
        divPostagemTitles.classList.add("main__postagem--titles")
        const titleName = document.createElement("h2")
        titleName.classList.add("title2")
        const textWork = document.createElement("span")
        textWork.classList.add("text2")
        const textFollow = document.createElement("p")
        textFollow.classList.add("text3")

        const form = document.createElement("form")
        const formInputTitle = document.createElement("input")
        formInputTitle.classList.add("inputDefault", "inputDefault:active", "inputDefault::placeholder", "form__input--titlePost")
        const formInputDesc = document.createElement("input")
        formInputDesc.classList.add("inputDefault", "inputDefault:active", "inputDefault::placeholder", "form__input--descPost")
        const formButton = document.createElement("button")
        formButton.classList.add("buttonPrimary", "form__input--button")

        const sair = document.querySelector(".nav__btnSair")
        if (this.token == undefined) {
            sair.innerHTML = "Login"
            sair.addEventListener("click", () => {
                window.location.replace("/index.html")
                localStorage.removeItem("brenoGram@token")
            })
        } else {
            sair.addEventListener("click", () => {
                window.location.replace("/index.html")
            })
        }

        imgPerfil.src = response.image
        titleName.innerText = response.username
        textWork.innerText = response.work_at
        textFollow.innerText = `${response.followers_amount} Seguidores`
        formInputDesc.placeholder = "Digitar descrição do post"
        formInputTitle.placeholder = "Digitar título do post"
        formButton.innerText = "Postar"


        formButton.addEventListener("click", (e) => {
            e.preventDefault()

            const body = {
                "title": formInputTitle.value,
                "description": formInputDesc.value
            }
            console.log(body)
            Requests.sendPost(body)

            form.reset()
        })

        form.append(formInputTitle, formInputDesc, formButton)
        divPostagemTitles.append(titleName, textWork, textFollow)
        divPostagemImg.append(imgPerfil)
        divPostagemInfo.append(divPostagemImg, divPostagemTitles, form)
        main.appendChild(divPostagemInfo)
    }

    static async postsDash(response) {
        const section = document.querySelector(".main__dashboard--section")
        const sectionUl = document.createElement("ul")
        const titlePosts = document.createElement("h2")
        titlePosts.classList.add("title1")
        titlePosts.innerText = "Posts"

        const data = response.forEach((elem) => {

            sectionUl.classList.add("section__ul")
            const sectionLi = document.createElement("li")
            sectionLi.classList.add("section__li")

            const sectionDiv = document.createElement("div")
            sectionDiv.classList.add("section__divInfo")
            const imgDivInfo = document.createElement("img")
            imgDivInfo.classList.add("section__divInfo--img")
            const nameAuthor = document.createElement("h3")
            nameAuthor.classList.add("title2")
            const workAuthor = document.createElement("span")
            workAuthor.classList.add("text2")

            const divText = document.createElement("div")
            divText.classList.add("section__divText")
            const titlePost = document.createElement("h2")
            titlePost.classList.add("title1")
            const resume = document.createElement("span")
            resume.classList.add("text1")


            const divButtons = document.createElement("div")
            divButtons.classList.add("section__divButtons")
            const button = document.createElement("button")
            button.classList.add("buttonGrey1", "section__button")
            const imgDivBtn = document.createElement("img")
            imgDivBtn.classList.add("section__divButtonsImg")
            const counter = document.createElement("p")
            counter.classList.add("text3")

            imgDivInfo.src = elem.author.image
            imgDivInfo.alt = elem.author.username
            workAuthor.innerText = elem.author.work_at
            nameAuthor.innerText = elem.author.username

            titlePost.innerText = elem.title
            resume.innerText = elem.description

            button.innerText = "Abrir Post"
            imgDivBtn.src = "/src/assets/Vector (1).png"
            counter.innerText = parseInt(elem.likes.length)

            for (let i = 0; i < elem.likes.length; i++) {
                if (elem.likes[i].user.uuid == this.myId) {
                    imgDivBtn.classList.add("imgLike")
                }
            }

            imgDivBtn.addEventListener("click", (e) => {
                imgDivBtn.classList.toggle("imgLike")
                const body = {
                    "post_uuid": elem.uuid
                }
                if (!imgDivBtn.classList.contains("imgLike")) {
                    counter.innerText = parseInt(elem.likes.length)
                    Requests.deleteLike(elem.uuid)
                }
                if (imgDivBtn.classList.contains("imgLike")) {
                    counter.innerText = parseInt(elem.likes.length) + 1
                    Requests.postLike(body)
                }
            })

            const main = document.querySelector(".main__postagem--info")
            const modal = document.querySelector(".div__modal")
            button.addEventListener("click", () => {
                modal.classList.add("showModal")
                section.classList.add("opacityBackgroundModal")
                main.classList.add("opacityBackgroundModal")

                this.modalPost(elem)
            })

            sectionDiv.append(imgDivInfo, nameAuthor, workAuthor)
            divText.append(titlePost, resume)
            divButtons.append(button, imgDivBtn, counter)
            sectionLi.append(sectionDiv, divText, divButtons)
            sectionUl.append(sectionLi)
        })
        section.append(titlePosts, sectionUl)

        return data
    }

    static async modalPost(response) {
        console.log(response)
        const section = document.querySelector(".main__dashboard--section")
        const modal = document.querySelector(".div__modal")

        const divImgTitle = document.createElement("div")
        divImgTitle.classList.add("modal__divImgTitle")
        const img = document.createElement("img")
        const nameAuthor = document.createElement("h2")
        nameAuthor.classList.add("title2")
        const workAuthor = document.createElement("span")
        workAuthor.classList.add("text2")

        divImgTitle.append(img, nameAuthor, workAuthor)

        const divModalPost = document.createElement("div")
        divModalPost.classList.add("div__modal--post")
        const titlePost = document.createElement("h2")
        titlePost.classList.add("title1")
        const resume = document.createElement("p")
        resume.classList.add("text2")
        const closeModal = document.createElement("p")
        closeModal.innerText = "X"
        closeModal.classList.add("title1", "closeModal")

        img.src = response.author.image
        nameAuthor.innerText = response.author.username
        workAuthor.innerText = response.author.work_at
        titlePost.innerText = response.title
        resume.innerText = response.description

        closeModal.addEventListener("click", (e) => {
            const modal = document.querySelector(".div__modal")
            const main = document.querySelector(".main__postagem--info")

            section.classList.remove("opacityBackgroundModal")
            main.classList.remove("opacityBackgroundModal")
            modal.classList.remove("showModal")
            modal.innerHTML = ""
        })

        divModalPost.append(titlePost, resume)
        modal.append(divImgTitle, divModalPost, closeModal)
    }

    static async followDash(response) {
        const aside = document.createElement("aside")
        const suggestion = document.createElement("h2")
        aside.append(suggestion)

        const data = response.forEach((elem) => {
            const main = document.querySelector(".main__dashboard")
            const asideUl = document.createElement("ul")
            const asideLi = document.createElement("li")
            const asideDiv = document.createElement("div")
            const imgPeople = document.createElement("img")
            const namePeople = document.createElement("h2")
            const workPeople = document.createElement("span")
            const buttonFollow = document.createElement("button")

            aside.classList.add("aside")
            suggestion.classList.add("title2")
            namePeople.classList.add("text1")
            workPeople.classList.add("text3")
            buttonFollow.classList.add("text3", "aside__button")

            suggestion.innerText = "Sugestões para você seguir"
            imgPeople.src = elem.image
            namePeople.innerText = elem.username
            workPeople.innerText = elem.work_at
            buttonFollow.innerText = "Seguir"


            buttonFollow.addEventListener("click", (e) => {
                buttonFollow.classList.toggle("buttonFollowing")
                if (buttonFollow.classList.contains("buttonFollowing")) {
                    buttonFollow.innerText = "Seguindo"
                    const data = {
                        "following_users_uuid": elem.uuid
                    }
                    
                    Requests.follow(data)
                } else {
                    buttonFollow.innerText = "Seguir"
                    const data = {
                        "following_users_uuid": elem.uuid
                    }
                    Requests.unfollow(data)
                }
            })
            asideDiv.append(namePeople, workPeople)
            asideLi.append(imgPeople, asideDiv, buttonFollow)
            asideUl.append(asideLi)
            aside.append(asideUl)
            main.append(aside)
        })
        return data
    }
}