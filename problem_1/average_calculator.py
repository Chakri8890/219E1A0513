from flask import Flask, jsonify, request
import requests
import time
import logging

app = Flask(__name__)

# Enable logging
logging.basicConfig(level=logging.DEBUG)

WINDOW_SIZE = 10
API_URLS = {
    'p': 'http://20.244.55.144/test/primes',
    'f': 'http://20.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://20.244.56.144/test/rand'
}
stored_numbers = []

def fetch_numbers(url):
    try:
        start_time = time.time()
        response = requests.get(url, timeout=0.5)
        if response.status_code == 200:
            elapsed_time = time.time() - start_time
            if elapsed_time < 0.5:
                logging.debug(f"Fetched numbers: {response.json().get('numbers', [])}")
                return response.json().get('numbers', [])
    except requests.RequestException as e:
        logging.error(f"Request failed: {e}")
    return []

def update_numbers(new_numbers):
    global stored_numbers
    stored_numbers.extend(new_numbers)
    stored_numbers = list(dict.fromkeys(stored_numbers))
    if len(stored_numbers) > WINDOW_SIZE:
        stored_numbers = stored_numbers[-WINDOW_SIZE:]
    logging.debug(f"Updated stored numbers: {stored_numbers}")

@app.route('/numbers/<numberid>', methods=['GET'])
def get_numbers(numberid):
    if numberid not in API_URLS:
        logging.error("Invalid number ID")
        return jsonify({"error": "Invalid number ID"}), 400

    url = API_URLS[numberid]
    prev_state = stored_numbers.copy()
    new_numbers = fetch_numbers(url)

    if new_numbers:
        update_numbers(new_numbers)

    curr_state = stored_numbers
    avg = sum(curr_state) / len(curr_state) if curr_state else 0

    response = {
        "windowPrevState": prev_state,
        "windowCurrState": curr_state,
        "numbers": new_numbers,
        "avg": round(avg, 2)
    }

    logging.debug(f"Response: {response}")
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9876)
