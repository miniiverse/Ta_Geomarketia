"""ML and spatial projection helper utilities for geospatial calculations."""

from __future__ import annotations

import logging
import math
from functools import lru_cache
from pyproj import Transformer

logger = logging.getLogger(__name__)

@lru_cache(maxsize=32)
def _get_transformer(from_crs: str, to_crs: str) -> Transformer:
    """Get a cached PyProj transformer."""
    try:
        return Transformer.from_crs(from_crs, to_crs, always_xy=True)
    except Exception as e:
        logger.error(f"Failed to initialize PyProj transformer {from_crs} -> {to_crs}: {e}")
        raise RuntimeError(f"Transformer initialization failed: {e}") from e

def get_utm_epsg(lat: float, lng: float) -> str:
    """Calculate the UTM EPSG code for a given latitude and longitude."""
    zone = int(math.floor((lng + 180) / 6) + 1)
    epsg = 32600 + zone if lat >= 0 else 32700 + zone
    return f"EPSG:{epsg}"

def project_point(lat: float, lng: float, epsg_code: str = "EPSG:32648") -> tuple[float, float]:
    """Convert WGS84 coordinates (latitude, longitude) to UTM (Easting, Northing)."""
    transformer = _get_transformer("EPSG:4326", epsg_code)
    # pyproj expects x=lng, y=lat for EPSG:4326
    x, y = transformer.transform(lng, lat)
    return x, y

def unproject_point(x: float, y: float, epsg_code: str = "EPSG:32648") -> tuple[float, float]:
    """Convert UTM coordinates (Easting, Northing) to WGS84 (latitude, longitude)."""
    transformer = _get_transformer(epsg_code, "EPSG:4326")
    lng, lat = transformer.transform(x, y)
    return lat, lng
