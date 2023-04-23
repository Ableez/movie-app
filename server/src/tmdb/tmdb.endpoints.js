import tmdb_config from "./tmdb.config.js"

const tmdbEndpoints = {
    mediaList: ({mediaType, mediaCategory, page}) => tmdb_config.getUrl(
        `${mediaType}/${mediaCategory}`, page
    ),
    mediaDetail: ({mediaType, mediaId}) => tmdb_config.getUrl(
        `${mediaType}/${mediaId}`
    ),
    mediaGenres: ({mediaType}) => tmdb_config.getUrl(
        `genre/${mediaType}/list`
    ),
    mediaCredits: ({mediaType, mediaId}) => tmdb_config.getUrl(
        `${mediaType}/${mediaId}/credits`
    ),
    mediaVideos: ({mediaType, mediaId}) => tmdb_config.getUrl(
        `${mediaType}/${mediaId}/videos`
    ),
    mediaRecommend: ({mediaType, mediaId}) => tmdb_config.getUrl(
        `${mediaType}/${mediaId}/recommendations`
    ),
    mediaImages: ({mediaType, mediaId}) => tmdb_config.getUrl(
        `${mediaType}/${mediaId}/images`
    ),
    mediaSearch: ({mediaType, query, page}) => tmdb_config.getUrl(
        `search/${mediaType}`, {query, page}
    ),
    personDetail: ({personId}) => tmdb_config.getUrl(
        `person/${personId}`
    ),
    personMedias: ({personId}) => tmdb_config.getUrl(
        `person/${personId}/combined_credits`
    )
}
export default tmdbEndpoints