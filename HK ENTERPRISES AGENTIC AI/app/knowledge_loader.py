from pathlib import Path

from bs4 import BeautifulSoup

BASE_DIR = Path(__file__).resolve().parents[2]
WEBSITE_FOLDER = BASE_DIR / "frontend"

def extract_text_from_html(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    for tag in soup(["script", "style"]):
        tag.decompose()

    return soup.get_text(separator=" ", strip=True)


def load_website_content():
    documents = []

    for file_path in WEBSITE_FOLDER.glob("*.html"):
        if file_path.is_file():
            text = extract_text_from_html(file_path)
            documents.append(text)

    return documents
