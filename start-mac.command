#!/bin/sh
cd "$(dirname "$0")" || exit 1

run_site() {
  if command -v python3 >/dev/null 2>&1; then
    exec python3 serve.py
  fi

  if command -v python >/dev/null 2>&1; then
    exec python serve.py
  fi
}

run_site

echo "Python 3 was not found."

if command -v brew >/dev/null 2>&1; then
  echo "Installing Python 3 with Homebrew..."
  brew install python
  run_site
else
  echo "Homebrew was not found, so automatic installation is not available."
  echo "Opening the official Python download page. Install Python 3, then run this file again."
  open "https://www.python.org/downloads/macos/"
fi

echo "Python 3 is still not available. Press Enter to close."
read -r _
