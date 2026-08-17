#!/usr/bin/env python3
"""
FSMS Ledgal — Web Server with Cloud Sync & Developer Broadcast REST API
"""

import http.server
import socketserver
import os
import json
import urllib.parse
from datetime import datetime

PORT = 3000
DATA_DIR = os.path.join(os.path.dirname(__file__), 'cloud_backups')
os.makedirs(DATA_DIR, exist_ok=True)

BROADCAST_FILE = os.path.join(DATA_DIR, 'developer_broadcast.json')

class LedgalRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(__file__), **kwargs)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_POST(self):
        # 1. Cloud Backup Sync
        if self.path == '/api/sync/backup':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode('utf-8'))
                sync_key = payload.get('syncKey', 'default').strip().lower()
                safe_key = "".join(c for c in sync_key if c.isalnum() or c in ('-', '_'))
                if not safe_key:
                    safe_key = 'default'

                backup_payload = {
                    'syncKey': safe_key,
                    'timestamp': datetime.utcnow().isoformat() + 'Z',
                    'data': payload.get('data', {})
                }

                file_path = os.path.join(DATA_DIR, f"{safe_key}.json")
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(backup_payload, f, ensure_ascii=False, indent=2)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                response = {
                    'status': 'success',
                    'message': 'Backup saved successfully',
                    'syncKey': safe_key,
                    'timestamp': backup_payload['timestamp'],
                    'size': os.path.getsize(file_path)
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))
            return

        # 2. Developer Broadcast Announcement Post
        if self.path == '/api/broadcast':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                payload = json.loads(post_data.decode('utf-8'))
                broadcast = {
                    'id': 'bc_' + str(int(datetime.utcnow().timestamp())),
                    'title': payload.get('title', 'Announcement'),
                    'message': payload.get('message', ''),
                    'actionText': payload.get('actionText', 'Learn More'),
                    'actionUrl': payload.get('actionUrl', ''),
                    'type': payload.get('type', 'update'),
                    'active': payload.get('active', True),
                    'timestamp': datetime.utcnow().isoformat() + 'Z'
                }
                with open(BROADCAST_FILE, 'w', encoding='utf-8') as f:
                    json.dump(broadcast, f, ensure_ascii=False, indent=2)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'success', 'broadcast': broadcast}).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))
            return

        super().do_POST()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # 1. Cloud Restore
        if parsed.path == '/api/sync/restore':
            query_params = urllib.parse.parse_qs(parsed.query)
            sync_key = query_params.get('syncKey', ['default'])[0].strip().lower()
            safe_key = "".join(c for c in sync_key if c.isalnum() or c in ('-', '_'))
            if not safe_key:
                safe_key = 'default'

            file_path = os.path.join(DATA_DIR, f"{safe_key}.json")
            if os.path.exists(file_path):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'success', 'backup': data}).encode('utf-8'))
                except Exception as e:
                    self.send_response(500)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))
            else:
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': f'No backup found for key "{safe_key}"'}).encode('utf-8'))
            return

        # 2. Get Developer Active Broadcast
        if parsed.path == '/api/broadcast':
            if os.path.exists(BROADCAST_FILE):
                try:
                    with open(BROADCAST_FILE, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'success', 'broadcast': data}).encode('utf-8'))
                except Exception as e:
                    self.send_response(500)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))
            else:
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'success', 'broadcast': None}).encode('utf-8'))
            return

        super().do_GET()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('0.0.0.0', PORT), LedgalRequestHandler) as httpd:
        print(f"FSMS Ledgal Server running at http://0.0.0.0:{PORT}")
        httpd.serve_forever()
