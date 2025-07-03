import importlib
import sys
import types
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch


@pytest.fixture(scope="module")
def main_module():
    sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
    stub_redis = types.ModuleType("redis")
    stub_redis.enqueue_job = lambda job: "job"
    stub_redis.get_job_status = lambda job_id: {}

    stub_config = types.ModuleType("config")
    stub_config.settings = types.SimpleNamespace(GPU_NODE_HOST="localhost", GPU_NODE_PORT=50051)

    stub_grpc = types.ModuleType("apps.backend.grpc_client")
    stub_grpc.generate_wallet_grpc = lambda *a, **k: None

    with patch.dict(sys.modules, {"redis": stub_redis, "config": stub_config, "apps.backend.grpc_client": stub_grpc}):
        import apps.backend.main as main
        importlib.reload(main)
        yield main


@pytest.fixture
def client(main_module):
    return TestClient(main_module.app, raise_server_exceptions=False)


def test_generate_success(client):
    expected = {"public_key": "pk", "secret_key": "sk"}
    with patch("apps.backend.main.generate_wallet_grpc", return_value=expected):
        res = client.post("/generate", params={"pattern": "abc"})
    assert res.status_code == 200
    assert res.json() == expected


def test_generate_error(client):
    with patch("apps.backend.main.generate_wallet_grpc", side_effect=Exception("boom")):
        res = client.post("/generate", params={"pattern": "abc"})
    assert res.status_code == 500
    assert res.text == "Internal Server Error"
