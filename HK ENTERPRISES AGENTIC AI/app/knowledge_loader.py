import os
from bs4 import BeautifulSoup

# Absolute path to frontend folder
WEBSITE_FOLDER = "/Users/tejakodiyala/Desktop/HK ENTERPRIZE/frontend"

def extract_text_from_html(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    for tag in soup(["script", "style"]):
        tag.decompose()

    return soup.get_text(separator=" ", strip=True)


def load_website_content():
    documents = []

    for file in os.listdir(WEBSITE_FOLDER):
        if file.endswith(".html"):
            full_path = os.path.join(WEBSITE_FOLDER, file)
            text = extract_text_from_html(full_path)
            documents.append(text)

    return documents
