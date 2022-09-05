import { Toast } from "../toast.js";
import { RenderDash } from "./dashboard.js";

export class Requests {
    static myToken = localStorage.getItem("brenoGram@token")
    static myId = localStorage.getItem("brenoGram@userId")

    static randomNumber(max) {
        return Math.floor(Math.random() * max + 1)
    }

    static async login(data) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${this.myToken}`
            },
            body: JSON.stringify(data)
        };

        const result = await fetch('https://m2-rede-social.herokuapp.com/api/users/login/', options)
            .then(response => response.json())
            .then(response => {
                if (response.token !== undefined) {
                    localStorage.setItem("brenoGram@token", response.token)
                    localStorage.setItem("brenoGram@userId", response.user_uuid)
                    Toast.create("Login efetuado com sucesso", "green")
                    window.location.replace("/src/pages/dashboard.html")
                }
            })
            .catch(err => {
                Toast.create("Email ou senha inválidos", "red")
            });

        return result
    }

    static async cadastre(data) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const result = await fetch('https://m2-rede-social.herokuapp.com/api/users/', options)
            .then(response => response.json())
            .then(response => {
                if (response.uuid != undefined) {
                    Toast.create("Cadastro realizado com sucesso", "green")
                } else {
                    Toast.create("Email ou senha inválidos", "red")

                }
            })
            .catch((err) => {
                console.log(err)
            })

        return result
    }

    static async getUsers() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${this.myToken}`
            }
        };

        await fetch(`https://m2-rede-social.herokuapp.com/api/users/${this.myId}/`, options)
            .then(response => response.json())
            .then(response => {
                RenderDash.postCamp(response)
            })
            .catch(err => console.error(err));
    }

    static async getAllUsers() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${this.myToken}`
            }
        };

        await fetch(`https://m2-rede-social.herokuapp.com/api/users/`, options)
            .then(response => response.json())
            .then(response => {
                RenderDash.followDash(response.results)
            })
            .catch(err => console.error(err));
    }

    static async getPosts() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${this.myToken}`
            },
        };

        await fetch(`https://m2-rede-social.herokuapp.com/api/posts/`, options)
            .then(response => response.json())
            .then(response => {
                RenderDash.postsDash(response.results)
            })
            .catch(err => console.error(err));
    }



    static async postLike(data) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${this.myToken}`
            },
            body: JSON.stringify(data)
        };

        await fetch('https://m2-rede-social.herokuapp.com/api/likes/', options)
            .then(response => response.json())
            .then(response => {

            })
            .catch(err => console.log(err));

    }

    static async deleteLike(data) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${this.myToken}`
            }
        };

        await fetch(`https://m2-rede-social.herokuapp.com/api/likes/${data}/`, options)
            .then(response => response.json())
            .then(response => {
                console.log(data)
                console.log(response)
            })
            .catch(err => console.log(err));

    }

    static async sendPost(data) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token 19eb00486e2c4e4b7215b822081a668318a38053'
            },
            body: JSON.stringify(data)
        };

        const result = await fetch('https://m2-rede-social.herokuapp.com/api/posts/', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                Toast.create("Post criado com sucesso", "green")
            })
            .catch(err => {
                Toast.create(`${err}`, "red")

            });
        return result
    }

    static async follow(data) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${this.myToken}`
            },
            body: JSON.stringify(data)
        };

        await fetch('https://m2-rede-social.herokuapp.com/api/users/follow/', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.log(err));

    }

    static async unfollow(data) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${this.myToken}`
            }
        };

        fetch(`https://m2-rede-social.herokuapp.com/api/users/unfollow/${data}/`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
}
Requests.getUsers()
Requests.getPosts()
Requests.getAllUsers()

// RenderDash.countLike()

