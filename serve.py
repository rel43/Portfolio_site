from __future__ import annotations

import argparse
import functools
import http.server
import socketserver
import sys
import threading
import webbrowser
from pathlib import Path


SITE_DIR = Path(__file__).resolve().parent
START_PAGE = "index.html"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, format: str, *args: object) -> None:
        print("%s - %s" % (self.address_string(), format % args))


def main() -> int:
    parser = argparse.ArgumentParser(description="Start the local portfolio website.")
    parser.add_argument("--port", type=int, default=8000, help="Preferred port. Use 0 for any free port.")
    parser.add_argument("--no-browser", action="store_true", help="Start the server without opening a browser.")
    args = parser.parse_args()

    handler = functools.partial(QuietHandler, directory=str(SITE_DIR))

    try:
        server = socketserver.ThreadingTCPServer(("127.0.0.1", args.port), handler)
    except OSError:
        if args.port == 0:
            raise
        print(f"Port {args.port} is busy, using a free port instead.")
        server = socketserver.ThreadingTCPServer(("127.0.0.1", 0), handler)

    server.daemon_threads = True
    host, port = server.server_address
    url = f"http://{host}:{port}/{START_PAGE}"

    print(f"Serving: {SITE_DIR}")
    print(f"Open:    {url}")
    print("Press Ctrl+C to stop.")

    if not args.no_browser:
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()

    return 0


if __name__ == "__main__":
    sys.exit(main())
