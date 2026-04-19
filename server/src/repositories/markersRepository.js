const pool = require('../db/pool');

const baseColumns = `
    id,
    slug,
    name,
    category,
    lat,
    lng,
    color,
    title,
    summary,
    detailed_content,
    data_summary,
    stats,
    image_url
`;

const mapRow = (row) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  type: row.category,
  lat: row.lat,
  lng: row.lng,
  color: row.color,
  title: row.title,
  content: row.summary,
  detailedContent: row.detailed_content,
  data: row.data_summary,
  stats: row.stats,
  image: row.image_url
});

async function listMarkers({ limit = 32, offset = 0, type } = {}) {
  const values = [];
  const conditions = [];

  if (type) {
    values.push(type);
    conditions.push(`category = $${values.length}`);
  }

  values.push(limit);
  const limitPlaceholder = `$${values.length}`;

  values.push(offset);
  const offsetPlaceholder = `$${values.length}`;

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `
    SELECT ${baseColumns}
    FROM markers
    ${whereClause}
    ORDER BY name ASC
    LIMIT ${limitPlaceholder}
    OFFSET ${offsetPlaceholder};
  `;

  const { rows } = await pool.query(query, values);
  return rows.map(mapRow);
}

async function getMarkerBySlug(slug) {
  const query = `
    SELECT ${baseColumns}
    FROM markers
    WHERE slug = $1
    LIMIT 1;
  `;
  const { rows } = await pool.query(query, [slug]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function searchMarkers(term, limit = 10) {
  if (!term || !term.trim()) {
    return listMarkers({ limit });
  }

  const pattern = `%${term.trim()}%`;
  const query = `
    SELECT ${baseColumns}
    FROM markers
    WHERE name ILIKE $1
       OR title ILIKE $1
       OR summary ILIKE $1
       OR detailed_content ILIKE $1
    ORDER BY name ASC
    LIMIT $2;
  `;

  const { rows } = await pool.query(query, [pattern, limit]);
  return rows.map(mapRow);
}

module.exports = {
  listMarkers,
  getMarkerBySlug,
  searchMarkers
};
