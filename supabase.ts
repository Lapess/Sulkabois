export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      game: {
        Row: {
          created_at: string;
          full_game: boolean;
          id: number;
          session_id: number;
        };
        Insert: {
          created_at?: string;
          full_game: boolean;
          id?: number;
          session_id: number;
        };
        Update: {
          created_at?: string;
          full_game?: boolean;
          id?: number;
          session_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "game_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "session";
            referencedColumns: ["id"];
          },
        ];
      };
      invitation: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          session_group_id: number;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          session_group_id: number;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          session_group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "invitations_session_group_id_fkey";
            columns: ["session_group_id"];
            isOneToOne: false;
            referencedRelation: "session_group";
            referencedColumns: ["id"];
          },
        ];
      };
      player: {
        Row: {
          created_at: string;
          id: number;
          isAdmin: boolean;
          name: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          isAdmin?: boolean;
          name?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          isAdmin?: boolean;
          name?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      player_group: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      session: {
        Row: {
          created_at: string;
          id: number;
          is_locked: boolean;
          session_date: string;
          session_group_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_locked?: boolean;
          session_date: string;
          session_group_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_locked?: boolean;
          session_date?: string;
          session_group_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "session_session_group_id_fkey";
            columns: ["session_group_id"];
            isOneToOne: false;
            referencedRelation: "session_group";
            referencedColumns: ["id"];
          },
        ];
      };
      session_group: {
        Row: {
          created_at: string;
          deleted: boolean;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          deleted?: boolean;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          deleted?: boolean;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      team: {
        Row: {
          court_side: number;
          created_at: string;
          game_id: number;
          id: number;
          player_id: number;
          points: number;
        };
        Insert: {
          court_side: number;
          created_at?: string;
          game_id: number;
          id?: number;
          player_id: number;
          points: number;
        };
        Update: {
          court_side?: number;
          created_at?: string;
          game_id?: number;
          id?: number;
          player_id?: number;
          points?: number;
        };
        Relationships: [
          {
            foreignKeyName: "team_game_id_fkey";
            columns: ["game_id"];
            isOneToOne: false;
            referencedRelation: "game";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "player";
            referencedColumns: ["id"];
          },
        ];
      };
      user_playergroup: {
        Row: {
          created_at: string;
          player_group_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          player_group_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          player_group_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_playergroup_player_group_id_fkey";
            columns: ["player_group_id"];
            isOneToOne: false;
            referencedRelation: "player_group";
            referencedColumns: ["id"];
          },
        ];
      };
      user_sessiongroup: {
        Row: {
          created_at: string;
          session_group_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          session_group_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          session_group_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_sessiongroup_session_group_id_fkey";
            columns: ["session_group_id"];
            isOneToOne: false;
            referencedRelation: "session_group";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
