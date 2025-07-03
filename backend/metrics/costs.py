from fastapi import APIRouter
from redis import Redis
from backend.config import settings

router = APIRouter()


def get_redis():
    return Redis(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        password=settings.REDIS_PASSWORD,
        ssl=settings.REDIS_TLS,
        ssl_ca_certs=settings.REDIS_CA_CERT_PATH
    )


@router.get("/metrics/costs")
def costs_metrics():
    r = get_redis()
    jobs = int(r.get("wallet_jobs") or 0)
    seconds = int(r.get("gpu_seconds") or 0)
    hours = round(seconds / 3600, 2)
    cost = round(hours * 0.9, 2)  # $0.90/hr spot

    return {
        "jobs_processed": jobs,
        "gpu_hours_used": hours,
        "estimated_cost_usd": cost
    }
