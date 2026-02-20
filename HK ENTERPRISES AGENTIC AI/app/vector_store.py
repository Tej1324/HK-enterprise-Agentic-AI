import os
import faiss
import numpy as np
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer

# -------------------------------
# CONFIG
# -------------------------------
FRONTEND_PATH = "/Users/tejakodiyala/Desktop/HK ENTERPRIZE/frontend"
CHUNK_SIZE = 250   # characters per chunk
TOP_K = 3

# -------------------------------
# LOAD MODEL
# -------------------------------
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

documents = []

# -------------------------------
# LOAD + CHUNK HTML FILES
# -------------------------------
for file in os.listdir(FRONTEND_PATH):
    if file.endswith(".html"):
        with open(os.path.join(FRONTEND_PATH, file), "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")

            # Remove script/style
            for script in soup(["script", "style"]):
                script.extract()

            text = soup.get_text(separator=" ", strip=True)

            # Chunk text
            for i in range(0, len(text), CHUNK_SIZE):
                chunk = text[i:i + CHUNK_SIZE]

                # Avoid very small chunks
                if len(chunk.strip()) > 50:
                    documents.append(chunk)

# -------------------------------
# CREATE FAISS INDEX
# -------------------------------
if documents:
    embeddings = model.encode(documents, convert_to_numpy=True)

    # Normalize for cosine similarity
    faiss.normalize_L2(embeddings)

    dimension = embeddings.shape[1]
    index = faiss.IndexFlatIP(dimension)
    index.add(embeddings)

else:
    index = None



# -------------------------------
# RETRIEVAL FUNCTION
# -------------------------------
def retrieve_relevant_chunks(query, top_k=TOP_K):

    if index is None:
        return []

    query_embedding = model.encode([query], convert_to_numpy=True)
    faiss.normalize_L2(query_embedding)

    distances, indices = index.search(query_embedding, top_k)

    results = []

    for i in range(len(indices[0])):
        idx = indices[0][i]
        score = float(distances[0][i])

        if idx < len(documents):   # safety check
            print("DEBUG:", idx, score)
            results.append({
                "text": documents[idx],
                "score": score
            })

    return results
