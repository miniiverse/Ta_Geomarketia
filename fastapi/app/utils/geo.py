"""Pure utility functions — geospatial helpers."""

import math


# ---------------------------------------------------------------------------
# Batam bounding box
#
# Mirrors the validation gate used by the training notebook
# (geomarketia-train/geomarketia_train.ipynb · Tahap 3). Points outside this
# box are dropped from any inference DataFrame so we never analyse coastal
# noise that DBSCAN never saw at training time.
# ---------------------------------------------------------------------------

BATAM_LAT_MIN: float = 1.00
BATAM_LAT_MAX: float = 1.30
BATAM_LNG_MIN: float = 103.60
BATAM_LNG_MAX: float = 104.20


def in_batam_bbox(lat: float, lng: float) -> bool:
    """Return True when (lat, lng) sits inside the Batam validation bbox."""
    return (
        BATAM_LAT_MIN <= lat <= BATAM_LAT_MAX
        and BATAM_LNG_MIN <= lng <= BATAM_LNG_MAX
    )


def haversine_km(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Return the great-circle distance between two points (in km).

    Uses the Haversine formula with Earth radius = 6 371 km.
    """
    R = 6371.0  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlng / 2) ** 2
    )
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
