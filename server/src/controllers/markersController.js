const {
  listMarkers,
  getMarkerBySlug,
  searchMarkers
} = require('../repositories/markersRepository');

const clampLimit = (value, fallback = 32) => {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return Math.min(parsed, 100);
};

const formatResponse = (data, meta = {}) => ({
  data,
  meta: {
    count: Array.isArray(data) ? data.length : data ? 1 : 0,
    ...meta
  }
});

exports.getMarkers = async (req, res) => {
  const limit = clampLimit(req.query.limit);
  const offset = Number(req.query.offset) || 0;
  const type = req.query.type;

  const data = await listMarkers({ limit, offset, type });
  res.json(formatResponse(data, { limit, offset, type: type || null }));
};

exports.getMarker = async (req, res, next) => {
  const { slug } = req.params;
  const marker = await getMarkerBySlug(slug);

  if (!marker) {
    return res.status(404).json({
      error: 'NOT_FOUND',
      message: `未找到 slug 为 ${slug} 的监测点`
    });
  }

  return res.json(formatResponse(marker));
};

exports.searchMarkers = async (req, res) => {
  const query = req.query.q || '';
  const limit = clampLimit(req.query.limit, 12);

  const results = await searchMarkers(query, limit);
  res.json(
    formatResponse(results, {
      limit,
      query
    })
  );
};
