#!/usr/bin/env bash
# ^ Ensures this runs in bash

set -eo pipefail

echo "[Model Server] Waiting for dependencies..."
sleep 5

echo "[Model Server] Preloading models..."

python -c "
from transformers import AutoTokenizer
from huggingface_hub import snapshot_download
from sentence_transformers import SentenceTransformer

AutoTokenizer.from_pretrained('distilbert-base-uncased')
AutoTokenizer.from_pretrained('mixedbread-ai/mxbai-rerank-xsmall-v1')

snapshot_download(repo_id='onyx-dot-app/hybrid-intent-token-classifier', local_dir_use_symlinks=False)
snapshot_download(repo_id='onyx-dot-app/information-content-model', local_dir_use_symlinks=False)
snapshot_download(repo_id='nomic-ai/nomic-embed-text-v1', local_dir_use_symlinks=False)
snapshot_download(repo_id='mixedbread-ai/mxbai-rerank-xsmall-v1', local_dir_use_symlinks=False)

SentenceTransformer(model_name_or_path='nomic-ai/nomic-embed-text-v1', trust_remote_code=True)
"

echo "[Model Server] Starting API on port $MODEL_SERVER_PORT..."
exec uvicorn model_server.main:app --host 0.0.0.0 --port ${MODEL_SERVER_PORT:-8001}
