const fs = require('fs');
const path = require('path');
const pool = require('../src/db/pool');

async function run() {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  await pool.query(schemaSql);
  console.log('[seed] 数据表检查完成 ✅');

  const markersPath = path.resolve(__dirname, '../src/data/markers.json');
  const markers = JSON.parse(fs.readFileSync(markersPath, 'utf8'));

  const insertSql = `
    INSERT INTO markers
      (slug, name, category, lat, lng, color, title, summary, detailed_content, data_summary, stats, image_url)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      category = EXCLUDED.category,
      lat = EXCLUDED.lat,
      lng = EXCLUDED.lng,
      color = EXCLUDED.color,
      title = EXCLUDED.title,
      summary = EXCLUDED.summary,
      detailed_content = EXCLUDED.detailed_content,
      data_summary = EXCLUDED.data_summary,
      stats = EXCLUDED.stats,
      image_url = EXCLUDED.image_url,
      updated_at = NOW();
  `;

  for (const marker of markers) {
    await pool.query(insertSql, [
      marker.slug,
      marker.name,
      marker.type,
      marker.lat,
      marker.lng,
      marker.color,
      marker.title,
      marker.content,
      marker.detailedContent,
      marker.data,
      marker.stats,
      marker.image
    ]);
  }

  console.log(`[seed] 已同步 ${markers.length} 条 markers 数据 ✅`);
}

run()
  .catch((err) => {
    console.error('[seed] 失败：', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
