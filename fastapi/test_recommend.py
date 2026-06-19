import asyncio
from app.api.v1.endpoints.recommendation import recommend_location
from unittest.mock import MagicMock

async def test():
    try:
        mock_req = MagicMock()
        res = recommend_location(
            db_name="Indonesia.Batam.Kuliner.202406162232",
            category="Padang restaurant",
            limit=5,
            subdistrict=None,
            kecamatan=None,
            request=mock_req,
            db=mock_req
        )
        print("Success, found", len(res["recommendations"]), "recommendations.")
    except Exception as e:
        import traceback
        traceback.print_exc()

asyncio.run(test())
