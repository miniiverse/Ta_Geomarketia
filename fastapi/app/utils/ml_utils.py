"""ML and spatial projection helper utilities for geospatial calculations."""

from __future__ import annotations

import logging
from pyproj import Transformer

logger = logging.getLogger(__name__)

# Projection transformers for WGS84 (EPSG:4326) <-> UTM Zone 48N (EPSG:32648)
try:
    _wgs84_to_utm = Transformer.from_crs("EPSG:4326", "EPSG:32648", always_xy=True)
    _utm_to_wgs84 = Transformer.from_crs("EPSG:32648", "EPSG:4326", always_xy=True)
except Exception as e:
    logger.error(f"Failed to initialize PyProj coordinate transformers: {e}")
    _wgs84_to_utm = None
    _utm_to_wgs84 = None


def project_point(lat: float, lng: float) -> tuple[float, float]:
    """Convert WGS84 coordinates (latitude, longitude) to UTM Zone 48N (Easting, Northing)."""
    if _wgs84_to_utm is None:
        raise RuntimeError("PyProj transformer is not initialized.")
    # pyproj expects x=lng, y=lat for EPSG:4326
    x, y = _wgs84_to_utm.transform(lng, lat)
    return x, y


def unproject_point(x: float, y: float) -> tuple[float, float]:
    """Convert UTM Zone 48N coordinates (Easting, Northing) to WGS84 (latitude, longitude)."""
    if _utm_to_wgs84 is None:
        raise RuntimeError("PyProj transformer is not initialized.")
    lng, lat = _utm_to_wgs84.transform(x, y)
    return lat, lng
