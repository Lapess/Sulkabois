import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const createdAt = () =>
  timestamp({ withTimezone: true, mode: "string" }).notNull().defaultNow();

export const players = pgTable("player", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  created_at: createdAt(),
  isAdmin: boolean().notNull().default(false),
  name: text(),
  user_id: uuid(),
});

export const playerGroups = pgTable("player_group", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  created_at: createdAt(),
  name: text(),
});

export const sessionGroups = pgTable("session_group", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  created_at: createdAt(),
  deleted: boolean().notNull().default(false),
  name: text(),
});

export const sessions = pgTable("session", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  created_at: createdAt(),
  is_locked: boolean().notNull().default(false),
  session_date: text().notNull(),
  session_group_id: integer().references(() => sessionGroups.id, {
    name: "session_session_group_id_fkey",
  }),
});

export const games = pgTable("game", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  created_at: createdAt(),
  full_game: boolean().notNull(),
  session_id: integer()
    .notNull()
    .references(() => sessions.id, { name: "game_session_id_fkey" }),
});

export const teams = pgTable("team", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  created_at: createdAt(),
  court_side: integer().notNull(),
  game_id: integer()
    .notNull()
    .references(() => games.id, { name: "team_game_id_fkey" }),
  player_id: integer()
    .notNull()
    .references(() => players.id, { name: "team_player_id_fkey" }),
  points: integer().notNull(),
});

export const invitations = pgTable("invitation", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  created_at: createdAt(),
  email: text().notNull(),
  session_group_id: integer()
    .notNull()
    .references(() => sessionGroups.id, {
      name: "invitations_session_group_id_fkey",
    }),
});

export const userPlayerGroups = pgTable(
  "user_playergroup",
  {
    created_at: createdAt(),
    player_group_id: integer()
      .notNull()
      .references(() => playerGroups.id, {
        name: "user_playergroup_player_group_id_fkey",
      }),
    user_id: uuid().notNull(),
  },
  (table) => [primaryKey({ columns: [table.user_id, table.player_group_id] })],
);

export const userSessionGroups = pgTable(
  "user_sessiongroup",
  {
    created_at: createdAt(),
    session_group_id: integer()
      .notNull()
      .references(() => sessionGroups.id, {
        name: "user_sessiongroup_session_group_id_fkey",
      }),
    user_id: uuid().notNull(),
  },
  (table) => [primaryKey({ columns: [table.user_id, table.session_group_id] })],
);

export const playerGroupSessionGroups = pgTable(
  "playergroup_sessiongroup",
  {
    player_group_id: integer()
      .notNull()
      .references(() => playerGroups.id, {
        name: "playergroup_sessiongroup_player_group_id_fkey",
      }),
    session_group_id: integer()
      .notNull()
      .references(() => sessionGroups.id, {
        name: "playergroup_sessiongroup_session_group_id_fkey",
      }),
  },
  (table) => [
    primaryKey({ columns: [table.player_group_id, table.session_group_id] }),
  ],
);
