import { groq } from 'next-sanity';

export const fetchMatchFantasyQuery = (id: string) => groq`*[_type == "match" && _id == "${id}"]{
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
    gender,
    fantasy,
    category,
}`;

export const fetchMatchStatusQuery = (id: string) => groq`*[_type == "match" && _id == "${id}"]{
    status,
}`;
