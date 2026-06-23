
-- Users Table (Supports Auth and Public Sharing)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    share_token UUID DEFAULT gen_random_uuid() UNIQUE, 
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50),
    password_hash VARCHAR(255), 
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media Items Table (Cache for External APIs)
CREATE TABLE media_items (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(100) NOT NULL,
    api_source VARCHAR(20) NOT NULL,
    media_type VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    poster_url VARCHAR(500),
    synopsis TEXT,
    genres TEXT[], 
    total_episodes INTEGER, 
    UNIQUE(external_id, api_source) 
);

-- User Media List (The core tracker)
CREATE TABLE user_media_list (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    media_item_id INTEGER REFERENCES media_items(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('Watching', 'Completed', 'PlanToWatch', 'OnHold', 'Dropped')),
    episodes_watched INTEGER DEFAULT 0, 
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    review TEXT, 
    is_favorite BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(user_id, media_item_id)
);

-- Watched Episodes (Detailed analytics)
CREATE TABLE watched_episodes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    media_item_id INTEGER REFERENCES media_items(id) ON DELETE CASCADE,
    episode_number INTEGER NOT NULL,
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions Table (For auth tokens)
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    expires_at TIMESTAMP NOT NULL
);

-- ==========================================
-- 3. PERFORMANCE INDEXES
-- ==========================================
CREATE INDEX idx_user_media_user_id ON user_media_list(user_id);
CREATE INDEX idx_user_media_media_id ON user_media_list(media_item_id);
CREATE INDEX idx_watched_episodes_lookup ON watched_episodes(user_id, media_item_id);
