// documents
import coach from './documents/coach';
import match from './documents/match';
import matchDay from './documents/matchday';
import player from './documents/player';
import team from './documents/team';
import trending from './documents/trending';

// objects
import { SchemaTypeDefinition } from 'sanity';
import insight from './documents/insight';
import event from './objects/event';
import fantasy from './objects/fantasy';
import lineup from './objects/lineup';
import matchStats from './objects/matchStats';
import matchStatus from './objects/matchStatus';
import matchTeamStats from './objects/matchTeamStats';
import overallTeamStats from './objects/overallTeamStats';

const objects = [matchStats, matchTeamStats, overallTeamStats, lineup, event, matchStatus, fantasy];

const documents = [player, team, matchDay, match, coach, trending, insight];

export const schemaTypes = [...objects, ...documents] as SchemaTypeDefinition[];
