import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  players: {
    teams: r.many.teams(),
    userPlayerGroups: r.many.userPlayerGroups({
      from: r.players.user_id,
      to: r.userPlayerGroups.user_id,
    }),
    userSessionGroups: r.many.userSessionGroups({
      from: r.players.user_id,
      to: r.userSessionGroups.user_id,
    }),
  },
  playerGroups: {
    userPlayerGroups: r.many.userPlayerGroups(),
    sessionGroups: r.many.sessionGroups({
      from: r.playerGroups.id.through(
        r.playerGroupSessionGroups.player_group_id,
      ),
      to: r.sessionGroups.id.through(
        r.playerGroupSessionGroups.session_group_id,
      ),
    }),
  },
  sessionGroups: {
    session: r.many.sessions(),
    invitations: r.many.invitations(),
    userSessionGroups: r.many.userSessionGroups(),
    playerGroups: r.many.playerGroups({
      from: r.sessionGroups.id.through(
        r.playerGroupSessionGroups.session_group_id,
      ),
      to: r.playerGroups.id.through(r.playerGroupSessionGroups.player_group_id),
    }),
  },
  sessions: {
    sessionGroup: r.one.sessionGroups({
      from: r.sessions.session_group_id,
      to: r.sessionGroups.id,
    }),
    game: r.many.games(),
  },
  games: {
    session: r.one.sessions({
      from: r.games.session_id,
      to: r.sessions.id,
    }),
    team: r.many.teams(),
  },
  teams: {
    game: r.one.games({
      from: r.teams.game_id,
      to: r.games.id,
    }),
    player: r.one.players({
      from: r.teams.player_id,
      to: r.players.id,
    }),
  },
  invitations: {
    sessionGroup: r.one.sessionGroups({
      from: r.invitations.session_group_id,
      to: r.sessionGroups.id,
    }),
  },
  userPlayerGroups: {
    playerGroup: r.one.playerGroups({
      from: r.userPlayerGroups.player_group_id,
      to: r.playerGroups.id,
    }),
  },
  userSessionGroups: {
    sessionGroup: r.one.sessionGroups({
      from: r.userSessionGroups.session_group_id,
      to: r.sessionGroups.id,
    }),
  },
  playerGroupSessionGroups: {
    playerGroup: r.one.playerGroups({
      from: r.playerGroupSessionGroups.player_group_id,
      to: r.playerGroups.id,
    }),
    sessionGroup: r.one.sessionGroups({
      from: r.playerGroupSessionGroups.session_group_id,
      to: r.sessionGroups.id,
    }),
  },
}));
