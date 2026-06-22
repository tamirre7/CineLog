-- 1. Users Table (Supports standard email/password and Google OAuth)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50),
    password_hash VARCHAR(255), 
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Media Items Table (Acts as a local cache to minimize external API calls)
CREATE TABLE media_items (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(100) NOT NULL,
    api_source VARCHAR(20) NOT NULL, -- e.g., 'Jikan' or 'TMDB'
    media_type VARCHAR(20) NOT NULL, -- e.g., 'Anime', 'Movie', 'TV'
    title VARCHAR(255) NOT NULL,
    poster_url VARCHAR(500),
    synopsis TEXT,
    UNIQUE(external_id, api_source) 
);

-- 3. User Media List (Tracks the personal status and rating for each user's media)
CREATE TABLE user_media_list (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    media_item_id INTEGER REFERENCES media_items(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('Watching', 'Completed', 'PlanToWatch')),
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    PRIMARY KEY(user_id, media_item_id)
);

-- 4. Watched Episodes (Tracks exact progress, row per watched episode)
CREATE TABLE watched_episodes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    media_item_id INTEGER REFERENCES media_items(id) ON DELETE CASCADE,
    episode_number INTEGER NOT NULL,
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Sessions Table (For managing user login sessions)
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    expires_at TIMESTAMP NOT NULL
);