import subprocess
import sys
import os
import time
import signal

def run_servers():
    print("=" * 60)
    print("                STARTING SEBI SHIELD PROTOTYPE")
    print("=" * 60)
    print("Step 1: Spawning FastAPI Backend (Port 8000)...")
    
    # Start FastAPI Backend
    backend_dir = os.path.join(os.path.dirname(__file__), "backend")
    backend_cmd = [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]
    
    try:
        backend_process = subprocess.Popen(
            backend_cmd,
            cwd=backend_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
    except Exception as e:
        print(f"ERROR starting backend: {e}")
        sys.exit(1)
        
    print("Step 2: Spawning React Vite Frontend (Port 5173)...")
    # Start React Frontend
    frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
    
    # On Windows npm run dev starts shell command
    shell_flag = os.name == 'nt'
    frontend_cmd = ["npm", "run", "dev"]
    
    try:
        frontend_process = subprocess.Popen(
            frontend_cmd,
            cwd=frontend_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            shell=shell_flag,
            bufsize=1
        )
    except Exception as e:
        print(f"ERROR starting frontend: {e}")
        backend_process.kill()
        sys.exit(1)

    processes = [
        ("BACKEND", backend_process),
        ("FRONTEND", frontend_process)
    ]
    
    print("\nServers started successfully!")
    print("API Portal:       http://127.0.0.1:8000")
    print("Vite Web App:     http://localhost:5173")
    print("-" * 60)
    print("Press Ctrl+C to terminate both servers.")
    print("-" * 60)

    # Put processes in non-blocking read mode or thread them
    import threading

    def read_stream(prefix, process):
        try:
            for line in iter(process.stdout.readline, ''):
                if line:
                    print(f"[{prefix}] {line.strip()}")
        except Exception:
            pass

    threads = []
    for prefix, proc in processes:
        t = threading.Thread(target=read_stream, args=(prefix, proc))
        t.daemon = True
        t.start()
        threads.append(t)

    def signal_handler(sig, frame):
        print("\nShutting down servers...")
        backend_process.terminate()
        frontend_process.terminate()
        time.sleep(1)
        backend_process.kill()
        frontend_process.kill()
        print("SEBI Shield shut down successfully. Goodbye!")
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    # Keep main thread alive monitoring processes
    while True:
        time.sleep(1)
        # Check if either exited
        for name, proc in processes:
            ret = proc.poll()
            if ret is not None:
                print(f"\nProcess {name} exited with code {ret}")
                backend_process.terminate()
                frontend_process.terminate()
                sys.exit(ret)

if __name__ == "__main__":
    run_servers()
