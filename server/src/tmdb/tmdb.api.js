import axiosClient from "axios"
import tmdbEndpoints from "./tmdb.endpoints.js"

const tmdbApi = {
    mediaList: async ({mediaType, mediaCategory, page}) => await axiosClient.get(
        tmdbEndpoints.mediaList({ mediaType, mediaCategory, page})
    ),
    mediaDetail: async ({mediaType, page}) => await axiosClient.get(
        tmdbEndpoints.mediaDetail({mediaType, page})
    ),
    mediaGenres: async ({mediaType}) => await axiosClient.get(
        tmdbEndpoints.mediaGenres({mediaType})
    ),
    mediaCredits: async ({mediaType, mediaId}) => await axiosClient.get(
        tmdbEndpoints.mediaCredits({mediaType, mediaId})
    ),
    mediaVideos: async ({mediaType, mediaId}) => await axiosClient.get(
        tmdbEndpoints.mediaVideos({mediaType, mediaId})
    ),
    mediaImages: async ({mediaType, mediaId}) => await axiosClient.get(
        tmdbEndpoints.mediaImages({mediaType, mediaId})
    ),
    mediaRecommend: async ({mediaType, mediaId}) => await axiosClient.get(
        tmdbEndpoints.mediaRecommend({mediaType, mediaId})
    ),
    mediaSearch: async ({mediaType, mediaId}) => await axiosClient.get(
        tmdbEndpoints.mediaSearch({mediaType, mediaId})
    ),
    personDetail: async ({personId}) => await axiosClient.get(
        tmdbEndpoints.personDetail({personId})
    ),
    personMedias: async ({personId}) => await axiosClient.get(
        tmdbEndpoints.personMedias({personId})
    )
}

export default tmdbApi