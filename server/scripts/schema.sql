CREATE TABLE IF NOT EXISTS markers (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    color TEXT,
    title TEXT,
    summary TEXT,
    detailed_content TEXT,
    data_summary TEXT,
    stats JSONB,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_markers_category ON markers (category);

CREATE INDEX IF NOT EXISTS idx_markers_textsearch
    ON markers
    USING GIN (to_tsvector('simple',
        coalesce(name, '') || ' ' ||
        coalesce(title, '') || ' ' ||
        coalesce(summary, '') || ' ' ||
        coalesce(detailed_content, '')
    ));
