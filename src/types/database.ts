export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stickers: {
        Row: {
          id: string
          name: string
          slug: string
          category: 'cub_skin' | 'hive_skin' | 'star_sign' | 'field_stamp' | 'tool' | 'beesmas' | 'other'
          image_url: string | null
          value: number
          trend: 'up' | 'down' | 'stable'
          is_obtainable: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          category: 'cub_skin' | 'hive_skin' | 'star_sign' | 'field_stamp' | 'tool' | 'beesmas' | 'other'
          image_url?: string | null
          value: number
          trend?: 'up' | 'down' | 'stable'
          is_obtainable?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          category?: 'cub_skin' | 'hive_skin' | 'star_sign' | 'field_stamp' | 'tool' | 'beesmas' | 'other'
          image_url?: string | null
          value?: number
          trend?: 'up' | 'down' | 'stable'
          is_obtainable?: boolean
          updated_at?: string
        }
      }
      beequips: {
        Row: {
          id: string
          name: string
          slug: string
          category: 'regular' | 'beesmas'
          image_url: string | null
          base_value: number
          max_potential: number
          trend: 'up' | 'down' | 'stable'
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          category: 'regular' | 'beesmas'
          image_url?: string | null
          base_value: number
          max_potential?: number
          trend?: 'up' | 'down' | 'stable'
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          category?: 'regular' | 'beesmas'
          image_url?: string | null
          base_value?: number
          max_potential?: number
          trend?: 'up' | 'down' | 'stable'
          updated_at?: string
        }
      }
      bees: {
        Row: {
          id: string
          name: string
          slug: string
          rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'event'
          color: 'red' | 'blue' | 'colorless'
          energy: number
          speed: number
          attack: number
          gather_amount: number
          image_url: string | null
          description: string | null
          abilities: string[]
          gifted_ability: string | null
          obtain_method: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'event'
          color: 'red' | 'blue' | 'colorless'
          energy?: number
          speed?: number
          attack?: number
          gather_amount?: number
          image_url?: string | null
          description?: string | null
          abilities?: string[]
          gifted_ability?: string | null
          obtain_method?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'event'
          color?: 'red' | 'blue' | 'colorless'
          energy?: number
          speed?: number
          attack?: number
          gather_amount?: number
          image_url?: string | null
          description?: string | null
          abilities?: string[]
          gifted_ability?: string | null
          obtain_method?: string | null
        }
      }
      codes: {
        Row: {
          id: string
          code: string
          reward_description: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          reward_description: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          reward_description?: string
          is_active?: boolean
          created_at?: string
        }
      }
      hive_configs: {
        Row: {
          id: string
          user_id: string | null
          share_token: string
          config: Json
          stats: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          share_token: string
          config: Json
          stats?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          share_token?: string
          config?: Json
          stats?: Json | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          username: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          username?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          username?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Sticker = Database['public']['Tables']['stickers']['Row']
export type Beequip = Database['public']['Tables']['beequips']['Row']
export type Bee = Database['public']['Tables']['bees']['Row']
export type Code = Database['public']['Tables']['codes']['Row']
export type HiveConfig = Database['public']['Tables']['hive_configs']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

// Item type for trading (union of tradeable items)
export type TradableItem = Sticker | Beequip

// Category types
export type StickerCategory = 'cub_skin' | 'hive_skin' | 'star_sign' | 'field_stamp' | 'tool' | 'beesmas' | 'other'
export type BeequipCategory = 'regular' | 'beesmas'
export type BeeRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'event'
export type BeeColor = 'red' | 'blue' | 'colorless'
export type Trend = 'up' | 'down' | 'stable'
