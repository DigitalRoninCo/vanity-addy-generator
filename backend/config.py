from pydantic import BaseSettings

class Settings(BaseSettings):
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_PASSWORD: str | None = None
    REDIS_TLS: bool = False
    REDIS_CA_CERT_PATH: str | None = None

settings = Settings()
