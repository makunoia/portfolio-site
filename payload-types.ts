/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    projects: Project;
    pages: Page;
    'project-tags': ProjectTag;
    'my-roles': MyRole;
    'journal-entries': JournalEntry;
    'journal-entry-tags': JournalEntryTag;
    assets: Asset;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: string;
  title: string;
  type: string;
  year: string;
  desc: string;
  slug: string;
  status: 'ONGOING' | 'DONE';
  yearDone?: string | null;
  role: string | MyRole;
  tag: string | ProjectTag;
  sections?:
    | {
        title: string;
        htmlID: string;
        blocks?:
          | {
              lead: string;
              copy: string;
              htmlID: string;
              showcase?: Showcase[] | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  isLocked?: boolean | null;
  pagePhotos?: {
    codename?: string | null;
    password?: string | null;
  };
  isFeatured?: boolean | null;
  featuredData?: {
    image: string | Asset;
    gradientStart: string;
    gradientEnd: string;
  };
  isArchived?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "my-roles".
 */
export interface MyRole {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "project-tags".
 */
export interface ProjectTag {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Showcase".
 */
export interface Showcase {
  image: string | Asset;
  title: string;
  desc: string;
  tag?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'showcase';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "assets".
 */
export interface Asset {
  id: string;
  name?: string | null;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  name: 'Home' | 'Projects' | 'Journal' | 'About Me';
  intro?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  status?: ('employed' | 'open') | null;
  pagePhotos?: {
    portrait: string | Asset;
    cover: string | Asset;
  };
  sections?:
    | {
        title: string;
        layout: 'stack' | 'two-col';
        content: (InfoItem | BooleanItem | MediaItem | URLItem)[];
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "InfoItem".
 */
export interface InfoItem {
  label: string;
  desc: string;
  tag?: string | null;
  image?: (string | null) | Asset;
  id?: string | null;
  blockName?: string | null;
  blockType: 'info-item';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BooleanItem".
 */
export interface BooleanItem {
  label: string;
  value: boolean;
  id?: string | null;
  blockName?: string | null;
  blockType: 'boolean-item';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MediaItem".
 */
export interface MediaItem {
  label: string;
  genre: string;
  tag?: string | null;
  poster?: (string | null) | Asset;
  progress?: {
    episodeCount?: number | null;
    watchedCount?: number | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'media-item';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "URLItem".
 */
export interface URLItem {
  url: string;
  label: string;
  desc: string;
  tag?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'url-item';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "journal-entries".
 */
export interface JournalEntry {
  id: string;
  title: string;
  type: string;
  slug: string;
  date: string;
  tag: string | JournalEntryTag;
  blocks: {
    lead: string;
    copy: string;
    htmlID: string;
    showcase?: Showcase[] | null;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "journal-entry-tags".
 */
export interface JournalEntryTag {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}