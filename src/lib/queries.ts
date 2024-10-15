import { groq } from 'next-sanity';
import { allPlayerFields } from './fields';

const teamPlayerFields = `{
    _id,
    displayName,
    fullName,
    position,
    "profile": profile.asset->url,
    gender,
}`;

export const playersQuery = groq`*[_type == "player"]{
    _id,
    displayName,
    fullName,
    "profile": profile.asset->url,
    gender,
}`;

export const teamsFootQuery = groq`*[_type == "team" && category == "football"]{
    _id,
    players,
    isOfficial,
    name,
    category,
    "logo": logo.asset->url,
}`;

export const teamsStatsFootQuery = groq`*[_type == "team" && category == "football" && isOfficial==true]{
    _id,
    players,
    isOfficial,
    name,
    "logo": logo.asset->url,
    stats,
}`;

export const teamsStatsQuery = groq`*[_type == "team"]{
    _id,
    players,
    isOfficial,
    name,
    "logo": logo.asset->url,
    stats,
    category,
    gender,
}`;

export const playersFootQuery = groq`*[_type == "team" && category == "football"]{
    _id,
    name,
    category,
    players[]-> ${teamPlayerFields} ,
    gender,
}`;

export const playersByTeamQuery = (id: string) => groq`*[_type== "team" && "_id"==${id}]{
    players[]->{
        _id,
        displayname,
        fullName,
        position,
        "profile": profile.asset->url,
        gender,
    }
} `;

export const playersBaccoQuery = groq`*[_type == "team" && category == "basketball"]{
    _id,
    name,
    category,
    gender,
    players[]->${teamPlayerFields},
}`;

export const playersVolleyQuery = groq`*[_type == "team" && category == "volleyball"]{
    _id,
    name,
    gender,
    category,
    players[]->${teamPlayerFields},
}`;

export const fetchPlayersAllQuery = groq`*[_type == "player"]${allPlayerFields}`;

export const teamsBasketQuery = groq`*[_type == "team" && category == "basketball"] {
    _id,
    players,
    isOfficial,
    name,
    category,
    "logo": logo.asset->url,
}`;

export const teamsVolleyQuery = groq`*[_type == "team" && category == "volleyball"]{
    _id,
    players,
    isOfficial,
    name,
    category,
    "logo": logo.asset->url,
}`;

export const fetchMatchesQuery = groq`*[_type == "match"] | order(date asc){
    _id,
    date,
    "homeTeam": homeTeam->{
        _id,
        name,
        "logo": logo.asset->url,
    },
    "awayTeam": awayTeam->{
        _id,
        name,
        "logo": logo.asset->url,
    },
    stats,
    type,
    status,
    category,
    gender,
}`;

export const playerFields = `{
            _id,
            displayName,
            fullName,
            position,
            "profile": profile.asset->url,
            number,
        }`;

export const fetchMatchByIdQuery = (id: string) => groq`*[_type == "match" && _id == "${id}"]{
    _id,
    date,
    gender,
    "homeTeam": homeTeam->{
        _id,
        name,
        "logo": logo.asset->url,
        players[]->${playerFields},
        category,
    },
    "awayTeam": awayTeam->{
        _id,
        name,
        "logo": logo.asset->url,
        players[]->${playerFields},
        category,
    },
    stats,
    homeTeamLineup,
    awayTeamLineup,
    events,
    status,
    category,
    fantasy,
}`;
