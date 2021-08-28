import {API_OPTIONS, baseAuthUrl, baseUrl, groupId} from "./constants";

class Api {
    constructor(options) {
        this._options = options;
    }

    getInitialCards() {
        return fetch(`${baseUrl}/v1/${groupId}/cards`, this._options).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, this._options).then(this._checkResponse);
    }

    setUserInfo(userName, userAbout) {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, {
            method: 'PATCH',
            ...this._options,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then(this._checkResponse);
    }

    setUserAvatar(avatarLink) {
        return fetch(`${baseUrl}/v1/${groupId}/users/me/avatar`, {
            method: 'PATCH',
            ...this._options,
            body: JSON.stringify({
                avatar: avatarLink
            })
        }).then(this._checkResponse);
    }

    createCard(cardName, cardLink) {
        return fetch(`${baseUrl}/v1/${groupId}/cards`, {
            method: 'POST',
            ...this._options,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${baseUrl}/v1/${groupId}/cards/${cardId}`, {
            method: 'DELETE',
            ...this._options,
        }).then(this._checkResponse);
    }

    addLike(cardId) {
        return fetch(`${baseUrl}/v1/${groupId}/cards/likes/${cardId}`, {
            method: 'PUT',
            ...this._options,
        }).then(this._checkResponse);
    }

    removeLike(cardId) {
        return fetch(`${baseUrl}/v1/${groupId}/cards/likes/${cardId}`, {
            method: 'DELETE',
            ...this._options,
        }).then(this._checkResponse);
    }

    getAllData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.addLike(cardId) : this.removeLike(cardId)
    }

    signup(user) {
        return fetch(`${baseAuthUrl}/signup`, {
            method: 'POST',
            ...this._options,
            body: JSON.stringify(
                user
            )
        }).then(this._checkResponse);
    }

    signin(user) {
        return fetch(`${baseAuthUrl}/signin`, {
            method: 'POST',
            ...this._options,
            body: JSON.stringify(
                user
            )
        }).then(this._checkResponse);
    }

    getUserEmailByToken(token) {
        return fetch(`${baseAuthUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponse);
    }
}

const api = new Api(API_OPTIONS);

export default api;