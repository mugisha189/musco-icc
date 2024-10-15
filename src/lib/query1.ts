import { groq } from 'next-sanity';
import { allPlayerFields } from './fields';

export const AllPlayersStatsQuery = groq`*[_type == "team"]{
    _id,
    name,
    category,
    gender,
    players[]->${allPlayerFields},
}`;

export const fetchMatchDayTitleQuery = (title: string) => groq`*[_type == "matchDay" && title == "${title}"]{
    _id,
    title,
    category,
    description,
    date,
    gender,
    "matches": matches[]->{
        _id,
        title,
        description,
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
        status,
        stats,
    },
}`;

export const getTrendsQuery = groq`*[_type == "trending"] | order(date desc){
    _id,
    title,
    description,
    "image": image.asset->url,
}`;

export const getTrendById = (id: string) => groq`*[_type == "trending" && _id == "${id}"]{
    _id,
    title,
    description,
    "image": image.asset->url,
    }`;

export const getInsightsQuery = groq`*[_type == "insight"]{
    _id,
    title,
    description,
    "image": image.asset->url,
}`;

export const fetchTeamByIdQuery = (id: string) => groq`*[_type == "team" && _id == "${id}"]{
    _id,
    name,
    category,
    players[]->${allPlayerFields},
    stats,
    "logo": logo.asset->url,
    isOfficial,
}`;
