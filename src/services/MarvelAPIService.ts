import { prismaClient } from "../prisma"
import axios from "axios"
import crypto from "crypto"

class MarvelAPIService {

    private URI = 'https://gateway.marvel.com:443/v1/public'

    async getCharacters(user_id: string, limit: string, offset: string) {
        const { data: response } = await this.getMarvel('characters', limit, offset)
        const userFavorites = await this.getFavorites(user_id, 'characters')
        return { ...response.data, results: this.setIsFavorite(userFavorites, response) }
    }

    async getComics(user_id: string, limit: string, offset: string) {
        const { data: response } = await this.getMarvel('comics', limit, offset)
        const userFavorites = await this.getFavorites(user_id, 'comics')
        return { ...response.data, results: this.setIsFavorite(userFavorites, response) }
    }

    getMarvel(content: string, limit: string, offset: string) {
        const ts = new Date().getTime()
        const hash = crypto.createHash('md5').update(ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_API_KEY).digest('hex')

        return axios.get(`${this.URI}/${content}?apikey=${process.env.MARVEL_API_KEY}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}`, {
            headers: {
                "Accept": "application/json"
            }
        })
    }

    getFavorites(user_id, type) {
        return prismaClient.userFavorites.findMany({
            where: {
                userId: user_id,
                type: type
            }
        })
    }

    setIsFavorite(listFavorite, list) {
        const finalList = list.data.results.map(value => {
            const isFavorite = listFavorite.find(userFavorite => userFavorite.marvelId === value.id)

            return {
                name: value.name || value.title,
                description: value.description,
                thumbnail: value.thumbnail.path + '.' + value.thumbnail.extension,
                link: value.resourceURI,
                isFavorite: !!isFavorite
            }
        })

        return finalList
    }

}

export { MarvelAPIService };